import {Unit} from "./unit";

export class Upgrade {
    name: string
    cost: number
    type: UpgradeType
    description: string
    unitsToReplace: Map<Unit, number> // unit id -> number of units
    unitsToAdd: Map<Unit, number> // unit id -> number of units

    protected constructor(name: string, cost: number, type: UpgradeType, description: string, unitsToReplace: Map<Unit, number>, unitsToAdd: Map<Unit, number>) {
        this.name = name
        this.cost = cost
        this.type = type
        this.description = description
        this.unitsToReplace = unitsToReplace
        this.unitsToAdd = unitsToAdd
    }

    static Builder = class {
        name: string
        cost: number
        type: UpgradeType
        description: string = ''
        unitsToReplace: Map<Unit, number> = new Map()
        unitsToAdd: Map<Unit, number> = new Map()

        constructor(name: string, cost: number, type: UpgradeType) {
            this.name = name
            this.cost = cost
            this.type = type
        }

        withDescription(description: string) {
            this.description = description
            return this
        }

        withUnitToReplace(unit: Unit, number: number) {
            this.unitsToReplace.set(unit, number)
            return this
        }

        withUnitToAdd(unit: Unit, number: number) {
            this.unitsToAdd.set(unit, number)
            return this
        }

        build() {
            return new Upgrade(this.name, this.cost, this.type, this.description, this.unitsToReplace, this.unitsToAdd)
        }
    }
}

export enum UpgradeType {
    ADD, REPLACE
}

export class Formation {
    name: string
    cost: number = 1
    units: Map<Unit, number>
    upgradeOptions: Upgrade[]

    protected constructor(name: string, units: Map<Unit, number>, upgradeOptions: Upgrade[]) {
        this.name = name
        this.units = units
        this.upgradeOptions = upgradeOptions
    }

    static Builder = class {
        name: string
        units: Map<Unit, number>
        upgradeOptions: Upgrade[] = []

        constructor(name: string) {
            this.name = name
            this.units = new Map()
        }

        withUnit(unit: Unit, number: number) {
            this.units.set(unit, number)
            return this
        }

        withUpgradeOption(upgrade: Upgrade) {
            this.upgradeOptions.push(upgrade)
            return this
        }

        build() {
            return new Formation(this.name, this.units, this.upgradeOptions)
        }
    }
}
