import {Weapon, WeaponMode, WeaponType} from "../ts/weapon";
import {specialRules} from "./data-special-rules";

export const weapons = {
    bolter: new Weapon.Builder("Bolter")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .build()
        )
        .build(),

    meltaGun: new Weapon.Builder("Melta Gun")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AT, 6)
            .withSpecialRule(specialRules.macro)
            .build()
        )
        .build(),

    plasmaRifle: new Weapon.Builder("Plasma Rifle")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .withSpecialRule(specialRules.energetic)
            .build()
        )
        .build(),

    missileLauncher: new Weapon.Builder("Missile Launcher")
        .withRange(60)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    assaultCannon: new Weapon.Builder("Assault Cannon")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 5)
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
        .build()
}