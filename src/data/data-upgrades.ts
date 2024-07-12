import {UpgradeSpec} from "../ts/upgradeSpec";
import {ItemCost} from "../ts/itemCost";
import {ItemCategory} from "../ts/itemCategory";
import {units} from "./data-units";

export const testUpgrades = {
    rhinos: new UpgradeSpec.Builder("Rhinos",
        "Add enough Rhinos to transport all units in the formation, all units in the formation must fit in the Rhinos.",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK]))
        .withUnitToAdd(units.rhino, 1)
        .build(),

    supreme: new UpgradeSpec.Builder("Supreme Commander",
        "Add a supreme commander to the formation",
        ItemCost.fromList([ItemCategory.CORE]))
        .withUnitToAdd(units.supremeCommander, 1)
        .build(),

    plasma: new UpgradeSpec.Builder("Plasma Gun Legionaries",
        "Add two Plasma Gun Legionaries to the formation",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.CORE]))
        .withUnitToAdd(units.tacticalsPlasma, 2)
        .build(),

    dreadnoughts: new UpgradeSpec.Builder("Dreadnoughts",
        "Add two Dreadnoughts to the formation",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT]))
        .withUnitToAdd(units.dreadnought, 2)
        .build(),

    commander: new UpgradeSpec.Builder("Commander",
        "Add one Commander to the formation",
        new ItemCost(new Map([[ItemCategory.UPGRADE, 1], [ItemCategory.ELITE, 0.5]])))
        .withUnitToAdd(units.commander, 1)
        .build(),

    warhoundPair: new UpgradeSpec.Builder("Warhound Titan Pair", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK, ItemCategory.ELITE])).build(),
    st_vulcanMegaBolter: new UpgradeSpec.Builder("Vulcan Mega-Bolter", "", ItemCost.fromList([ItemCategory.CORE])).build(),
    st_infernoGun: new UpgradeSpec.Builder("Inferno Gun", "", ItemCost.fromList([ItemCategory.CORE])).build(),
    st_scoutTLD: new UpgradeSpec.Builder("Scout Turbo-Laser Destructor", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT])).build(),
    st_plasmaBlastgun: new UpgradeSpec.Builder("Plasma Blastgun", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT])).build()
}