import {Formation} from "./formation";

export class ArmyList {
    formationPoints: number // Number of points spent on formations
    upgradePoints: number // of upgrade points available to spend

    formations: Formation[] = []

    constructor(formationPoints: number, upgradePoints: number) {
        this.formationPoints = formationPoints
        this.upgradePoints = upgradePoints
    }

    addFormation(formation: Formation) {
        if (this.formationPoints < formation.cost) {
            throw new Error("Not enough points to add formation")
        }

        this.formationPoints -= formation.cost
        this.formations.push(formation)
    }
}

export class ArmyRestrictions {
    fastAttackPoints: number
    heavySupportPoints: number
    elitePoints: number
    alliesPoints: number

    constructor(fastAttackPoints: number, heavySupportPoints: number, elitePoints: number, alliesPoints: number) {
        this.fastAttackPoints = fastAttackPoints;
        this.heavySupportPoints = heavySupportPoints;
        this.elitePoints = elitePoints;
        this.alliesPoints = alliesPoints;
    }
}