import {Formation} from "./formation";


export class ArmySection {
    name: string
    formations: Formation[]

    constructor(name: string, formations: Formation[]) {
        this.name = name
        this.formations = formations
    }

    static Builder = class {
        name: string
        formations: Formation[]

        constructor(name: string) {
            this.name = name
            this.formations = []
        }

        withFormation(formation: Formation) {
            this.formations.push(formation)
            return this
        }

        build() {
            return new ArmySection(this.name, this.formations)
        }
    }
}

export class Army {
    id: string
    name: string
    imgUrl: string
    armySections: ArmySection[]

    constructor(id: string, name: string, imgUrl: string, armySections: ArmySection[]) {
        this.id = id
        this.name = name
        this.imgUrl = imgUrl
        this.armySections = armySections
    }
}
