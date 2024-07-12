import {Unit} from "./unit";
import {TestCategories} from "./test";

export class UpgradeSpec {
    name: string
    description: string
    cost: TestCategories
    unitsToReplace: Map<Unit, number> // unit id -> number of units
    unitsToAdd: Map<Unit, number> // unit id -> number of units

    constructor(name: string, description: string, cost: TestCategories, unitsToReplace: Map<Unit, number>, unitsToAdd: Map<Unit, number>) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.unitsToReplace = unitsToReplace;
        this.unitsToAdd = unitsToAdd;
    }

    static Builder = class {
        private readonly name: string
        private readonly description: string
        private readonly cost: TestCategories
        private readonly unitsToReplace: Map<Unit, number> = new Map()
        private readonly unitsToAdd: Map<Unit, number> = new Map()

        constructor(name: string, description: string, cost: TestCategories) {
            this.name = name;
            this.description = description
            this.cost = cost;
        }

        withUnitToReplace(unit: Unit, number: number) {
            this.unitsToReplace.set(unit, number);
            return this;
        }

        withUnitToAdd(unit: Unit, number: number) {
            this.unitsToAdd.set(unit, number);
            return this;
        }

        build() {
            return new UpgradeSpec(this.name, this.description, this.cost, this.unitsToReplace, this.unitsToAdd);
        }
    }
}