import {TestFormationSpec} from "./testFormationSpec";

export class ArmySection {
    name: string
    formations: TestFormationSpec[]

    constructor(name: string, formations: TestFormationSpec[]) {
        this.name = name
        this.formations = formations
    }
}