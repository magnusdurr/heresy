import {TestCategories, TestCategory} from "../ts/test";
import {units} from "./data-units";
import {
    MandatoryUpgradesRestriction,
    OncePerArmyRestriction,
    OncePerFormationRestriction,
    OneFromGroupRestriction,
    SingleAllyTypeRestriction
} from "../ts/restrictions";
import {ArmySection} from "../ts/armySection";
import {FormationSpec} from "../ts/formationSpec";
import {ArmySpec} from "../ts/armySpec";
import {UpgradeSpec} from "../ts/upgradeSpec";

export const testUpgrades = {
    rhinos: new UpgradeSpec.Builder("Rhinos",
        "Add enough Rhinos to transport all units in the formation",
        TestCategories.fromList([TestCategory.UPGRADE, TestCategory.FAST_ATTACK]))
        .withUnitToAdd(units.rhino, 1)
        .build(),

    supreme: new UpgradeSpec.Builder("Supreme Commander",
        "Add a supreme commander to the formation",
        TestCategories.fromList([TestCategory.CORE]))
        .withUnitToAdd(units.supremeCommander, 1)
        .build(),

    plasma: new UpgradeSpec.Builder("Plasma Gun Legionaries", "", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.CORE])).build(),
    dreadnoughts: new UpgradeSpec.Builder("Dreadnoughts", "", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT])).build(),
    commander: new UpgradeSpec.Builder("Commander", "", new TestCategories(new Map([
        [TestCategory.UPGRADE, 1], [TestCategory.ELITE, 0.5]
    ]))).build(),
    warhoundPair: new UpgradeSpec.Builder("Warhound Titan Pair", "", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.UPGRADE, TestCategory.FAST_ATTACK, TestCategory.ELITE])).build(),
    st_vulcanMegaBolter: new UpgradeSpec.Builder("Vulcan Mega-Bolter", "", TestCategories.fromList([TestCategory.CORE])).build(),
    st_infernoGun: new UpgradeSpec.Builder("Inferno Gun", "", TestCategories.fromList([TestCategory.CORE])).build(),
    st_scoutTLD: new UpgradeSpec.Builder("Scout Turbo-Laser Destructor", "", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT])).build(),
    st_plasmaBlastgun: new UpgradeSpec.Builder("Plasma Blastgun", "", TestCategories.fromList([TestCategory.UPGRADE, TestCategory.HEAVY_SUPPORT])).build()
}

export const lsArmySpec = new ArmySpec.Builder("Legiones Astartes", "./img/LegionesAstartes.jpg")
    .withGrant([
        {category: TestCategory.FORMATION, count: 12},
        {category: TestCategory.UPGRADE, count: 4},
        {category: TestCategory.FAST_ATTACK, count: 1}
    ])
    .withFormationRestriction(new SingleAllyTypeRestriction("Allies - Solar Auxilia", "Allies - Knight World"))
    .withUpgradeRestriction(new OncePerArmyRestriction(testUpgrades.supreme))
    .withArmySection(new ArmySection("Core", [
        new FormationSpec.Builder("Tactical Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.CORE]))
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
        new FormationSpec.Builder("Heavy Support Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .withUpgrades(testUpgrades.dreadnoughts, testUpgrades.commander)
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Sicarian Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Predator Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.HEAVY_SUPPORT]))
            .inSection("Heavy Support")
            .build(),
    ]))
    .withArmySection(new ArmySection("Fast Attack", [
        new FormationSpec.Builder("Assault Marine Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .withUpgrades(testUpgrades.commander)
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Thunderhawk", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Storm Eagle", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Xiphon Fighters", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK]))
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .inSection("Fast Attack")
            .build()
    ]))
    .withArmySection(new ArmySection("Elite", [
        new FormationSpec.Builder("Terminators", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
            .inSection("Elite")
            .withUpgrades(testUpgrades.commander)
            .build(),

        new FormationSpec.Builder("Dreadnought Detachment", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ELITE]))
            .inSection("Elite")
            .build()
    ]))
    .withArmySection(new ArmySection("Titans", [
        new FormationSpec.Builder("Warhound Titan", TestCategories.fromList([TestCategory.FORMATION, TestCategory.FAST_ATTACK, TestCategory.FAST_ATTACK]))
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

        new FormationSpec.Builder("Reaver Titan", new TestCategories(new Map([
            [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 1], [TestCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build(),

        new FormationSpec.Builder("Warlord Titan", new TestCategories(new Map([
            [TestCategory.FORMATION, 2], [TestCategory.HEAVY_SUPPORT, 2], [TestCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Solar Auxilia", [
        new FormationSpec.Builder("Auxilia Lasrifle Tercio", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Solar Auxilia")
            .withGrant(TestCategories.fromList([TestCategory.ALLIES_SA_SUPPORT]))
            .build(),

        new FormationSpec.Builder("Aethon Heavy Sentinel Patrol", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Leman Russ Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Malcador Tank Squadron", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_SA_SUPPORT, TestCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Knight World", [
        new FormationSpec.Builder("Questoris Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withGrant(TestCategories.fromList([TestCategory.ALLIES_KN_SUPPORT]))
            .build(),

        new FormationSpec.Builder("Armiger Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withGrant(TestCategories.fromList([TestCategory.UPGRADE]))
            .build(),

        new FormationSpec.Builder("Acastus Knights", TestCategories.fromList([TestCategory.FORMATION, TestCategory.ALLIES, TestCategory.ALLIES_KN_SUPPORT]))
            .inSection("Allies - Knight World")
            .build()
    ]))
    .build()