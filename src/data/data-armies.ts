import {legionesAstartesArmySpec} from "./legiones-astartes";
import {ArmySpec} from "../ts/armySpec";

export const armies: ArmySpec[] = [
    legionesAstartesArmySpec,

    new ArmySpec.Builder("Solar Auxilia", "./img/SolarAuxilia.jpg")
        .build()
]