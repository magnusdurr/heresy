import {v4 as uuidv4} from "uuid";
import {
    BuildRestriction,
    MandatoryUpgradesRestriction,
    OncePerFormationRestriction,
    OneFromGroupRestriction,
    SingleAllyTypeRestriction,
    ValidationResult
} from "./restrictions";

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
}

export interface TestCategoryCount {
    category: TestCategory
    count: number
}

export class TestFormationSpec {
    name: string
    cost: TestCategories
    availableUpgrades: TestUpgradeSpec[]
    section: string
    grants: TestCategories
    upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[]

    constructor(name: string, cost: TestCategories, availableUpgrades: TestUpgradeSpec[], section: string, grants: TestCategories, upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[]) {
        this.name = name;
        this.cost = cost;
        this.availableUpgrades = availableUpgrades;
        this.section = section;
        this.grants = grants;
        this.upgradeRestrictions = upgradeRestrictions;
    }

    static Builder = class {
        private readonly name: string
        private readonly cost: TestCategories
        private grants: TestCategories = new TestCategories(new Map())
        private section: string = "Core"
        private readonly availableUpgrades: TestUpgradeSpec[] = []
        private readonly upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[] = [];

        constructor(name: string, cost: TestCategories) {
            this.name = name;
            this.cost = cost;
        }

        withUpgrades(...upgrades: TestUpgradeSpec[]) {
            upgrades.forEach(upgrade => this.availableUpgrades.push(upgrade));
            return this;
        }

        withGrant(grants: TestCategories) {
            this.grants = grants;
            return this;
        }

        withUpgradeRestrictions(...restrictions: BuildRestriction<TestUpgradeSpec>[]) {
            restrictions.forEach(restriction => this.upgradeRestrictions.push(restriction));
            return this;
        }

        inSection(section: string) {
            this.section = section;
            return this;
        }

        build() {
            return new TestFormationSpec(this.name, this.cost, this.availableUpgrades, this.section, this.grants, this.upgradeRestrictions);
        }
    }
}

export class TestUpgradeSpec {
    name: string
    cost: TestCategories

    constructor(name: string, cost: TestCategories) {
        this.name = name;
        this.cost = cost;
    }
}


