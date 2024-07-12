import {ItemCost} from "../ts/itemCost";
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
import {ItemCategory} from "../ts/itemCategory";
import {testUpgrades} from "./data-upgrades";

export const legionesAstartesArmySpec = new ArmySpec.Builder("Legiones Astartes", "./img/LegionesAstartes.jpg")
    .withGrant([
        {category: ItemCategory.FORMATION, count: 12},
        {category: ItemCategory.UPGRADE, count: 4},
        {category: ItemCategory.FAST_ATTACK, count: 1}
    ])
    .withFormationRestriction(new SingleAllyTypeRestriction("Allies - Solar Auxilia", "Allies - Knight World"))
    .withUpgradeRestriction(new OncePerArmyRestriction(testUpgrades.supreme))
    .withArmySection(new ArmySection("Core", [
        new FormationSpec.Builder("Tactical Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.CORE]))
            .withUnit(units.sergeant, 1)
            .withUnit(units.tacticals, 4)
            .withGrant([
                {category: ItemCategory.FAST_ATTACK, count: 2},
                {category: ItemCategory.HEAVY_SUPPORT, count: 2},
                {category: ItemCategory.ELITE, count: 1},
                {category: ItemCategory.ALLIES, count: 1}
            ])
            .withUpgrades(
                testUpgrades.supreme,
                testUpgrades.commander,
                testUpgrades.plasma,
                testUpgrades.rhinos,
                testUpgrades.dreadnoughts,
            )
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(testUpgrades.plasma),
                new OneFromGroupRestriction([testUpgrades.rhinos, testUpgrades.dreadnoughts]),
                new OneFromGroupRestriction([testUpgrades.supreme, testUpgrades.commander])
            )
            .build()
    ]))
    .withArmySection(new ArmySection("Heavy Support", [
        new FormationSpec.Builder("Heavy Support Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT]))
            .withUnit(units.sergeant, 1)
            .withUnit(units.havocs, 2)
            .withUnit(units.rhinoSupport, 2)
            .withUpgrades(testUpgrades.dreadnoughts, testUpgrades.commander)
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Sicarian Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT]))
            .withSingleGrant(ItemCategory.UPGRADE)
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Predator Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT]))
            .inSection("Heavy Support")
            .build(),
    ]))
    .withArmySection(new ArmySection("Fast Attack", [
        new FormationSpec.Builder("Assault Marine Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.FAST_ATTACK]))
            .withUpgrades(testUpgrades.commander)
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Thunderhawk", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.FAST_ATTACK, ItemCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Storm Eagle", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.FAST_ATTACK]))
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Xiphon Fighters", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.FAST_ATTACK]))
            .withSingleGrant(ItemCategory.UPGRADE)
            .inSection("Fast Attack")
            .build()
    ]))
    .withArmySection(new ArmySection("Elite", [
        new FormationSpec.Builder("Terminators", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ELITE]))
            .inSection("Elite")
            .withUpgrades(testUpgrades.commander)
            .build(),

        new FormationSpec.Builder("Dreadnought Detachment", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ELITE]))
            .inSection("Elite")
            .build()
    ]))
    .withArmySection(new ArmySection("Titans", [
        new FormationSpec.Builder("Warhound Titan", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.FAST_ATTACK, ItemCategory.FAST_ATTACK]))
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

        new FormationSpec.Builder("Reaver Titan", new ItemCost(new Map([
            [ItemCategory.FORMATION, 2], [ItemCategory.HEAVY_SUPPORT, 1], [ItemCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build(),

        new FormationSpec.Builder("Warlord Titan", new ItemCost(new Map([
            [ItemCategory.FORMATION, 2], [ItemCategory.HEAVY_SUPPORT, 2], [ItemCategory.ELITE, 2]
        ])))
            .inSection("Titans")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Solar Auxilia", [
        new FormationSpec.Builder("Auxilia Lasrifle Tercio", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES]))
            .inSection("Allies - Solar Auxilia")
            .withSingleGrant(ItemCategory.ALLIES_SA_SUPPORT)
            .build(),

        new FormationSpec.Builder("Aethon Heavy Sentinel Patrol", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Leman Russ Squadron", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT, ItemCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Malcador Tank Squadron", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT, ItemCategory.HEAVY_SUPPORT]))
            .inSection("Allies - Solar Auxilia")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Knight World", [
        new FormationSpec.Builder("Questoris Knights", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withSingleGrant(ItemCategory.ALLIES_KN_SUPPORT)
            .build(),

        new FormationSpec.Builder("Armiger Knights", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES]))
            .inSection("Allies - Knight World")
            .withSingleGrant(ItemCategory.UPGRADE)
            .build(),

        new FormationSpec.Builder("Acastus Knights", ItemCost.fromList([ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_KN_SUPPORT]))
            .inSection("Allies - Knight World")
            .build()
    ]))
    .build()