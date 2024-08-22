import {ItemCost} from "../ts/itemCost";
import {units} from "./data-units";
import {
    IncompatibleTransportRestriction,
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
import {upgrades} from "./data-upgrades";

export const legionesAstartesArmySpec = new ArmySpec.Builder("Legiones Astartes", "./img/LegionesAstartes.jpg")
    .withGrant([
        {category: ItemCategory.FORMATION, count: 12},
        {category: ItemCategory.UPGRADE, count: 5},
        {category: ItemCategory.FAST_ATTACK, count: 1}
    ])
    .withFormationRestriction(new SingleAllyTypeRestriction("Allies - Solar Auxilia", "Allies - Knight World"))
    .withUpgradeRestriction(new OncePerArmyRestriction(upgrades.supreme))
    .withArmySection(new ArmySection("Core", [
        new FormationSpec.Builder("Tactical Detachment", ItemCost.fromList(ItemCategory.FORMATION))
            .withUnit(units.legionesAstartes.lieutenant, 1)
            .withUnit(units.legionesAstartes.legionairesTactical, 4)
            .withGrant(
                {category: ItemCategory.FAST_ATTACK, count: 2},
                {category: ItemCategory.HEAVY_SUPPORT, count: 2},
                {category: ItemCategory.ELITE, count: 1},
                {category: ItemCategory.TITANS, count: 1},
                {category: ItemCategory.ALLIES, count: 1}
            )
            .withOnlyOnceUpgrades(
                upgrades.supreme,
                upgrades.chaplain,
                upgrades.specialistPlasma,
                upgrades.dreadnoughts,
                upgrades.rhinos,
                upgrades.landRaider,
                upgrades.spartan,
                upgrades.dropPod
            )
            .withUpgradeRestrictions(
                new OneFromGroupRestriction([upgrades.rhinos, upgrades.landRaider, upgrades.spartan, upgrades.dropPod], "transport option"),
                new OneFromGroupRestriction([upgrades.supreme, upgrades.chaplain], "character"),
                new IncompatibleTransportRestriction([upgrades.rhinos, upgrades.landRaider, upgrades.spartan, upgrades.dreadnoughts])
            )
            .build()
    ]))
    .withArmySection(new ArmySection("Heavy Support", [
        new FormationSpec.Builder("Heavy Support Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.legionesAstartes.lieutenant, 1)
            .withUnit(units.legionesAstartes.havocs, 2)
            .withUnit(units.legionesAstartes.rhinoSupport, 2)
            .withUpgrades(upgrades.dreadnoughtReplace, upgrades.chaplain)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.dreadnoughtReplace),
                new OncePerFormationRestriction(upgrades.chaplain)
            )
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Sicarian Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.legionesAstartes.sicarianAccelerator, 2)
            .withSingleGrant(ItemCategory.UPGRADE)
            .withUpgrades(upgrades.sicarianPlasma)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.sicarianPlasma)
            )
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Predator Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.legionesAstartes.predatorDestructor, 3)
            .withUpgrades(upgrades.predatorAnnihilators)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.predatorAnnihilators)
            )
            .inSection("Heavy Support")
            .build(),

        new FormationSpec.Builder("Kratos Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.HEAVY_SUPPORT, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.legionesAstartes.kratosBattlecannon, 2)
            .withUpgrades(upgrades.kratosMelta)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.kratosMelta)
            )
            .inSection("Heavy Support")
            .build(),
    ]))
    .withArmySection(new ArmySection("Fast Attack", [
        new FormationSpec.Builder("Assault Marine Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.lieutenant)
            .withUnit(units.legionesAstartes.legionairesAssault, 4)
            .withUpgrades(upgrades.chaplain)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.chaplain)
            )
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Land Speeder Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.landSpeeder, 3)
            .withUpgrades(upgrades.tornados)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.tornados)
            )
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Sky-hunter Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.lieutenant)
            .withUnit(units.legionesAstartes.scimitarJetbike, 3)
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Outrider Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.lieutenant)
            .withUnit(units.legionesAstartes.outriderBike, 4)
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Air Transport", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.stormEagle)
            .withUpgrades(upgrades.thunderHawk)
            .withUpgradeRestrictions(
                new OncePerFormationRestriction(upgrades.thunderHawk)
            )
            .inSection("Fast Attack")
            .build(),

        new FormationSpec.Builder("Xiphon Fighters", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.FAST_ATTACK))
            .withUnit(units.legionesAstartes.xiphonInterceptor, 2)
            .withSingleGrant(ItemCategory.UPGRADE)
            .inSection("Fast Attack")
            .build()
    ]))
    .withArmySection(new ArmySection("Elite", [
        new FormationSpec.Builder("Terminators", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ELITE))
            .withUnit(units.legionesAstartes.lieutenant)
            .withUnit(units.legionesAstartes.cataphractiiTerminators, 4)
            .inSection("Elite")
            .build(),

        new FormationSpec.Builder("Dreadnought Detachment", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ELITE))
            .withUnit(units.legionesAstartes.dreadnought, 3)
            .withSingleGrant(ItemCategory.UPGRADE)
            .inSection("Elite")
            .build()
    ]))
    .withArmySection(new ArmySection("Titans", [
        new FormationSpec.Builder("Warhound Titan", ItemCost.fromList(
            ItemCategory.FORMATION, ItemCategory.FAST_ATTACK, ItemCategory.TITANS)
        )
            .withUnit(units.titans.warhound)
            .withSingleGrant(ItemCategory.UPGRADE)
            .withOnlyOnceUpgrades(
                upgrades.warhoundPair,
                upgrades.scoutTitanWeapons.vulcanMegaBolter,
                upgrades.scoutTitanWeapons.infernoGun,
                upgrades.scoutTitanWeapons.plasmaBlastgun,
                upgrades.scoutTitanWeapons.scoutTurboLaserDestructor
            )
            .withUpgradeRestrictions(
                new MandatoryUpgradesRestriction(2, 2, [
                    upgrades.scoutTitanWeapons.vulcanMegaBolter,
                    upgrades.scoutTitanWeapons.infernoGun,
                    upgrades.scoutTitanWeapons.plasmaBlastgun,
                    upgrades.scoutTitanWeapons.scoutTurboLaserDestructor
                ], "weapon upgrades")
            )
            .inSection("Titans")
            .build(),

        new FormationSpec.Builder(
            "Reaver Titan",
            ItemCost.fromEntries([
                {category: ItemCategory.FORMATION, count: 2},
                {category: ItemCategory.HEAVY_SUPPORT, count: 2},
                {category: ItemCategory.TITANS, count: 2}
            ]))
            .withUnit(units.titans.reaver)
            .withOnlyOnceUpgrades(
                upgrades.reaverWeapons.gatlingBlaster,
                upgrades.reaverWeapons.laserBlaster,
                upgrades.reaverWeapons.chainfist,
                upgrades.reaverWeapons.meltaCannon,
                upgrades.reaverWeapons.powerfist,
                upgrades.reaverWeapons.volcanoCannon
            )
            .withUpgradeRestrictions(
                new MandatoryUpgradesRestriction(2, 2, [
                    upgrades.reaverWeapons.gatlingBlaster,
                    upgrades.reaverWeapons.laserBlaster,
                    upgrades.reaverWeapons.chainfist,
                    upgrades.reaverWeapons.meltaCannon,
                    upgrades.reaverWeapons.powerfist,
                    upgrades.reaverWeapons.volcanoCannon
                ], "arm weapons")
            )
            .inSection("Titans")
            .build(),

        new FormationSpec.Builder(
            "Warlord Titan",
            ItemCost.fromEntries([
                {category: ItemCategory.FORMATION, count: 2},
                {category: ItemCategory.HEAVY_SUPPORT, count: 2},
                {category: ItemCategory.ELITE, count: 1},
                {category: ItemCategory.TITANS, count: 2}
            ]))
            .inSection("Titans")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Solar Auxilia", [
        new FormationSpec.Builder("Auxilia Lasrifle Tercio", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES))
            .withUnit(units.solarAuxilia.auxiliaCommand)
            .withUnit(units.solarAuxilia.auxillaries, 5)
            .inSection("Allies - Solar Auxilia")
            .withSingleGrant(ItemCategory.ALLIES_SA_SUPPORT)
            .build(),

        new FormationSpec.Builder("Aethon Heavy Sentinel Patrol", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT))
            .withUnit(units.solarAuxilia.aethonHeavySentinel, 4)
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Leman Russ Squadron", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.solarAuxilia.lemanRuss, 4)
            .withUpgrades(upgrades.lemanRussVanquisher)
            .inSection("Allies - Solar Auxilia")
            .build(),

        new FormationSpec.Builder("Malcador Tank Squadron", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_SA_SUPPORT, ItemCategory.HEAVY_SUPPORT))
            .withUnit(units.solarAuxilia.malcadore, 2)
            .withUpgrades(upgrades.malcadoreVanquisher)
            .inSection("Allies - Solar Auxilia")
            .build()
    ]))
    .withArmySection(new ArmySection("Allies - Knight World", [
        new FormationSpec.Builder("Questoris Knights", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES))
            .inSection("Allies - Knight World")
            .withSingleGrant(ItemCategory.ALLIES_KN_SUPPORT)
            .build(),

        new FormationSpec.Builder("Armiger Knights", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES))
            .inSection("Allies - Knight World")
            .withSingleGrant(ItemCategory.UPGRADE)
            .build(),

        new FormationSpec.Builder("Acastus Knights", ItemCost.fromList(ItemCategory.FORMATION, ItemCategory.ALLIES, ItemCategory.ALLIES_KN_SUPPORT))
            .inSection("Allies - Knight World")
            .build()
    ]))
    .build()