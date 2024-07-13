import {Unit, UnitType} from "../ts/unit";
import {specialRules} from "./data-special-rules";
import {weapons} from "./data-weapons";
import {EquippedWeapon} from "../ts/weapon";

export const units = {
    supremeCommander: new Unit.Builder("Command Squad w. Supreme Commander", UnitType.INF)
        .withStats(15, 4, 2, 4)
        .withSpecialRule(specialRules.supremeCommander)
        .withSpecialRule(specialRules.invulnerableSave)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.plasmaPistol)
        .withWeapon(weapons.powerSword)
        .build(),

    chaplain: new Unit.Builder("Command Squad w. Chaplain", UnitType.INF)
        .withStats(15, 4, 2, 4)
        .withSpecialRule(specialRules.blitz)
        .withSpecialRule(specialRules.command.withVariable("15"))
        .withSpecialRule(specialRules.inspiring)
        .withSpecialRule(specialRules.invulnerableSave)
        .withSpecialRule(specialRules.leader)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.plasmaPistol)
        .withWeapon(weapons.powerSword)
        .build(),

    sergeant: new Unit.Builder("Sergeant", UnitType.CHAR)
        .withSpecialRule(specialRules.leader)
        .build(),

    legionairesTactical: new Unit.Builder("Tactical Legionaries", UnitType.INF)
        .withStats(15, 4, 3, 4)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.meltagun)
        .build(),

    legionairesSpecialistPlasmaGuns: new Unit.Builder("Specialist Legionaries", UnitType.INF)
        .withStats(15, 4, 5, 3)
        .withEquippedWeapon(new EquippedWeapon(weapons.plasmaGun, 2))
        .build(),

    havocs: new Unit.Builder("Havocs", UnitType.INF)
        .withMove(15)
        .withArmour(4)
        .withFF(4)
        .withCC(5)
        .withEquippedWeapon(new EquippedWeapon(weapons.missileLauncher, 3))
        .build(),

    dreadnought: new Unit.Builder("Contemptor Assault Dreadnought", UnitType.AV)
        .withMove(15)
        .withArmour(3)
        .withFF(4)
        .withCC(3)
        .withWeapon(weapons.assaultCannonDread)
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
        .build(),

    sicarianAccelerator: new Unit.Builder("Sicarian Accelerator", UnitType.AV)
        .withStats(25, 5, 6, 4)
        .withWeapon(weapons.autocannonTwinAccelerotor)
        .withEquippedWeapon(new EquippedWeapon(weapons.bolterHeavy, 2))
        .withSpecialRule(specialRules.reinforcedArmour)
        .build(),

    sicarianPlasma: new Unit.Builder("Sicarian Plasma", UnitType.AV)
        .withStats(25, 5, 6, 4)
        .withWeapon(weapons.omegaPlasmaArray)
        .withEquippedWeapon(new EquippedWeapon(weapons.lascannon, 2))
        .withSpecialRule(specialRules.reinforcedArmour)
        .build()
}
