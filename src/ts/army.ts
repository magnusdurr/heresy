import {Formation} from "./formation";

export class Army {
    id: string
    name: string
    imgUrl: string
    armySections: OldArmySection[]

    constructor(id: string, name: string, imgUrl: string, armySections: OldArmySection[]) {
        this.id = id
        this.name = name
        this.imgUrl = imgUrl
        this.armySections = armySections
    }
}

export class OldArmySection {
    name: string
    formations: Formation[]

    constructor(name: string, formations: Formation[]) {
        this.name = name
        this.formations = formations
    }
}

