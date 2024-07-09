import {v4 as uuidv4} from "uuid";

export enum TestCategory {
    CORE = "Core",
    HEAVY_SUPPORT = "Heavy Support",
    FAST_ATTACK = "Fast Attack",
    ELITE = "Elite",
    ALLIES = "Allies",
    ALLIES_SA_SUPPORT = "Solar Auxilia Support"
}

export class TestGrants {
    upgrades: number
    categories: Map<TestCategory, number>

    constructor(upgrades: number, categories: Map<TestCategory, number>) {
        this.upgrades = upgrades
        this.categories = categories
    }

    static empty = new TestGrants(0, new Map())
}

export class TestFormationSpec {
    name: string
    cost: number
    category: TestCategory[]
    availableUpgrades: TestUpgradeSpec[]
    section: string
    grants?: TestGrants

    constructor(name: string, cost: number, category: TestCategory[], availableUpgrades: TestUpgradeSpec[], section: string, grants: TestGrants) {
        this.name = name;
        this.cost = cost;
        this.category = category;
        this.availableUpgrades = availableUpgrades;
        this.section = section;
        this.grants = grants;
    }

    mergeCategories() {
        const countDict: { [key: string]: number } = {};

        this.category.forEach((item) => {
            countDict[item] = (countDict[item] || 0) + 1;
        });

        return Object.keys(countDict).map((key) => {
            return {category: key, count: countDict[key]}
        })
    }

    static Builder = class {
        private readonly name: string
        private readonly cost: number
        private readonly categories: TestCategory[] = []
        private grants: TestGrants = TestGrants.empty
        private section: string = "Core"
        private readonly availableUpgrades: TestUpgradeSpec[] = []

        constructor(name: string, cost: number, ...categories: TestCategory[]) {
            this.name = name;
            this.cost = cost;
            this.categories = categories;
        }

        withUpgrades(...upgrades: TestUpgradeSpec[]) {
            upgrades.forEach(upgrade => this.availableUpgrades.push(upgrade));
            return this;
        }

        withGrant(grants: TestGrants) {
            this.grants = grants;
            return this;
        }

        inSection(section: string) {
            this.section = section;
            return this;
        }

        build() {
            return new TestFormationSpec(this.name, this.cost, this.categories, this.availableUpgrades, this.section, this.grants);
        }
    }
}

export class TestUpgradeSpec {
    name: string
    cost: number
    category: TestCategory[]

    constructor(name: string, cost: number, ...category: TestCategory[]) {
        this.name = name
        this.cost = cost
        this.category = category
    }

    mergeCategories() {
        const countDict: { [key: string]: number } = {};

        this.category.forEach((item) => {
            countDict[item] = (countDict[item] || 0) + 1;
        });

        return Object.keys(countDict).map((key) => {
            return {category: key, count: countDict[key]}
        })
    }
}

export class TestArmySpec {
    points: number
    upgrades: number
    restrictions: Map<TestCategory, number>

    constructor(points: number, upgrades: number, restrictions: Map<TestCategory, number>) {
        this.points = points;
        this.upgrades = upgrades;
        this.restrictions = restrictions;
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

    mergeCategories() {
        const countDict: { [key: string]: number } = {};

        this.spec.category.forEach((item) => {
            countDict[item] = (countDict[item] || 0) + 1;
        });

        this.upgrades.forEach(upgrade => {
            upgrade.category.forEach((item) => {
                countDict[item] = (countDict[item] || 0) + 1;
            });
        });

        return Object.keys(countDict).map((key) => {
            return {category: key, count: countDict[key]}
        })
    }
}

export class TestArmyAllocation {
    pointsSpent: number
    upgradesSpent: number
    extraUpgradesAvailable: number
    allocationUsed: Map<TestCategory, number>
    allocationAvailable: Map<TestCategory, number>

    constructor(pointsSpent: number, upgradesSpent: number, extraUpgradesAvailable: number, allocationUsed: Map<TestCategory, number>, allocationAvailable: Map<TestCategory, number>) {
        this.pointsSpent = pointsSpent;
        this.upgradesSpent = upgradesSpent;
        this.extraUpgradesAvailable = extraUpgradesAvailable;
        this.allocationUsed = allocationUsed;
        this.allocationAvailable = allocationAvailable;
    }

