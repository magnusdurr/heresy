import {FormationSpec} from "./formationSpec";

export class ArmySection {
    name: string
    formations: FormationSpec[]

    constructor(name: string, formations: FormationSpec[]) {
        this.name = name
        this.formations = formations
    }
}