import {FormationSpec} from "./formationSpec";
import {UpgradeSpec} from "./upgradeSpec";
import {ValidationResult} from "./restrictions";
import {Unit} from "./unit";
import {TestCategories, UnitCount} from "./test";
import {v4 as uuidv4} from 'uuid';
import {Upgrade} from "./upgrade";

export class Formation {
    id: string = uuidv4();
    spec: FormationSpec
    upgrades: Upgrade[] = []

    constructor(spec: FormationSpec) {
        this.spec = spec
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
            this.upgrades.reduce((acc, upgrade) => acc.merge(upgrade.spec.cost), new TestCategories(new Map()))
        );
    }

    unitsInFormation(): UnitCount[] {
        const result = new Map(this.spec.units);

        this.upgrades.forEach(upgrade => {
            upgrade.spec.unitsToAdd.forEach((count, unit) => {
                result.set(unit, (result.get(unit) || 0) + count);
            });
        })
        this.upgrades.forEach(upgrade => {
            upgrade.spec.unitsToReplace.forEach((count, unit) => {
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