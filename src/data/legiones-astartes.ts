import {Formation} from "../ts/formation";
import {Army, OldArmySection} from "../ts/army";
import {units} from "./data-units";
import {upgrades} from "./data-upgrades";

export const smArmy = new Army("1",
    "Legiones Astartes",
    "./img/LegionesAstartes.jpg",
    [
        new OldArmySection("Core", [
            new Formation.Builder("Tactical Detachment")
                .withUnit(units.sergeant, 1)
                .withUnit(units.tacticals, 4)
                .withUpgradeOption(upgrades.rhinos)
                .withUpgradeOption(upgrades.supremeCommander)
                .build()
        ]),
        new OldArmySection("Heavy Support", [
            new Formation.Builder("Heavy Support Detachment")
                .withUnit(units.sergeant, 1)
                .withUnit(units.havocs, 4)
                .build(),
            new Formation.Builder("Sicarian Detachment").build(),
            new Formation.Builder("Predator Detachment").build()
        ])
    ])