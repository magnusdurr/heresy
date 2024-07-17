import {Weapon, WeaponMode, WeaponType} from "../ts/weapon";
import {specialRules} from "./data-special-rules";

export const weapons = {
    assaultCannonDread: new Weapon.Builder("Dreadnought Assault Cannon")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 4)
            .withType(WeaponType.AT, 5)
            .build()
        )
        .build(),

    autocannonTwinAccelerotor: new Weapon.Builder("Twin Accelerator Autocannon")
        .withRange(45)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 6)
            .withType(WeaponType.AA, 6)
            .build()
        )
        .build(),

    autocannonPredator: new Weapon.Builder("Predator Autocannon")
        .withRange(45)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    battleCannon: new Weapon.Builder("Battle Cannon")
        .withRange(75)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 4)
            .withType(WeaponType.AT, 4)
            .build()
        )
        .build(),

    bolter: new Weapon.Builder("Bolter")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .build()
        )
        .build(),

    bolterCombi: new Weapon.Builder("Combi-Bolter")
        .withRange(30)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .build()
        )
        .build(),

    bolterHeavy: new Weapon.Builder("Heavy Bolter")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 4)
            .build()
        )
        .build(),

    bolterHeavyTwinAC: new Weapon.Builder("Aircraft Twin Heavy Bolter")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 3)
            .withType(WeaponType.AA, 5)
            .build()
        )
        .build(),

    boltPistol: new Weapon.Builder("Bolt Pistol")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .build()
        )
        .build(),

    chainsword: new Weapon.Builder("Chainsword")
        .withRange(0)
        .withMode(new WeaponMode.Builder()
            .withAssaultType()
            .withSpecialRule(specialRules.extraAttack.withVariable("1"))
            .build()
        )
        .build(),

    lascannon: new Weapon.Builder("Lascannon")
        .withRange(45)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 5)
            .build()
        )
        .build(),

    lascannonTwin: new Weapon.Builder("Twin Lascannon")
        .withRange(45)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 4)
            .build()
        )
        .build(),

    lascannonQuad: new Weapon.Builder("Quad Lascannon")
        .withRange(45)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 3)
            .build()
        )
        .build(),

    lascannonQuadAC: new Weapon.Builder("AC Quad Lascannon")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AT, 6)
            .withType(WeaponType.AA, 6)
            .build()
        )
        .build(),

    lasgun: new Weapon.Builder("Lasgun")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .build()
        )
        .build(),

    meltagun: new Weapon.Builder("Meltagun")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AT, 6)
            .withSpecialRule(specialRules.macro)
            .build()
        )
        .build(),

    missileLauncher: new Weapon.Builder("Missile Launcher")
        .withRange(60)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    multilaser: new Weapon.Builder("Multi-Laser")
        .withRange(45)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    omegaPlasmaArray: new Weapon.Builder("Omega Plasma Array")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 5)
            .withSpecialRule(specialRules.macro)
            .withSpecialRule(specialRules.energetic)
            .build()
        )
        .build(),

    plasmaGun: new Weapon.Builder("Plasma Gun")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .withSpecialRule(specialRules.energetic)
            .build()
        )
        .build(),

    plasmaPistol: new Weapon.Builder("Plasma Pistol")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    powerSword: new Weapon.Builder("Power Sword")
        .withMode(new WeaponMode.Builder()
            .withSpecialRule(specialRules.macro)
            .withSpecialRule(specialRules.extraAttack.withVariable("1"))
            .withAssaultType()
            .build())
        .build(),

    powerFist: new Weapon.Builder("Power Fist")
        .withMode(new WeaponMode.Builder()
            .withSpecialRule(specialRules.macro)
            .withAssaultType()
            .build())
        .build(),

    vanquisherCannon: new Weapon.Builder("Vanquisher Cannon")
        .withRange(90)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 3)
            .build()
        )
        .build(),

    xiphonRotaryMissiles: new Weapon.Builder("AC Rotary Missile Launcher")
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AA, 6)
            .build())
        .withRange(15)
        .build()
}