import {Formation} from "../ts/formation";
import {Army, ArmySection} from "../ts/army";
import {units} from "./data-units";
import {upgrades} from "./data-upgrades";

export const smArmy = new Army("1",
    "Legiones Astartes",
    "./img/LegionesAstartes.jpg",
    [
        new ArmySection.Builder("Core")
            .withFormation(
                new Formation.Builder("Tactical Detachment")
                    .withUnit(units.sergeant, 1)
                    .withUnit(units.tacticals, 4)
                    .withUpgradeOption(upgrades.rhinos)
                    .withUpgradeOption(upgrades.supremeCommander)
                    .build()
            )
            .build(),
        new ArmySection.Builder("Heavy Support")
            .withFormation(
                new Formation.Builder("Heavy Support Detachment")
                    .withUnit(units.sergeant, 1)
                    .withUnit(units.havocs, 4)
                    .build())
            .withFormation(new Formation.Builder("Sicarian Detachment").build())
            .withFormation(new Formation.Builder("Predator Detachment").build())
            .build()
    ])