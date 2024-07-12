import {lsArmySpec} from "./legiones-astartes";
import {ArmySpec} from "../ts/armySpec";

export const armies: ArmySpec[] = [
    lsArmySpec,

    new ArmySpec.Builder("Solar Auxilia", "./img/SolarAuxilia.jpg")
        .build()
]