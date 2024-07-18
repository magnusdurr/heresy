import {UpgradeSpec} from "../ts/upgradeSpec";
import {ItemCost} from "../ts/itemCost";
import {ItemCategory} from "../ts/itemCategory";
import {units} from "./data-units";

export const testUpgrades = {
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

    dreadnoughts: new UpgradeSpec.Builder("Dreadnoughts",
        "Add two Dreadnoughts to the formation",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 1},
            {category: ItemCategory.HEAVY_SUPPORT, count: 1},
            {category: ItemCategory.ELITE, count: 0.5}
        ]))
        .withUnitToAdd(units.legionesAstartes.dreadnought, 2)
        .build(),

    dreadnoughtReplace: new UpgradeSpec.Builder("Dreadnoughts",
        "Replace the Rhinos with two Dreadnoughts",
        ItemCost.fromEntries([
            {category: ItemCategory.ELITE, count: 0.5}
        ]))
        .withUnitToReplace(units.legionesAstartes.rhinoSupport, 2)
        .withUnitToAdd(units.legionesAstartes.dreadnought, 2)
        .build(),

    commander: new UpgradeSpec.Builder("Chaplain",
        "Add one Chaplain in a Command Squad to the formation",
        new ItemCost(new Map([[ItemCategory.UPGRADE, 1], [ItemCategory.ELITE, 0.5]])))
        .withUnitToAdd(units.legionesAstartes.chaplain, 1)
        .build(),

    commanderAssault: new UpgradeSpec.Builder("Chaplain",
        "Add one Chaplain in an Assault Command Squad to the formation",
        new ItemCost(new Map([[ItemCategory.UPGRADE, 1], [ItemCategory.ELITE, 0.5]])))
        .withUnitToAdd(units.legionesAstartes.chaplainAssault, 1)
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

    warhoundPair: new UpgradeSpec.Builder("Warhound Titan Pair",
        "Add a second Warhound Titan to the formation",
        ItemCost.fromEntries([
            {category: ItemCategory.UPGRADE, count: 2},
            {category: ItemCategory.FAST_ATTACK, count: 1},
            {category: ItemCategory.HEAVY_SUPPORT, count: 1},
        ]))
        .withUnitToAdd(units.titans.warhound)
        .build(),

    scoutTitanWeapons: {
        vulcanMegaBolter: new UpgradeSpec.Builder(
            "Vulcan Mega-Bolter",
            "One Vulcan Mega-Bolter",
            ItemCost.free)
            .withUnitToAdd(units.titans.scoutTitanWeapons.vulcanMegaBolter)
            .build(),
        infernoGun: new UpgradeSpec.Builder(
            "Inferno Gun",
            "One Inferno Gun",
            ItemCost.free)
            .withUnitToAdd(units.titans.scoutTitanWeapons.infernoGun)
            .build(),
        scoutTurboLaserDestructor: new UpgradeSpec.Builder(
            "Scout Turbo-Laser Destructor",
            "One Scout Turbo-Laser Destructor",
            ItemCost.fromEntries([
                {category: ItemCategory.UPGRADE, count: 0.5},
                {category: ItemCategory.HEAVY_SUPPORT, count: 1}
            ]))
            .withUnitToAdd(units.titans.scoutTitanWeapons.turboLaserDestructor)
            .build(),
        plasmaBlastgun: new UpgradeSpec.Builder(
            "Plasma Blastgun",
            "One Plasma Blastgun",
            ItemCost.fromEntries([
                {category: ItemCategory.UPGRADE, count: 0.5},
                {category: ItemCategory.HEAVY_SUPPORT, count: 1}
            ]))
            .withUnitToAdd(units.titans.scoutTitanWeapons.plasmaBlastgun)
            .build(),
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