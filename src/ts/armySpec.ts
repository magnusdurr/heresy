import {TestCategories, TestCategoryCount, TestFormation, TestUpgradeSpec} from "./test";
import {BuildRestriction, ValidationResult} from "./restrictions";
import {ArmySection} from "./armySection";
import {TestFormationSpec} from "./testFormationSpec";

export class ArmySpec {
    name: string
    imgUrl: string
    grants: TestCategories
    formationRestrictions: BuildRestriction<TestFormationSpec>[]
    upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]
    armySections: ArmySection[]

    constructor(name: string, imgUrl: string, grants: TestCategories, formationRestrictions: BuildRestriction<TestFormationSpec>[], upgradeRestriction: BuildRestriction<TestUpgradeSpec>[], armySections: ArmySection[]) {
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
        formationRestrictions: BuildRestriction<TestFormationSpec>[]
        upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]
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

        withFormationRestriction(restriction: BuildRestriction<TestFormationSpec>) {
            this.formationRestrictions.push(restriction)
            return this
        }

        withUpgradeRestriction(restriction: BuildRestriction<TestUpgradeSpec>) {
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

    canAddFormation(existing: TestFormation[], toBeAdded: TestFormationSpec): ValidationResult {
        return this.formationRestrictions.map(restriction => restriction.isLegal([...existing.map((formation => formation.spec)), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
    }

    canAddUpgrade(existing: TestFormation[], toBeAdded: TestUpgradeSpec): ValidationResult {
        return this.upgradeRestriction.map(restriction => restriction.isLegal([...existing.map((formation => formation.upgrades)).flat(), toBeAdded]))
            .find(result => !result.success) || ValidationResult.success
    }

    validate(armyFormations: TestFormation[]) {
        const formationErrors = this.formationRestrictions.map(restriction => restriction.isLegal([...armyFormations.map((formation => formation.spec))]))
            .filter(result => !result.success)

        const globalUpgradeErrors = this.upgradeRestriction.map(restriction => restriction.isLegal(armyFormations.map((formation => formation.upgrades)).flat()))
            .filter(result => !result.success)

        return [...formationErrors, ...globalUpgradeErrors]
    }
}
