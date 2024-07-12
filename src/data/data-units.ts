import {Unit, UnitType} from "../ts/unit";
import {specialRules} from "./data-special-rules";
import {weapons} from "./data-weapons";

export const units = {
    supremeCommander: new Unit.Builder("Supreme Commander", UnitType.INF)
        .withStats(15, 4, 3, 4)
        .withSpecialRule(specialRules.supremeCommander)
        .withSpecialRule(specialRules.invulnerableSave)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.powerSword)
        .build(),

    commander: new Unit.Builder("Commander", UnitType.INF)
        .withStats(15, 4, 2, 4)
        .withSpecialRule(specialRules.invulnerableSave)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.powerSword)
        .build(),

    sergeant: new Unit.Builder("Sergeant", UnitType.CHAR)
        .withSpecialRule(specialRules.leader)
        .build(),

    tacticals: new Unit.Builder("Legionaries", UnitType.INF)
        .withStats(15, 4, 3, 4)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.meltaGun)
        .build(),

    tacticalsPlasma: new Unit.Builder("Plasma Gun Legionaries", UnitType.INF)
        .withMove(15)
        .withArmour(4)
        .withFF(3)
        .withCC(5)
        .withWeapon(weapons.plasmaRifle)
        .build(),

    havocs: new Unit.Builder("Havocs", UnitType.INF)
        .withMove(15)
        .withArmour(4)
        .withFF(4)
        .withCC(5)
        .withWeapon(weapons.missileLauncher)
        .build(),

    dreadnought: new Unit.Builder("Assault Dreadnought", UnitType.AV)
        .withMove(15)
        .withArmour(3)
        .withFF(4)
        .withCC(3)
        .withWeapon(weapons.assaultCannon)
        .withWeapon(weapons.powerFist)
        .build(),

    rhino: new Unit.Builder("Rhino", UnitType.AV)
        .withMove(30)
        .withArmour(5)
        .withFF(6)
        .withCC(6)
        .withWeapon(weapons.bolter)
        .withSpecialRule(specialRules.transport.withVariable("2"))
        .build(),

    rhinoSupport: new Unit.Builder("Support Rhino", UnitType.AV)
        .withStats(30, 5, 6, 6)
        .withWeapon(weapons.missileLauncher)
        .withSpecialRule(specialRules.transport.withVariable("1"))
        .build()
}
