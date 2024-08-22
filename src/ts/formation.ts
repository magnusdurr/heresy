import {FormationSpec} from "./formationSpec";
import {UpgradeSpec, UpgradeType} from "./upgradeSpec";
import {ValidationResult} from "./restrictions";
import {Unit} from "./unit";
import {ItemCost} from "./itemCost";
import {v4 as uuidv4} from 'uuid';
import {Upgrade} from "./upgrade";
import {EquippedWeapon} from "./weapon";

export class Formation {
    id: string = uuidv4();
    spec: FormationSpec
    upgrades: Upgrade[] = []

    constructor(spec: FormationSpec) {
        this.spec = spec
        this.upgrades = spec.defaultUpgrades.map(upgradeSpec => new Upgrade(upgradeSpec))
    }

    canApplyUpgrade(upgrade: UpgradeSpec): ValidationResult {
        return this.spec.upgradeRestrictions.map(restriction => restriction.isLegal([...this.upgrades.map(u => u.spec), upgrade]))
            .find(result => !result.success) || ValidationResult.success
    }

    checkUpgradeValidationErrors(): ValidationResult[] {
        return this.spec.upgradeRestrictions.map(restriction => restriction.isLegal(this.upgrades.map(u => u.spec)))
            .filter(result => !result.success)
    }

    costWithUpgrades() {
        return this.spec.cost.merge(
            this.upgrades.reduce((acc, upgrade) => acc.merge(upgrade.spec.cost), new ItemCost(new Map()))
        );
    }

    unitsInFormation(): UnitCount[] {
        const allUnits = new Map(this.spec.units);

        this.upgrades.forEach(upgrade => {
            upgrade.spec.unitsToAdd.forEach((count, unit) => {
                allUnits.set(unit, (allUnits.get(unit) || 0) + count);
            });
        })
        this.upgrades.forEach(upgrade => {
            upgrade.spec.unitsToReplace.forEach((count, unit) => {
                if (allUnits.has(unit)) {
                    allUnits.set(unit, allUnits.get(unit)! - count);
                }
            });
        })

        const result = new Map()
        allUnits.forEach((count, unit) => {
            let clonedUnit = unit.deepClone()

            this.upgrades.filter(upgrade => upgrade.spec.type === UpgradeType.WEAPON).forEach(upgrade => {
                clonedUnit.weapons.push(new EquippedWeapon(upgrade.spec.weaponToAdd!))
            })

            result.set(clonedUnit, count)
        })

        return this.mapToUnitCount(result).filter(unitCount => unitCount.count > 0)
    }

    mapToUnitCount(values: Map<Unit, number>): UnitCount[] {
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

    toDisplayString(): string {
        return this.count > 1 ? `${this.count}x ${this.unit.name}` : this.unit.name
    }
}