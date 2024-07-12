import {v4 as uuidv4} from "uuid";
import {ValidationResult} from "./restrictions";

import {ArmySpec} from "./armySpec";
import {TestFormationSpec} from "./testFormationSpec";
import {Unit} from "./unit";

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
    description: string
    cost: TestCategories
    unitsToReplace: Map<Unit, number> // unit id -> number of units
    unitsToAdd: Map<Unit, number> // unit id -> number of units

    constructor(name: string, description: string, cost: TestCategories, unitsToReplace: Map<Unit, number>, unitsToAdd: Map<Unit, number>) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.unitsToReplace = unitsToReplace;
        this.unitsToAdd = unitsToAdd;
    }

    static Builder = class {
        private readonly name: string
        private readonly description: string
        private readonly cost: TestCategories
        private readonly unitsToReplace: Map<Unit, number> = new Map()
        private readonly unitsToAdd: Map<Unit, number> = new Map()

        constructor(name: string, description: string, cost: TestCategories) {
            this.name = name;
            this.description = description
            this.cost = cost;
        }

        withUnitToReplace(unit: Unit, number: number) {
            this.unitsToReplace.set(unit, number);
            return this;
        }

        withUnitToAdd(unit: Unit, number: number) {
            this.unitsToAdd.set(unit, number);
            return this;
        }

        build() {
            return new TestUpgradeSpec(this.name, this.description, this.cost, this.unitsToReplace, this.unitsToAdd);
        }
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

    unitsInFormation(): UnitCount[] {
        const result = new Map(this.spec.units);

        this.upgrades.forEach(upgrade => {
            upgrade.unitsToAdd.forEach((count, unit) => {
                result.set(unit, (result.get(unit) || 0) + count);
            });
        })
        this.upgrades.forEach(upgrade => {
            upgrade.unitsToReplace.forEach((count, unit) => {
                if (result.has(unit)) {
                    result.set(unit, result.get(unit)! - count);
                }
            });
        })

        return this.mapToUnitCount(result)
    }

    mapToUnitCount(values: Map<Unit, number>) {
        return Array.from(values.entries()).map(([unit, count]) => new UnitCount(unit, count));
    }
}

export class UnitCount {
    readonly unit: Unit
    readonly count: number

    constructor(unit: Unit, count: number) {
        this.unit = unit;
        this.count = count;
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