export class TestArmySpec {
    name: string
    grants: TestCategories
    formationRestrictions: BuildRestriction<TestFormationSpec>[]
    upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]

    constructor(name: string,
                grants: TestCategories,
                formationRestrictions: BuildRestriction<TestFormationSpec>[],
                upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]) {
        this.name = name;
        this.grants = grants;
        this.formationRestrictions = formationRestrictions;
        this.upgradeRestriction = upgradeRestriction;
    }

    canAddFormation(existing: TestFormation[], toBeAdded: TestFormationSpec): ValidationResult {
        return this.formationRestrictions.map(restriction => restriction.isLegal([...existing.map((formation => formation.spec)), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
    }

    canAddUpgrade(existing: TestFormation[], toBeAdded: TestUpgradeSpec): ValidationResult {
        return this.upgradeRestriction.map(restriction => restriction.isLegal([...existing.map((formation => formation.upgrades)).flat(), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
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

    checkValidationErrors(): ValidationResult[] {
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

    static fromFormations(army: TestArmySpec, formations: TestFormation[]): TestArmyAllocation {
        const totalCost = formations.map(formation => formation.costWithUpgrades())
            .reduce((acc, formation) => acc.merge(formation), new TestCategories(new Map()));

        const allGrants = formations
            .map(formation => formation.spec.grants)
            .reduce((acc, grants) => acc.merge(grants), army.grants);

        return new TestArmyAllocation(totalCost, allGrants);
    }
}

export const legionesAstartes = new TestArmySpec("Legiones Astartes",
    new TestCategories(new Map([
        [TestCategory.FORMATION, 12], [TestCategory.UPGRADE, 4], [TestCategory.FAST_ATTACK, 1]
    ])), [new SingleAllyTypeRestriction("Allies - Solar Auxilia", "Allies - Knight World")])

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

export const testFormations = [
    new TestFormationSpec.Builder("Tactical Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.CORE]))
        .withGrant(
            new TestCategories(new Map([
                [TestCategory.FAST_ATTACK, 2],
                [TestCategory.HEAVY_SUPPORT, 2],
                [TestCategory.ELITE, 1],
                [TestCategory.ALLIES, 1]
            ])))
        .withUpgrades(testUpgrades.rhinos, testUpgrades.supreme, testUpgrades.plasma, testUpgrades.dreadnoughts, testUpgrades.commander)
        .withUpgradeRestrictions(
            new OncePerFormationRestriction(testUpgrades.rhinos),
            new OneFromGroupRestriction(testUpgrades.supreme, testUpgrades.commander)
        )
        .build(),

    new TestFormationSpec.Builder("Heavy Support Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
        .withUpgrades(testUpgrades.dreadnoughts, testUpgrades.commander)
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Sicarian Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
        .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Predator Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Assault Marine Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
        .withUpgrades(testUpgrades.commander)
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Thunderhawk", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Storm Eagle", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Xiphon Fighters", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
        .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Warhound Titan", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
        .withUpgrades(testUpgrades.warhoundPair, testUpgrades.st_vulcanMegaBolter, testUpgrades.st_infernoGun, testUpgrades.st_plasmaBlastgun, testUpgrades.st_scoutTLD)
        .withUpgradeRestrictions(
            new MandatoryUpgradesRestriction(2, 2, [testUpgrades.st_vulcanMegaBolter, testUpgrades.st_infernoGun, testUpgrades.st_plasmaBlastgun, testUpgrades.st_scoutTLD]),
            new OncePerFormationRestriction(testUpgrades.warhoundPair),
            new OncePerFormationRestriction(testUpgrades.st_vulcanMegaBolter),
            new OncePerFormationRestriction(testUpgrades.st_plasmaBlastgun),
            new OncePerFormationRestriction(testUpgrades.st_infernoGun),
            new OncePerFormationRestriction(testUpgrades.st_scoutTLD),
        )
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Terminators", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
        .inSection("Elite")
        .withUpgrades(testUpgrades.commander)
        .build(),

    new TestFormationSpec.Builder("Dreadnought Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
        .inSection("Elite")
        .build(),

    new TestFormationSpec.Builder("Auxilia Lasrifle Tercio", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
        .inSection("Allies - Solar Auxilia")
        .withGrant(TestCategories.fromList([TestCategory.ALLIES_SA_SUPPORT]))
        .build(),

    new TestFormationSpec.Builder("Aethon Heavy Sentinel Patrol", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT]))
        .inSection("Allies - Solar Auxilia")
        .build(),

    new TestFormationSpec.Builder("Leman Russ Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
        .inSection("Allies - Solar Auxilia")
        .build(),

    new TestFormationSpec.Builder("Malcador Tank Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
        .inSection("Allies - Solar Auxilia")
        .build(),

    new TestFormationSpec.Builder("Questoris Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
        .inSection("Allies - Knight World")
        .withGrant(TestCategories.fromList([TestCategory.ALLIES_KN_SUPPORT]))
        .build(),

    new TestFormationSpec.Builder("Armiger Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
        .inSection("Allies - Knight World")
        .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
        .build(),

    new TestFormationSpec.Builder("Acastus Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_KN_SUPPORT]))
        .inSection("Allies - Knight World")
        .build(),

    new TestFormationSpec.Builder("Reaver Titan", new TestCategories(new Map([
        [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 1], [TestCategory.ELITE, 2]
    ])))
        .inSection("Titans")
        .build(),

    new TestFormationSpec.Builder("Warlord Titan", new TestCategories(new Map([
        [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 2], [TestCategory.ELITE, 2]
    ])))
        .inSection("Titans")
        .build()
]

function testFormationsBySection(): Map<string, TestFormationSpec[]> {
    const result: Map<string, TestFormationSpec[]> = new Map()

    testFormations.forEach(formation => {
        if (result.has(formation.section)) {
            result.get(formation.section)?.push(formation)
        } else {
            result.set(formation.section, [formation])
        }
    })

    console.log("testFormationsBySection", result)
    return result
}


export const testFormationsBySections = testFormationsBySection()
