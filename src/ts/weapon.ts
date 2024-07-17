import {SpecialRule} from "./unit";

export enum WeaponType {
    AP = "AP", AT = "AT", AA = "AA", ASSAULT = "Assault", FIRE_FIGHT = "Small Arms", BP = "BP"
}

export enum FiringArc {
    FIXED_FORWARD = "FxF",
    FORWARD_ARC = "FwA"
}

export class EquippedWeapon {
    weapon: Weapon
    count: number
    firingArc?: FiringArc

    constructor(weapon: Weapon, count?: number, firingArc?: FiringArc) {
        this.weapon = weapon;
        this.count = count ?? 1;
        this.firingArc = firingArc;
    }

    firingArcSpecialRule(): SpecialRule | undefined {
        switch (this.firingArc) {
            case FiringArc.FIXED_FORWARD:
                return new SpecialRule("Fixed Forward", ["TODO"], "FxF")
            case FiringArc.FORWARD_ARC:
                return new SpecialRule("Forward Arc", ["TODO"], "FwA")
            default:
                return undefined
        }
    }
}

export class Weapon {
    name: string
    range: number
    shots: number
    modes: WeaponMode[]

    protected constructor(name: string, range: number, shots: number, modes: WeaponMode[]) {
        this.name = name
        this.range = range
        this.shots = shots
        this.modes = modes
    }

    static Builder = class {
        name: string
        range: number
        shots: number
        modes: WeaponMode[]

        constructor(name: string) {
            this.name = name
            this.range = 0
            this.shots = 1
            this.modes = []
        }

        withRange(range: number) {
            this.range = range
            return this
        }

        withShots(shots: number) {
            this.shots = shots
            return this
        }

        withMode(mode: WeaponMode) {
            this.modes.push(mode)
            return this
        }

        build() {
            return new Weapon(this.name, this.range, this.shots, this.modes)
        }
    }
}

export class WeaponMode {
    attacks: WeaponAttackType[]
    specialRules: SpecialRule[]
    joinType?: string

    constructor(attacks: WeaponAttackType[], specialRules: SpecialRule[], joinType?: string) {
        this.attacks = attacks
        this.specialRules = specialRules
        this.joinType = joinType
    }

    firepower(shots: number): string {
        return (shots > 1 ? shots + 'x ' : '') + this.attacks.map(attack => (attack.displayString())).join("/")
    }

    static Builder = class {
        attacks: WeaponAttackType[]
        specialRules: SpecialRule[]
        joinType?: string

        constructor() {
            this.attacks = []
            this.specialRules = []
            this.joinType = undefined
        }

        withType(type: WeaponType, toHit: number) {
            this.attacks.push(new WeaponAttackType(type, toHit))
            return this
        }

        withAssaultType() {
            this.attacks.push(new WeaponAttackType(WeaponType.ASSAULT, 0))
            return this
        }

        withSmallArmsType() {
            this.attacks.push(new WeaponAttackType(WeaponType.FIRE_FIGHT, 0))
            return this
        }

        withSpecialRule(specialRule: SpecialRule) {
            this.specialRules.push(specialRule)
            return this
        }

        withJoinType(joinType: string) {
            this.joinType = joinType
            return this
        }

        build() {
            return new WeaponMode(this.attacks, this.specialRules, this.joinType)
        }
    }
}

export class WeaponAttackType {
    type: WeaponType
    toHit: number

    constructor(type: WeaponType, toHit: number) {
        this.type = type
        this.toHit = toHit
    }

    displayString() {
        return this.type + (this.toHit > 1 ? this.toHit + '+' : '')
    }
}