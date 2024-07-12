import {TestCategories, TestCategory, TestCategoryCount, TestFormation, testUpgrades, TestUpgradeSpec} from "./test";
import {
    BuildRestriction,
    MandatoryUpgradesRestriction,
    OncePerArmyRestriction,
    OncePerFormationRestriction,
    OneFromGroupRestriction,
    SingleAllyTypeRestriction,
    ValidationResult
} from "./restrictions";
import {ArmySection} from "./armySection";
import {TestFormationSpec} from "./testFormationSpec";
import {units} from "../data/data-units";

export class ArmySpec {
    name: string
    grants: TestCategories
    formationRestrictions: BuildRestriction<TestFormationSpec>[]
    upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]
    armySections: ArmySection[]

    constructor(name: string, grants: TestCategories, formationRestrictions: BuildRestriction<TestFormationSpec>[], upgradeRestriction: BuildRestriction<TestUpgradeSpec>[], armySections: ArmySection[]) {
        this.name = name;
        this.grants = grants;
        this.formationRestrictions = formationRestrictions;
        this.upgradeRestriction = upgradeRestriction;
        this.armySections = armySections;
    }

    static Builder = class {
        name: string
        grants: TestCategories
        formationRestrictions: BuildRestriction<TestFormationSpec>[]
        upgradeRestriction: BuildRestriction<TestUpgradeSpec>[]
        armySections: ArmySection[]

        constructor(name: string) {
            this.name = name
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
            return new ArmySpec(this.name, this.grants, this.formationRestrictions, this.upgradeRestriction, this.armySections)
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

export const lsArmySpec = new ArmySpec.Builder("Legiones Astartes")
    .withGrant([
        {category: TestCategory.FORMATION, count: 12},
        {category: TestCategory.UPGRADE, count: 4},
        {category: TestCategory.FAST_ATTACK, count: 1}
    ])
    .withFormationRestriction(new SingleAllyTypeRestriction("Allies - Solar Auxilia", "Allies - Knight World"))
    .withUpgradeRestriction(new OncePerArmyRestriction(testUpgrades.supreme))
    .withArmySection(new ArmySection("Core", [
        new TestFormationSpec.Builder("Tactical Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.CORE]))
            .withUnit(units.sergeant, 1)
            .withUnit(units.tacticals, 4)
            .withGrant(
                new TestCategories(new Map([
                    [TestCategory.FAST_ATTACK, 2],
                    [TestCategory.HEAVY_SUPPORT, 2],
                    [TestCategory.ELITE, 1],
                    [TestCategory.ALLIES, 1]
                ])))
            .withUpgrades(testUpgrades.rhinos, testUpgrades.supreme, testUpgrades.plasma, testUpgrades.dreadnoughts, testUpgrades.commander)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(testUpgrades.rhinos),
                new OneFromGroupRestriction([testUpgrades.supreme, testUpgrades.commander])
            )
            .build()
    ]))
    .withArmySection(new ArmySection("Heavy Support", [
        new TestFormationSpec.Builder("Heavy Support Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .withUpgrades(testUpgrades.dreadnoughts, testUpgrades.commander)
            .inSection("Heavy Support")
            .build(),

        new TestFormationSpec.Builder("Sicarian Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .inSection("Heavy Support")
            .build(),

        new TestFormationSpec.Builder("Predator Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .inSection("Heavy Support")
            .build(),
    ]))
    .withArmySection(new ArmySection("Fast Attack", [
        new TestFormationSpec.Builder("Assault Marine Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .withUpgrades(testUpgrades.commander)
            .inSection("Fast Attack")
            .build(),

        new TestFormationSpec.Builder("Thunderhawk", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new TestFormationSpec.Builder("Storm Eagle", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new TestFormationSpec.Builder("Xiphon Fighters", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .inSection("Fast Attack")
            .build()
    ]))
    .withArmySection(new ArmySection("Elite", [
        new TestFormationSpec.Builder("Terminators", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
            .inSection("Elite")
            .withUpgrades(testUpgrades.commander)
            .build(),

        new TestFormationSpec.Builder("Dreadnought Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
            .inSection("Elite")
            .build()
    ]))
    .withArmySection(new ArmySection("Titans", [
        new TestFormationSpec.Builder("Warhound Titan", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
            .withUpgrades(testUpgrades.warhoundPair, testUpgrades.st_vulcanMegaBolter, testUpgrades.st_infernoGun, testUpgrades.st_plasmaBlastgun, testUpgrades.st_scoutTLD)
            .withUpgradeRestrictions(
                new MandatoryUpgradesRestriction(2, 2, [testUpgrades.st_vulcanMegaBolter, testUpgrades.st_infernoGun, testUpgrades.st_plasmaBlastgun, testUpgrades.st_scoutTLD], "weapon upgrades"),
                new OncePerFormationRestriction(testUpgrades.warhoundPair),
                new OncePerFormationRestriction(testUpgrades.st_vulcanMegaBolter),
                new OncePerFormationRestriction(testUpgrades.st_plasmaBlastgun),
                new OncePerFormationRestriction(testUpgrades.st_infernoGun),
                new OncePerFormationRestriction(testUpgrades.st_scoutTLD),
            )
            .inSection("Titans")
            .build(),

        new TestFormationSpec.Builder("Reaver Titan", new TestCategories(new Map([
            [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 1], [TestCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build(),

        new TestFormationSpec.Builder("Warlord Titan", new TestCategories(new Map([
            [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 2], [TestCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Solar Auxilia", [
        new TestFormationSpec.Builder("Auxilia Lasrifle Tercio", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Solar Auxilia")
            .withGrant(TestCategories.fromList([TestCategory.ALLIES_SA_SUPPORT]))
            .build(),

        new TestFormationSpec.Builder("Aethon Heavy Sentinel Patrol", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new TestFormationSpec.Builder("Leman Russ Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new TestFormationSpec.Builder("Malcador Tank Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Knight World", [
        new TestFormationSpec.Builder("Questoris Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withGrant(TestCategories.fromList([TestCategory.ALLIES_KN_SUPPORT]))
            .build(),

        new TestFormationSpec.Builder("Armiger Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .build(),

        new TestFormationSpec.Builder("Acastus Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_KN_SUPPORT]))
            .inSection("Allies - Knight World")
            .build()
    ]))
    .build()