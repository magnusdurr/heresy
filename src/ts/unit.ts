import {Weapon} from "./weapon";

export class Unit {
    name: string
    unitType: UnitType
    armour: number
    move: number
    cc: number
    ff: number
    weapons: Weapon[]
    specialRules: SpecialRule[]
    dc: number

    protected constructor(name: string, unitType: UnitType, armour: number, move: number, cc: number, ff: number, weapons: Weapon[], specialRules: SpecialRule[], dc: number) {
        this.name = name;
        this.unitType = unitType;
        this.armour = armour;
        this.move = move;
        this.cc = cc;
        this.ff = ff;
        this.weapons = weapons;
        this.specialRules = specialRules;
        this.dc = dc;
    }

    static Builder = class {
        name: string
        unitType: UnitType
        armour: number
        move: number
        cc: number
        ff: number
        weapons: Weapon[]
        specialRules: SpecialRule[]
        dc: number

        constructor(name: string, unitType: UnitType) {
            this.name = name
            this.unitType = unitType;
            this.armour = 0;
            this.move = 0;
            this.cc = 0;
            this.ff = 0;
            this.weapons = [];
            this.specialRules = [];
            this.dc = 0;
        }

        withArmour(armour: number) {
            this.armour = armour;
            return this;
        }

        withMove(move: number) {
            this.move = move;
            return this;
        }

        withCC(cc: number) {
            this.cc = cc;
            return this;
        }

        withFF(ff: number) {
            this.ff = ff;
            return this;
        }

        withSpecialRule(specialRule: SpecialRule) {
            this.specialRules.push(specialRule);
            return this;
        }

        withWeapon(weapon: Weapon) {
            this.weapons.push(weapon);
            return this;
        }

        withDC(dc: number) {
            this.dc = dc;
            return this;
        }

        build(): Unit {
            return new Unit(this.name, this.unitType, this.armour, this.move, this.cc, this.ff, this.weapons, this.specialRules, this.dc);
        }
    }
}

export enum UnitType {
    CHAR, INF, LV, AV, HAV, WE
}

export class SpecialRule {
    abbreviation?: string
    name: string
    description: string[]

    constructor(name: string, description: string[], abbreviation?: string) {
        this.abbreviation = abbreviation;
        this.name = name;
        this.description = description;
    }
}

