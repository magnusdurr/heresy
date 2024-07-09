import {smArmy} from "./legiones-astartes";
import {Army} from "../ts/army";

export const armies: Army[] = [
    smArmy,
    new Army("2",
        "Solar Auxilia",
        "./img/SolarAuxilia.jpg",
        [])
]