    static fromFormations(formations: TestFormation[]): TestArmyAllocation {
        const pointsSpent = formations.reduce((acc, formation) => acc + formation.spec.cost, 0);
        const upgradesSpent = formations.reduce((acc, formation) => acc + formation.upgrades.reduce((acc, upgrade) => acc + upgrade.cost, 0), 0);
        const extraUpgradesAvailable = formations.reduce((acc, formation) => acc + (formation.spec.grants?.upgrades ?? 0), 0);
        const allocationUsed = new Map<TestCategory, number>();
        const allocationAvailable = new Map<TestCategory, number>();

        Object.keys(TestCategory).forEach((key) => {
            allocationUsed.set(TestCategory[key as keyof typeof TestCategory], 0);
            allocationAvailable.set(TestCategory[key as keyof typeof TestCategory], 0);
        })

        formations.forEach(formation => {
            formation.spec.category.forEach(category => {
                allocationUsed.set(category, (allocationUsed.get(category) || 0) + 1);
            });

            formation.upgrades.forEach(upgrade => {
                upgrade.category.forEach(category => {
                    allocationUsed.set(category, (allocationUsed.get(category) || 0) + 1);
                });
            });
        });

        formations.forEach(formation => {
            formation.spec.grants?.categories.forEach((value, key) => {
                allocationAvailable.set(key, (allocationAvailable.get(key) || 0) + value);
            })
        })

        return new TestArmyAllocation(pointsSpent, upgradesSpent, extraUpgradesAvailable, allocationUsed, allocationAvailable);
    }
}

export const legionesAstartes = new TestArmySpec(12, 4, new Map([
    [TestCategory.HEAVY_SUPPORT, 5],
    [TestCategory.FAST_ATTACK, 5],
    [TestCategory.ELITE, 5],
    [TestCategory.ALLIES, 5]
]))

export const testUpgrades = {
    rhinos: new TestUpgradeSpec("Rhinos", 1, TestCategory.FAST_ATTACK),
    supreme: new TestUpgradeSpec("Supreme Commander", 0, TestCategory.CORE),
    plasma: new TestUpgradeSpec("Plasma Gun Legionaries", 1, TestCategory.CORE),
    dreadnoughts: new TestUpgradeSpec("Dreadnoughts", 1, TestCategory.HEAVY_SUPPORT),
    commander: new TestUpgradeSpec("Commander", 1, TestCategory.ELITE),
    warhoundPair: new TestUpgradeSpec("Warhound Titan Pair", 2, TestCategory.FAST_ATTACK, TestCategory.ELITE),
    scoutTitanWeapon: new TestUpgradeSpec("Scout Titan Weapon", 0, TestCategory.CORE),
    scoutHeavyWeapon: new TestUpgradeSpec("Scout Titan Heavy Weapon", 1, TestCategory.HEAVY_SUPPORT)
}

export const testFormations = [
    new TestFormationSpec.Builder("Tactical Detachment", 1, TestCategory.CORE)
        .withGrant(new TestGrants(0, new Map([
            [TestCategory.FAST_ATTACK, 2.34],
            [TestCategory.HEAVY_SUPPORT, 2],
            [TestCategory.ELITE, 1.5],
            [TestCategory.ALLIES, 1]
        ])))
        .withUpgrades(testUpgrades.rhinos, testUpgrades.supreme, testUpgrades.plasma, testUpgrades.dreadnoughts, testUpgrades.commander)
        .build(),

    new TestFormationSpec.Builder("Heavy Support Detachment", 1, TestCategory.HEAVY_SUPPORT)
        .withUpgrades(testUpgrades.dreadnoughts, testUpgrades.commander)
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Sicarian Detachment", 1, TestCategory.HEAVY_SUPPORT)
        .withGrant(new TestGrants(1, new Map()))
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Predator Detachment", 1, TestCategory.HEAVY_SUPPORT)
        .inSection("Heavy Support")
        .build(),

    new TestFormationSpec.Builder("Assault Marine Detachment", 1, TestCategory.FAST_ATTACK)
        .withUpgrades(testUpgrades.commander)
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Thunderhawk", 1, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK)
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Storm Eagle", 1, TestCategory.FAST_ATTACK)
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Xiphon Fighters", 1, TestCategory.FAST_ATTACK)
        .withGrant(new TestGrants(1, new Map()))
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Warhound Titan", 1, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK)
        .withUpgrades(testUpgrades.warhoundPair, testUpgrades.scoutTitanWeapon, testUpgrades.scoutHeavyWeapon)
        .inSection("Fast Attack")
        .build(),

    new TestFormationSpec.Builder("Terminators", 1, TestCategory.ELITE)
        .inSection("Elite")
        .withUpgrades(testUpgrades.commander)
        .build(),

    new TestFormationSpec.Builder("Auxilia Lasrifle Tercio", 1, TestCategory.ALLIES)
        .inSection("Allies")
        .withGrant(new TestGrants(0, new Map([
            [TestCategory.ALLIES_SA_SUPPORT, 1]
        ])))
        .build(),

    new TestFormationSpec.Builder("Aethon Heavy Sentinel Patrol", 1, TestCategory.ALLIES_SA_SUPPORT)
        .inSection("Allies")
        .build(),

    new TestFormationSpec.Builder("Leman Russ Squadron", 1, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT)
        .inSection("Allies")
        .build(),

    new TestFormationSpec.Builder("Malcador Tank Squadron", 1, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT)
        .inSection("Allies")
        .build(),

    new TestFormationSpec.Builder("Questoris Knights", 1, TestCategory.ALLIES)
        .inSection("Allies")
        .build(),

    new TestFormationSpec.Builder("Reaver Titan", 2, TestCategory.HEAVY_SUPPORT, TestCategory.ELITE, TestCategory.ELITE)
        .inSection("Titans")
        .build(),

    new TestFormationSpec.Builder("Warlord Titan", 2, TestCategory.HEAVY_SUPPORT, TestCategory.HEAVY_SUPPORT, TestCategory.ELITE, TestCategory.ELITE)
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
