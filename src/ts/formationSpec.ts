import {BuildRestriction, OncePerFormationRestriction} from "./restrictions";
import {ItemCost, ItemCostEntry} from "./itemCost";
import {Unit} from "./unit";
import {UpgradeSpec, UpgradeType} from "./upgradeSpec";
import {ItemCategory} from "./itemCategory";
import {UnitCount} from "./formation";
import {EquippedWeapon} from "./weapon";

export class FormationSpec {
    name: string
    cost: ItemCost
    units: Map<Unit, number>
    availableUpgrades: UpgradeSpec[]
    defaultUpgrades: UpgradeSpec[]
    section: string // TODO: Section should be removed
    grants: ItemCost
    upgradeRestrictions: BuildRestriction<UpgradeSpec>[]

    constructor(name: string, cost: ItemCost, units: Map<Unit, number>, availableUpgrades: UpgradeSpec[], defaultUpgrades: UpgradeSpec[], section: string, grants: ItemCost, upgradeRestrictions: BuildRestriction<UpgradeSpec>[]) {
        this.name = name;
        this.cost = cost;
        this.units = units;
        this.availableUpgrades = availableUpgrades;
        this.defaultUpgrades = defaultUpgrades;
        this.section = section;
        this.grants = grants;
        this.upgradeRestrictions = upgradeRestrictions;
    }

    possibleUpgradeUnits(): UnitCount[] {
        const result = new Map();

        this.availableUpgrades.forEach(upgrade => {
            upgrade.unitsToAdd.forEach((count, unit) => {
                result.set(unit, (result.get(unit) || 0) + count);
            });
        })

        return this.mapToUnitCount(result).filter(unitCount => unitCount.count > 0)
    }

    possibleUpgradeWeapons(): EquippedWeapon[] {
        return this.availableUpgrades
            .filter(upgrade => upgrade.type === UpgradeType.WEAPON)
            .map(upgrade => new EquippedWeapon(upgrade.weaponToAdd!));
    }

    mapToUnitCount(values: Map<Unit, number>): UnitCount[] {
        return Array.from(values.entries()).map(([unit, count]) => new UnitCount(unit, count));
    }

    unitCount(): UnitCount[] {
        return Array.from(this.units.entries()).map(([unit, count]) => (new UnitCount(unit, count)));
    }

    static Builder = class {
        private readonly name: string
        private readonly cost: ItemCost
        private units: Map<Unit, number> = new Map()
        private grants: ItemCost = new ItemCost(new Map())
        private section: string = "Core"
        private readonly availableUpgrades: UpgradeSpec[] = []
        private readonly defaultUpgrades: UpgradeSpec[] = []
        private readonly upgradeRestrictions: BuildRestriction<UpgradeSpec>[] = [];

        constructor(name: string, cost: ItemCost) {
            this.name = name;
            this.cost = cost;
        }

        withUnit(unit: Unit, count?: number) {
            this.units.set(unit, count ?? 1);
            return this;
        }

        withDefaultUpgrades(...upgrades: UpgradeSpec[]) {
            upgrades.forEach(upgrade => this.defaultUpgrades.push(upgrade));
            return this;
        }

        withUpgrades(...upgrades: UpgradeSpec[]) {
            upgrades.forEach(upgrade => this.availableUpgrades.push(upgrade));
            return this;
        }

        withOnlyOnceUpgrades(...upgrades: UpgradeSpec[]) {
            upgrades.forEach(upgrade => {
                this.upgradeRestrictions.push(new OncePerFormationRestriction(upgrade));
                this.availableUpgrades.push(upgrade);
            });
            return this;
        }

        withUpgradeList(upgrades: UpgradeSpec[]) {
            upgrades.forEach(upgrade => this.availableUpgrades.push(upgrade));
            return this;
        }

        withGrant(...list: ItemCostEntry[]) {
            this.grants = ItemCost.fromEntries(list);
            return this;
        }

        withSingleGrant(category: ItemCategory) {
            this.grants = ItemCost.fromList(category);
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
            return new FormationSpec(
                this.name,
                this.cost,
                this.units,
                this.availableUpgrades,
                this.defaultUpgrades,
                this.section,
                this.grants,
                this.upgradeRestrictions
            );
        }
    }
}