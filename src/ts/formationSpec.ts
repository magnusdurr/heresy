import {BuildRestriction} from "./restrictions";
import {ItemCost} from "./itemCost";
import {Unit} from "./unit";
import {UpgradeSpec} from "./upgradeSpec";

export class FormationSpec {
    name: string
    cost: ItemCost
    units: Map<Unit, number>
    availableUpgrades: UpgradeSpec[]
    section: string // TODO: Section should be removed
    grants: ItemCost
    upgradeRestrictions: BuildRestriction<UpgradeSpec>[]

    constructor(name: string, cost: ItemCost, units: Map<Unit, number>, availableUpgrades: UpgradeSpec[], section: string, grants: ItemCost, upgradeRestrictions: BuildRestriction<UpgradeSpec>[]) {
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
        private readonly cost: ItemCost
        private units: Map<Unit, number> = new Map()
        private grants: ItemCost = new ItemCost(new Map())
        private section: string = "Core"
        private readonly availableUpgrades: UpgradeSpec[] = []
        private readonly upgradeRestrictions: BuildRestriction<UpgradeSpec>[] = [];

        constructor(name: string, cost: ItemCost) {
            this.name = name;
            this.cost = cost;
        }

        withUnit(unit: Unit, count: number) {
            this.units.set(unit, count);
            return this;
        }

        withUpgrades(...upgrades: UpgradeSpec[]) {
            upgrades.forEach(upgrade => this.availableUpgrades.push(upgrade));
            return this;
        }

        withGrant(grants: ItemCost) {
            this.grants = grants;
            return this;
        }

        withUpgradeRestrictions(...restrictions: BuildRestriction<UpgradeSpec>[]) {
            restrictions.forEach(restriction => this.upgradeRestrictions.push(restriction));
            return this;
        }

        inSection(section: string) {
            this.section = section;
            return this;
        }

        build() {
            return new FormationSpec(this.name, this.cost, this.units, this.availableUpgrades, this.section, this.grants, this.upgradeRestrictions);
        }
    }
}