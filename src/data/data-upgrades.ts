import {Upgrade, UpgradeType} from "../ts/formation";
import {units} from "./data-units";

export const upgrades = {
    rhinos: new Upgrade.Builder("Rhinos", 1, UpgradeType.ADD)
        .withDescription("Add enough Rhinos to transport all units in the formation")
        .withUnitToAdd(units.rhino, 1),

    supremeCommander: new Upgrade.Builder("Supreme Commander", 0, UpgradeType.ADD)
        .withDescription("Add a supreme commander to the formation")
        .withUnitToAdd(units.supremeCommander, 1)
}