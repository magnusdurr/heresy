import {Unit} from "./unit";
import {ItemCost} from "./itemCost";
import {Weapon} from "./weapon";

export enum UpgradeType {
    FORMATION, WEAPON
}

export class UpgradeSpec {
    readonly type: UpgradeType
    readonly name: string
    readonly description: string
    readonly cost: ItemCost
    readonly unitsToReplace: Map<Unit, number> // unit id -> number of units
    readonly unitsToAdd: Map<Unit, number> // unit id -> number of units
    readonly weaponToAdd?: Weapon

    constructor(
        type: UpgradeType,
        name: string,
        description: string,
        cost: ItemCost,
        unitsToReplace: Map<Unit, number>,
        unitsToAdd: Map<Unit, number>,
        weaponToAdd?: Weapon
    ) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.unitsToReplace = unitsToReplace;
        this.unitsToAdd = unitsToAdd;
        this.weaponToAdd = weaponToAdd;
    }

    static weaponUpgrade(cost: ItemCost, weapon: Weapon) {
        return new UpgradeSpec(UpgradeType.WEAPON, weapon.name, "", cost, new Map(), new Map(), weapon);
    }

    static Builder = class {
        private readonly name: string
        private readonly description: string
        private readonly cost: ItemCost
        private readonly unitsToReplace: Map<Unit, number> = new Map()
        private readonly unitsToAdd: Map<Unit, number> = new Map()

        constructor(name: string, description: string, cost: ItemCost) {
            this.name = name;
            this.description = description
            this.cost = cost;
        }

        withUnitToReplace(unit: Unit, number?: number) {
            this.unitsToReplace.set(unit, number ?? 1);
            return this;
        }

        withUnitToAdd(unit: Unit, number?: number) {
            this.unitsToAdd.set(unit, number ?? 1);
            return this;
        }

        build() {
            return new UpgradeSpec(UpgradeType.FORMATION, this.name, this.description, this.cost, this.unitsToReplace, this.unitsToAdd);
        }
    }
}