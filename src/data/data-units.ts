import {Unit, UnitType} from "../ts/unit";
import {specialRules} from "./data-special-rules";
import {weapons} from "./data-weapons";

export const units = {
    supremeCommander: new Unit.Builder("Supreme Commander", UnitType.CHAR)
        .withSpecialRule(specialRules.supremeCommander)
        .withSpecialRule(specialRules.invulnerableSave)
        .withWeapon(weapons.powerSword)
        .build(),

    sergeant: new Unit.Builder("Sergeant", UnitType.CHAR)
        .withSpecialRule(specialRules.leader)
        .build(),

    tacticals: new Unit.Builder("Tacticals", UnitType.INF)
        .withMove(15)
        .withArmour(4)
        .withFF(4)
        .withCC(3)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.meltaGun)
        .build(),

    havocs: new Unit.Builder("Havocs", UnitType.INF)
        .withMove(15)
        .withArmour(4)
        .withFF(4)
        .withCC(5)
        .withWeapon(weapons.missileLauncher)
        .build(),

    rhino: new Unit.Builder("Rhino", UnitType.AV)
        .withMove(30)
        .withArmour(5)
        .withFF(6)
        .withCC(6)
        .withWeapon(weapons.bolter)
        .build()
}
