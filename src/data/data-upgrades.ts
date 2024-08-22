import {UpgradeSpec} from "../ts/upgradeSpec";
import {ItemCost} from "../ts/itemCost";
import {ItemCategory} from "../ts/itemCategory";
import {units} from "./data-units";
import {weapons} from "./data-weapons";

export const upgrades = {
    supreme: new UpgradeSpec.Builder("Supreme Commander",
        "Add a Supreme Commander in a Command Squad to the formation",
        ItemCost.free)
        .withUnitToAdd(units.legionesAstartes.supremeCommander, 1)
        .build(),

    specialistPlasma: new UpgradeSpec.Builder("Specialist Legionaries",
        "Add two Plasma Gun Legionaries to the formation",
        ItemCost.fromList(ItemCategory.UPGRADE))
        .withUnitToAdd(units.legionesAstartes.legionairesSpecialistPlasmaGuns, 2)
        .build(),

    rhinos: new UpgradeSpec.Builder("Rhinos",
        "Add enough Rhinos to transport all units in the formation, all units in the formation must fit in the Rhinos.",
        ItemCost.fromList(ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK))
        .withUnitToAdd(units.legionesAstartes.rhino, 1)
        .build(),

    landRaider: new UpgradeSpec.Builder("Land Raiders",
        "Add two Land Raiders to the formation, all units in the formation must fit in the Land Raiders.",
        ItemCost.fromList(ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT))
        .withUnitToAdd(units.legionesAstartes.landRaider, 2)
        .build(),

    spartan: new UpgradeSpec.Builder("Spartan Assault Tank",
        "Add one Spartan Assault Tank to the formation, all units in the formation must fit in the Spartan.",
        ItemCost.fromList(ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT))
        .withUnitToAdd(units.legionesAstartes.spartan, 1)
        .build(),

    dreadnoughts: new UpgradeSpec.Builder("Dreadnoughts",
        "Add two Dreadnoughts to the formation",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 1},
            {category: ItemCategory.ELITE, count: 0.5}
        ]))
        .withUnitToAdd(units.legionesAstartes.dreadnought, 2)
        .build(),

    terminators: new UpgradeSpec.Builder("Terminators",
        "Add two Terminators to the formation",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 1},
            {category: ItemCategory.ELITE, count: 1}
        ]))
        .withUnitToAdd(units.legionesAstartes.cataphractiiTerminators, 2)
        .build(),

    dreadnoughtReplace: new UpgradeSpec.Builder("Dreadnoughts",
        "Replace the Rhinos with two Dreadnoughts",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 1},
            {category: ItemCategory.ELITE, count: 0.5}
        ]))
        .withUnitToReplace(units.legionesAstartes.rhinoSupport, 2)
        .withUnitToAdd(units.legionesAstartes.dreadnought, 2)
        .build(),

    dropPod: new UpgradeSpec.Builder("Drop Pod",
        "The formation will enter play in a Drop Pod, all units in the formation must fit in the Drop Pod to take this upgrade.",
        ItemCost.fromList(ItemCategory.UPGRADE))
        .withUnitToAdd(units.legionesAstartes.dropPod)
        .build(),

    chaplain: new UpgradeSpec.Builder("Chaplain",
        "Replace the formation Lieutenant with a Chaplain",
        new ItemCost(new Map([[ItemCategory.UPGRADE, 1], [ItemCategory.ELITE, 0.5]])))
        .withUnitToAdd(units.legionesAstartes.chaplain)
        .withUnitToReplace(units.legionesAstartes.lieutenant)
        .build(),

    kratosMelta: new UpgradeSpec.Builder("Kratos Melta",
        "Replace the Battlecannons with Melta Cannons",
        ItemCost.free)
        .withUnitToAdd(units.legionesAstartes.kratosMelta)
        .withUnitToReplace(units.legionesAstartes.kratosBattlecannon)
        .build(),

    predatorAnnihilators: new UpgradeSpec.Builder("Annihilators",
        "Replace the Predator Destructors with Predator Annihilators",
        ItemCost.free)
        .withUnitToAdd(units.legionesAstartes.predatorAnnihilator, 3)
        .withUnitToReplace(units.legionesAstartes.predatorDestructor, 3)
        .build(),

    sicarianPlasma: new UpgradeSpec.Builder("Plasma Weapons",
        "Replace the Sicarian Accelerators with Sicarian Plasma",
        ItemCost.free)
        .withUnitToAdd(units.legionesAstartes.sicarianPlasma, 2)
        .withUnitToReplace(units.legionesAstartes.sicarianAccelerator, 2)
        .build(),

    thunderHawk: new UpgradeSpec.Builder("Thunderhawk",
        "Replace the Storm Eagle with a Thunderhawk",
        ItemCost.fromList(ItemCategory.UPGRADE))
        .withUnitToAdd(units.legionesAstartes.thunderHawk)
        .withUnitToReplace(units.legionesAstartes.stormEagle)
        .build(),

    tornados: new UpgradeSpec.Builder("Tornados",
        "Replace all Land Speeders with Land Speeder Tornados",
        ItemCost.free)
        .withUnitToAdd(units.legionesAstartes.landSpeederTornado, 3)
        .withUnitToReplace(units.legionesAstartes.landSpeeder, 3)
        .build(),

    warhoundPair: new UpgradeSpec.Builder("Warhound Titan Pair",
        "Add a second Warhound Titan to the formation",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 2},
            {category: ItemCategory.TITANS, count: 1},
            {category: ItemCategory.HEAVY_SUPPORT, count: 1},
        ]))
        .withUnitToAdd(units.titans.warhound)
        .build(),

    scoutTitanWeapons: {
        vulcanMegaBolter: UpgradeSpec.weaponUpgrade(
            "Vulcan Mega-Bolter",
            "One Vulcan Mega-Bolter",
            ItemCost.free,
            weapons.scoutTitan.vulcanMegaBolter),

        infernoGun: UpgradeSpec.weaponUpgrade(
            "Inferno Gun",
            "One Inferno Gun",
            ItemCost.free,
            weapons.scoutTitan.infernoGun),

        scoutTurboLaserDestructor: UpgradeSpec.weaponUpgrade(
            "Scout Turbo-Laser Destructor",
            "One Scout Turbo-Laser Destructor",
            ItemCost.fromEntries([
                {category: ItemCategory.UPGRADE, count: 1}
            ]),
            weapons.scoutTitan.turboLaserDestructor),

        plasmaBlastgun: UpgradeSpec.weaponUpgrade(
            "Plasma Blastgun",
            "One Plasma Blastgun",
            ItemCost.fromEntries([
                {category: ItemCategory.UPGRADE, count: 1}
            ]),
            weapons.scoutTitan.plasmaBlastgun)
    },

    reaverWeapons: {
        apocalypseMissileLauncher: UpgradeSpec.weaponUpgrade(
            "Apocalypse Missile Launcher",
            "One Appocalypse Missile Launcher",
            ItemCost.free,
            weapons.reaverTitan.apocalypseMissileLauncher),

        gatlingBlaster: UpgradeSpec.weaponUpgrade(
            "Gatling Blaster",
            "One Gatling Blaster",
            ItemCost.free,
            weapons.reaverTitan.gatlingBlaster),

        laserBlaster: UpgradeSpec.weaponUpgrade(
            "Laser Blaster",
            "One Laser Blaster",
            ItemCost.free,
            weapons.reaverTitan.laserBlaster),

        meltaCannon: UpgradeSpec.weaponUpgrade(
            "Melta Cannon",
            "One Titan Melta Cannon",
            ItemCost.free,
            weapons.reaverTitan.titanMeltaCannon),

        turboLaserDestructor: UpgradeSpec.weaponUpgrade(
            "Turbo-Laser Destructor",
            "One Turbo-Laser Destructor",
            ItemCost.free,
            weapons.reaverTitan.turboLaserDestructor),

        volcanoCannon: UpgradeSpec.weaponUpgrade(
            "Volcano Cannon",
            "One Volcano Cannon",
            ItemCost.fromEntries([
                {category: ItemCategory.UPGRADE, count: 1}
            ]),
            weapons.reaverTitan.volcanoCannon),

        vulcanMegaBolter: UpgradeSpec.weaponUpgrade(
            "Vulcan Mega-Bolter",
            "One Vulcan Mega-Bolter",
            ItemCost.free,
            weapons.scoutTitan.vulcanMegaBolter),

        warpMissile: UpgradeSpec.weaponUpgrade(
            "Warp Missile",
            "One Warp Missile",
            ItemCost.free,
            weapons.reaverTitan.warpMissile),

        chainfist: UpgradeSpec.weaponUpgrade(
            "Chainfist",
            "One Titan Chainfist",
            ItemCost.free,
            weapons.reaverTitan.chainfist),

        powerfist: UpgradeSpec.weaponUpgrade(
            "Powerfist",
            "One Powerfist",
            ItemCost.free,
            weapons.reaverTitan.powerFist)
    },

    lemanRussVanquisher: new UpgradeSpec.Builder("Vanquishers",
        "Replace the Leman Russ Battle Tanks with Leman Russ Vanquishers",
        ItemCost.free)
        .withUnitToAdd(units.solarAuxilia.lemanRussVanquisher, 4)
        .withUnitToReplace(units.solarAuxilia.lemanRuss, 4)
        .build(),

    malcadoreVanquisher: new UpgradeSpec.Builder("Vanquishers",
        "Replace the Malcadore Battle Tanks with Malcadore Vanquishers",
        ItemCost.free)
        .withUnitToAdd(units.solarAuxilia.malcadoreVanquisher, 2)
        .withUnitToReplace(units.solarAuxilia.malcadore, 2)
        .build()
}