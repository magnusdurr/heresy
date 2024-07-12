import {ArmySpec} from "./armySpec";
import {Unit} from "./unit";
import {Formation} from "./formation";

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

    static fromFormations(army: ArmySpec, formations: Formation[]): TestArmyAllocation {
        const totalCost = formations.map(formation => formation.costWithUpgrades())
            .reduce((acc, formation) => acc.merge(formation), new TestCategories(new Map()));

        const allGrants = formations
            .map(formation => formation.spec.grants)
            .reduce((acc, grants) => acc.merge(grants), army.grants);

        return new TestArmyAllocation(totalCost, allGrants);
    }
}
