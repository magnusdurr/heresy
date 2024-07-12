import {v4 as uuidv4} from "uuid";
import {ValidationResult} from "./restrictions";

import {ArmySpec} from "./armySpec";
import {TestFormationSpec} from "./testFormationSpec";

export enum TestCategory {
    FORMATION = "Formations",
    UPGRADE = "Upgrades",
    CORE = "Core",
    HEAVY_SUPPORT = "Heavy Support",
    FAST_ATTACK = "Fast Attack",
    ELITE = "Elite",
    ALLIES = "Allies",
    ALLIES_SA_SUPPORT = "Solar Auxilia Support",
    ALLIES_KN_SUPPORT = "Knight World Support"
}

export class TestCategories {
    readonly entries: Map<TestCategory, number>

    constructor(entries: Map<TestCategory, number>) {
        this.entries = entries;
    }

    merge(other: TestCategories): TestCategories {
        const merged = new Map(this.entries);

        other.entries.forEach((value, key) => {
            merged.set(key, (merged.get(key) || 0) + value);
        });

        return new TestCategories(merged);
    }

    getOrZero(category: TestCategory): number {
        return this.entries.get(category) || 0;
    }

    toList(): TestCategoryCount[] {
        return Array.from(this.entries).map(([key, value]) => ({category: key, count: value}));
    }

    static fromList(list: TestCategory[]) {
        return new TestCategories(list.reduce((acc, category) => {
            acc.set(category, (acc.get(category) || 0) + 1);
            return acc;
        }, new Map()));
    }

    static fromCounts(list: TestCategoryCount[]) {
        return new TestCategories(new Map(list.map(it => [it.category, it.count])))
    }
}

export interface TestCategoryCount {
    category: TestCategory
    count: number
}

export class TestUpgradeSpec {
    name: string
    cost: TestCategories

    constructor(name: string, cost: TestCategories) {
        this.name = name;
        this.cost = cost;
    }
}


export class TestFormation {
    id: string = uuidv4();
    spec: TestFormationSpec
    upgrades: TestUpgradeSpec[]

    constructor(spec: TestFormationSpec, upgrades: TestUpgradeSpec[]) {
        this.spec = spec
        this.upgrades = upgrades
    }

    canApplyUpgrade(upgrade: TestUpgradeSpec): ValidationResult {
        return this.spec.upgradeRestrictions.map(restriction => restriction.isLegal([...this.upgrades, upgrade]))
            .find(result => !result.success) || ValidationResult.success
    }

    checkUpgradeValidationErrors(): ValidationResult[] {
        return this.spec.upgradeRestrictions.map(restriction => restriction.isLegal(this.upgrades))
            .filter(result => !result.success)
    }

    costWithUpgrades() {
        return this.spec.cost.merge(
            this.upgrades.reduce((acc, upgrade) => acc.merge(upgrade.cost), new TestCategories(new Map()))
        );
    }
}

export class TestArmyAllocation {
    cost: TestCategories
    grants: TestCategories

    constructor(cost: TestCategories, grants: TestCategories) {
        this.cost = cost;
        this.grants = grants;
    }

    static fromFormations(army: ArmySpec, formations: TestFormation[]): TestArmyAllocation {
        const totalCost = formations.map(formation => formation.costWithUpgrades())
            .reduce((acc, formation) => acc.merge(formation), new TestCategories(new Map()));

        const allGrants = formations
            .map(formation => formation.spec.grants)
            .reduce((acc, grants) => acc.merge(grants), army.grants);

        return new TestArmyAllocation(totalCost, allGrants);
    }
}

export const testUpgrades = {
    rhinos: new TestUpgradeSpec("Rhinos", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.FAST_ATTACK])),
    supreme: new TestUpgradeSpec("Supreme Commander", TestCategories.fromList([TestCategory.CORE])),
    plasma: new TestUpgradeSpec("Plasma Gun Legionaries", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.CORE])),
    dreadnoughts: new TestUpgradeSpec("Dreadnoughts", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT])),
    commander: new TestUpgradeSpec("Commander", new TestCategories(new Map([
        [TestCategory.UPGRADE, 1], [TestCategory.ELITE, 0.5]
    ]))),
    warhoundPair: new TestUpgradeSpec("Warhound Titan Pair", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.UPGRADE, TestCategory.FAST_ATTACK, TestCategory.ELITE])),
    st_vulcanMegaBolter: new TestUpgradeSpec("Vulcan Mega-Bolter", TestCategories.fromList([TestCategory.CORE])),
    st_infernoGun: new TestUpgradeSpec("Inferno Gun", TestCategories.fromList([TestCategory.CORE])),
    st_scoutTLD: new TestUpgradeSpec("Scout Turbo-Laser Destructor", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT])),
    st_plasmaBlastgun: new TestUpgradeSpec("Plasma Blastgun", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT]))
}
