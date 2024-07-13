import {UpgradeSpec} from "../ts/upgradeSpec";
import {ItemCost} from "../ts/itemCost";
import {ItemCategory} from "../ts/itemCategory";
import {units} from "./data-units";

export const testUpgrades = {
    supreme: new UpgradeSpec.Builder("Supreme Commander",
        "Add a Supreme Commander in a Command Squad to the formation",
        ItemCost.fromList([]))
        .withUnitToAdd(units.supremeCommander, 1)
        .build(),

    specialistPlasma: new UpgradeSpec.Builder("Specialist Legionaries",
        "Add two Plasma Gun Legionaries to the formation",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.CORE]))
        .withUnitToAdd(units.legionairesSpecialistPlasmaGuns, 2)
        .build(),

    rhinos: new UpgradeSpec.Builder("Rhinos",
        "Add enough Rhinos to transport all units in the formation, all units in the formation must fit in the Rhinos.",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK]))
        .withUnitToAdd(units.rhino, 1)
        .build(),

    dreadnoughts: new UpgradeSpec.Builder("Dreadnoughts",
        "Add two Dreadnoughts to the formation",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT]))
        .withUnitToAdd(units.dreadnought, 2)
        .build(),

    commander: new UpgradeSpec.Builder("Chaplain",
        "Add one Chaplain in a Command Squad to the formation",
        new ItemCost(new Map([[ItemCategory.UPGRADE, 1], [ItemCategory.ELITE, 0.5]])))
        .withUnitToAdd(units.chaplain, 1)
        .build(),

    predatorAnnihilators: new UpgradeSpec.Builder("Annihilators",
        "Replace the Predator Destructors with Predator Annihilators",
        ItemCost.fromList([]))
        .withUnitToAdd(units.predatorAnnihilator, 3)
        .withUnitToReplace(units.predatorDestructor, 3)
        .build(),

    sicarianPlasma: new UpgradeSpec.Builder("Plasma Weapons",
        "Replace the Sicarian Accelerators with Sicarian Plasma",
        ItemCost.fromList([]))
        .withUnitToAdd(units.sicarianPlasma, 2)
        .withUnitToReplace(units.sicarianAccelerator, 2)
        .build(),

    thunderHawk: new UpgradeSpec.Builder("Thunderhawk",
        "Replace the Storm Eagle with a Thunderhawk",
        ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK]))
        .withUnitToAdd(units.thunderHawk)
        .withUnitToReplace(units.stormEagle)
        .build(),

    warhoundPair: new UpgradeSpec.Builder("Warhound Titan Pair", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.UPGRADE, ItemCategory.FAST_ATTACK, ItemCategory.ELITE])).build(),
    st_vulcanMegaBolter: new UpgradeSpec.Builder("Vulcan Mega-Bolter", "", ItemCost.fromList([ItemCategory.CORE])).build(),
    st_infernoGun: new UpgradeSpec.Builder("Inferno Gun", "", ItemCost.fromList([ItemCategory.CORE])).build(),
    st_scoutTLD: new UpgradeSpec.Builder("Scout Turbo-Laser Destructor", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT])).build(),
    st_plasmaBlastgun: new UpgradeSpec.Builder("Plasma Blastgun", "", ItemCost.fromList([ItemCategory.UPGRADE, ItemCategory.HEAVY_SUPPORT])).build()
}