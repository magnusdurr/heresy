import {TestCategories, TestCategoryCount} from "./test";
import {BuildRestriction, ValidationResult} from "./restrictions";
import {ArmySection} from "./armySection";
import {FormationSpec} from "./formationSpec";
import {UpgradeSpec} from "./upgradeSpec";
import {Formation} from "./formation";

export class ArmySpec {
    name: string
    imgUrl: string
    grants: TestCategories
    formationRestrictions: BuildRestriction<FormationSpec>[]
    upgradeRestriction: BuildRestriction<UpgradeSpec>[]
    armySections: ArmySection[]

    constructor(name: string, imgUrl: string, grants: TestCategories, formationRestrictions: BuildRestriction<FormationSpec>[], upgradeRestriction: BuildRestriction<UpgradeSpec>[], armySections: ArmySection[]) {
        this.name = name;
        this.imgUrl = imgUrl;
        this.grants = grants;
        this.formationRestrictions = formationRestrictions;
        this.upgradeRestriction = upgradeRestriction;
        this.armySections = armySections;
    }

    static Builder = class {
        name: string
        imgUrl: string
        grants: TestCategories
        formationRestrictions: BuildRestriction<FormationSpec>[]
        upgradeRestriction: BuildRestriction<UpgradeSpec>[]
        armySections: ArmySection[]

        constructor(name: string, imgUrl: string) {
            this.name = name
            this.imgUrl = imgUrl
            this.grants = TestCategories.fromList([])
            this.formationRestrictions = []
            this.upgradeRestriction = []
            this.armySections = []
        }

        withGrant(grants: TestCategoryCount[]) {
            this.grants = TestCategories.fromCounts(grants)
            return this
        }

        withFormationRestriction(restriction: BuildRestriction<FormationSpec>) {
            this.formationRestrictions.push(restriction)
            return this
        }

        withUpgradeRestriction(restriction: BuildRestriction<UpgradeSpec>) {
            this.upgradeRestriction.push(restriction)
            return this
        }

        withArmySection(section: ArmySection) {
            this.armySections.push(section)
            return this
        }

        build() {
            return new ArmySpec(this.name, this.imgUrl, this.grants, this.formationRestrictions, this.upgradeRestriction, this.armySections)
        }
    }

    canAddFormation(existing: Formation[], toBeAdded: FormationSpec): ValidationResult {
        return this.formationRestrictions.map(restriction => restriction.isLegal([...existing.map((formation => formation.spec)), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
    }

    canAddUpgrade(existing: Formation[], toBeAdded: UpgradeSpec): ValidationResult {
        return this.upgradeRestriction.map(restriction => restriction.isLegal([...existing.map((formation => formation.upgrades.map(u => u.spec))).flat(), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
    }

    validate(armyFormations: Formation[]) {
        const formationErrors = this.formationRestrictions.map(restriction => restriction.isLegal([...armyFormations.map((formation => formation.spec))]))
            .filter(result => !result.success)

        const globalUpgradeErrors = this.upgradeRestriction.map(restriction => restriction.isLegal(armyFormations.map((formation => formation.upgrades.map(u => u.spec))).flat()))
            .filter(result => !result.success)

        return [...formationErrors, ...globalUpgradeErrors]
    }
}
