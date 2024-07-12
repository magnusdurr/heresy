import {TestUpgradeSpec} from "./test";
import {TestFormationSpec} from "./testFormationSpec";

export interface BuildRestriction<Type> {
    isLegal(upgrades: Type[]): ValidationResult
}

export class ValidationResult {
    readonly success: boolean
    readonly blocking: boolean
    readonly message?: string

    constructor(success: boolean, blocking: boolean, message?: string) {
        this.success = success;
        this.blocking = blocking;
        this.message = message;
    }

    static readonly success = new ValidationResult(true, true)

    static failure(message: string): ValidationResult {
        return new ValidationResult(false, true, message)
    }

    static nonBlockingFailure(message: string): ValidationResult {
        return new ValidationResult(false, false, message)
    }
}

export class SingleAllyTypeRestriction implements BuildRestriction<TestFormationSpec> {
    private readonly allySections: string[]

    constructor(...allySections: string[]) {
        this.allySections = allySections
    }

    isLegal(formations: TestFormationSpec[]): ValidationResult {
        let allySections = formations.map(formation => formation.section)
            .filter(section => this.allySections.includes(section));

        if (new Set(allySections).size > 1) {
            return ValidationResult.failure(`Formations can only be from one of [${this.allySections.join(", ")}]`)
        } else {
            return ValidationResult.success
        }
    }
}

export class OncePerThingRestriction implements BuildRestriction<TestUpgradeSpec> {
    private upgrade: TestUpgradeSpec;
    private thing: string;

    constructor(upgrade: TestUpgradeSpec, thing: string) {
        this.upgrade = upgrade;
        this.thing = thing;
    }

    isLegal(upgrades: TestUpgradeSpec[]): ValidationResult {
        if (upgrades.filter(u => u === this.upgrade).length > 1) {
            return ValidationResult.failure(`${this.upgrade.name} can only be taken once per ${this.thing}`)
        } else {
            return ValidationResult.success
        }
    }
}

export class OncePerArmyRestriction extends OncePerThingRestriction {
    constructor(upgrade: TestUpgradeSpec) {
        super(upgrade, "army");
    }
}

export class OncePerFormationRestriction extends OncePerThingRestriction {
    constructor(upgrade: TestUpgradeSpec) {
        super(upgrade, "formation");
    }
}

export class OneFromGroupRestriction implements BuildRestriction<TestUpgradeSpec> {
    private upgradesInGroup: TestUpgradeSpec[];
    private groupName?: string;

    constructor(upgrades: TestUpgradeSpec[], groupName?: string) {
        this.upgradesInGroup = upgrades;
        this.groupName = groupName;
    }

    isLegal(upgrades: TestUpgradeSpec[]): ValidationResult {
        if (upgrades.filter(u => this.upgradesInGroup.includes(u)).length > 1) {
            return ValidationResult.failure(
                this.groupName ?
                    `Formation can only have one ${this.groupName}` :
                    `Formation can only have one from [${this.upgradesInGroup.map(u => u.name).join(", ")}]`
            )
        } else {
            return ValidationResult.success
        }
    }
}

export class MandatoryUpgradesRestriction implements BuildRestriction<TestUpgradeSpec> {
    private readonly min: number
    private readonly max: number
    private from: TestUpgradeSpec[]
    private groupName?: string;

    constructor(min: number, max: number, from: TestUpgradeSpec[], groupName?: string) {
        this.min = min;
        this.max = max;
        this.from = from;
        this.groupName = groupName;
    }

    isLegal(upgrades: TestUpgradeSpec[]): ValidationResult {
        let matches = upgrades.filter(upgrade => this.from.includes(upgrade));
        if (matches.length < this.min) {
            return ValidationResult.nonBlockingFailure(
                this.groupName ?
                    `Formation must have at least ${this.min} ${this.groupName}` :
                    `Formation must have at least ${this.min} upgrades from [${this.from.map(u => u.name).join(", ")}]`
            )
        } else if (matches.length > this.max) {
            return ValidationResult.failure(
                this.groupName ?
                    `Formation can have at most ${this.max} ${this.groupName}` :
                    `Formation can have at most ${this.max} upgrades from [${this.from.map(u => u.name).join(", ")}]`
            )
        } else {
            return ValidationResult.success
        }
    }
}
