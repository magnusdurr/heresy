import {Weapon} from "./weapon";

// TODO: Handle multiple weapons of same type & firing arcs
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
    notes?: string

    protected constructor(name: string, unitType: UnitType, armour: number, move: number, cc: number, ff: number, weapons: Weapon[], specialRules: SpecialRule[], dc: number, notes?: string) {
        this.name = name;
        this.unitType = unitType;
        this.armour = armour;
        this.move = move;
        this.cc = cc;
        this.ff = ff;
        this.weapons = weapons;
        this.specialRules = specialRules;
        this.dc = dc;
        this.notes = notes;
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
        notes?: string

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

        withStats(move: number, armour: number, cc: number, ff: number) {
            this.move = move;
            this.armour = armour;
            this.cc = cc;
            this.ff = ff;
            return this;
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

        withNotes(notes: string) {
            this.notes = notes;
            return this;
        }

        build(): Unit {
            return new Unit(this.name, this.unitType, this.armour, this.move, this.cc, this.ff, this.weapons, this.specialRules, this.dc, this.notes);
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

export class VariableSpecialRule extends SpecialRule {
    constructor(name: string, description: string[], abbreviation: string) {
        super(name, description, abbreviation);
    }

    withVariable(variable: string): SpecialRule {
        return new SpecialRule(this.name, this.description, this.abbreviation!.replace('$', variable));
    }
}

