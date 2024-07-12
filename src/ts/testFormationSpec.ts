import {BuildRestriction} from "./restrictions";
import {TestCategories, TestUpgradeSpec} from "./test";
import {Unit} from "./unit";

export class TestFormationSpec {
    name: string
    cost: TestCategories
    units: Map<Unit, number>
    availableUpgrades: TestUpgradeSpec[]
    section: string // TODO: Section should be removed
    grants: TestCategories
    upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[]

    constructor(name: string, cost: TestCategories, units: Map<Unit, number>, availableUpgrades: TestUpgradeSpec[], section: string, grants: TestCategories, upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[]) {
        this.name = name;
        this.cost = cost;
        this.units = units;
        this.availableUpgrades = availableUpgrades;
        this.section = section;
        this.grants = grants;
        this.upgradeRestrictions = upgradeRestrictions;
    }

    static Builder = class {
        private readonly name: string
        private readonly cost: TestCategories
        private units: Map<Unit, number> = new Map()
        private grants: TestCategories = new TestCategories(new Map())
        private section: string = "Core"
        private readonly availableUpgrades: TestUpgradeSpec[] = []
        private readonly upgradeRestrictions: BuildRestriction<TestUpgradeSpec>[] = [];

        constructor(name: string, cost: TestCategories) {
            this.name = name;
            this.cost = cost;
        }

        withUnit(unit: Unit, count: number) {
            this.units.set(unit, count);
            return this;
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
            return new TestFormationSpec(this.name, this.cost, this.units, this.availableUpgrades, this.section, this.grants, this.upgradeRestrictions);
        }
    }
}