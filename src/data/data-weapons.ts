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

    missileLauncher: new Weapon.Builder("Missile Launcher")
        .withRange(30)
        .withShots(2)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    powerSword: new Weapon.Builder("Power Sword")
        .withMode(new WeaponMode.Builder()
            .withSpecialRule(specialRules.macro)
            .withSpecialRule(specialRules.ea1)
            .withAssaultType()
            .build())
        .build()
}