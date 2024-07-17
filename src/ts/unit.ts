import {EquippedWeapon, FiringArc, Weapon} from "./weapon";

export class Unit {
    readonly name: string
    readonly unitType: UnitType
    readonly armour: number
    readonly move: number
    readonly cc: number
    readonly ff: number
    readonly weapons: EquippedWeapon[]
    readonly specialRules: SpecialRule[]
    readonly dc: number
    readonly notes?: string

    protected constructor(name: string, unitType: UnitType, armour: number, move: number, cc: number, ff: number, weapons: EquippedWeapon[], specialRules: SpecialRule[], dc: number, notes?: string) {
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
        private readonly name: string
        private readonly unitType: UnitType
        private armour: number
        private move: number
        private cc: number
        private ff: number
        private weapons: EquippedWeapon[]
        private specialRules: SpecialRule[]
        private dc: number
        private notes?: string

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

        withSpecialRule(specialRule: SpecialRule) {
            this.specialRules.push(specialRule);
            return this;
        }

        withSpecialRules(...specialRule: SpecialRule[]) {
            specialRule.forEach(rule => this.specialRules.push(rule));
            return this;
        }

        withWeapon(weapon: Weapon, count?: number) {
            this.weapons.push(new EquippedWeapon(weapon, count ?? 1));
            return this;
        }

        withFiringArcWeapon(weapon: Weapon, firingArc: FiringArc, count?: number) {
            this.weapons.push(new EquippedWeapon(weapon, count ?? 1, firingArc));
            return this;
        }

        withEquippedWeapon(weapon: EquippedWeapon) {
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
    CHAR, INF, LV, AV, HAV, WE, FIGHTER
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
    withVariable(variable: string): SpecialRule {
        return new SpecialRule(this.name, this.description, this.abbreviation!.replace('$', variable));
    }
}

