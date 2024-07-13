import {Unit, UnitType} from "../ts/unit";
import {specialRules} from "./data-special-rules";
import {weapons} from "./data-weapons";
import {FiringArc} from "../ts/weapon";

export const units = {
    supremeCommander: new Unit.Builder("Command Squad w. Supreme Commander", UnitType.INF)
        .withStats(15, 4, 2, 4)
        .withSpecialRule(specialRules.supremeCommander)
        .withSpecialRule(specialRules.invulnerableSave)
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
        .withWeapon(weapons.plasmaPistol)
        .withWeapon(weapons.powerSword)
        .build(),

    sergeant: new Unit.Builder("Sergeant", UnitType.CHAR)
        .withSpecialRule(specialRules.leader)
        .build(),

    legionairesAssault: new Unit.Builder("Assault Legionaries", UnitType.INF)
        .withStats(30, 4, 3, 5)
        .withWeapon(weapons.boltPistol)
        .withWeapon(weapons.chainsword)
        .withSpecialRules(specialRules.jumpPack, specialRules.bulky)
        .build(),

    legionairesTactical: new Unit.Builder("Tactical Legionaries", UnitType.INF)
        .withStats(15, 4, 3, 4)
        .withWeapon(weapons.bolter)
        .withWeapon(weapons.meltagun)
        .build(),

    legionairesSpecialistPlasmaGuns: new Unit.Builder("Specialist Legionaries", UnitType.INF)
        .withStats(15, 4, 5, 3)
        .withWeapon(weapons.plasmaGun, 2)
        .build(),

    havocs: new Unit.Builder("Havocs", UnitType.INF)
        .withStats(15, 4, 5, 4)
        .withWeapon(weapons.missileLauncher, 3)
        .build(),

    dreadnought: new Unit.Builder("Contemptor Assault Dreadnought", UnitType.AV)
        .withStats(15, 3, 3, 4)
        .withWeapon(weapons.assaultCannonDread)
        .withWeapon(weapons.powerFist)
        .build(),

    predatorAnnihilator: new Unit.Builder("Predator Annihilator", UnitType.AV)
        .withStats(30, 4, 6, 5)
        .withWeapon(weapons.lascannonTwin)
        .withWeapon(weapons.lascannon, 2)
        .build(),

    predatorDestructor: new Unit.Builder("Predator Destructor", UnitType.AV)
        .withStats(30, 4, 6, 4)
        .withWeapon(weapons.autocannonPredator)
        .withWeapon(weapons.bolterHeavy, 2)
        .build(),

    rhino: new Unit.Builder("Rhino", UnitType.AV)
        .withStats(30, 5, 6, 6)
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
        .withWeapon(weapons.bolterHeavy, 2)
        .withSpecialRule(specialRules.reinforcedArmour)
        .build(),

    sicarianPlasma: new Unit.Builder("Sicarian Plasma", UnitType.AV)
        .withStats(25, 5, 6, 4)
        .withWeapon(weapons.omegaPlasmaArray)
        .withWeapon(weapons.lascannon, 2)
        .withSpecialRule(specialRules.reinforcedArmour)
        .build(),

    stormEagle: new Unit.Builder("Storm Eagle", UnitType.WE)
        .withStats(30, 4, 6, 5)
        .withDC(2)
        .withFiringArcWeapon(weapons.lascannonQuad, FiringArc.FORWARD_ARC)
        .withFiringArcWeapon(weapons.bolterHeavyTwinAC, FiringArc.FORWARD_ARC)
        .withSpecialRules(specialRules.reinforcedArmour, specialRules.transport.withVariable("4"))
        // TODO .withCritEffect("The Storm Eagle is destroyed")
        .build(),

    thunderHawk: new Unit.Builder("Thunderhawk", UnitType.WE)
        .withStats(30, 4, 6, 5)
        .withDC(3)
        .withFiringArcWeapon(weapons.battleCannon, FiringArc.FORWARD_ARC)
        .withFiringArcWeapon(weapons.bolterHeavyTwinAC, FiringArc.FORWARD_ARC, 4)
        .withSpecialRules(specialRules.reinforcedArmour, specialRules.transport.withVariable("8"))
        // TODO .withCritEffect("The Storm Eagle is destroyed")
        .build()
}
