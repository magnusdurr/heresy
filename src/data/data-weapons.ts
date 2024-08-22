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

    autocannon: new Weapon.Builder("Autocannon")
        .withRange(45)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 6)
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

    bolterTwinHeavy: new Weapon.Builder("Twin Heavy Bolter")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 3)
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

    deathwind: new Weapon.Builder("Deathwind")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 6)
            .withType(WeaponType.AT, 6)
            .build()
        )
        .build(),

    flamerHeavy: new Weapon.Builder("Heavy Flamer")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 4)
            .withSpecialRule(specialRules.ignoreCover)
            .build())
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

    meltaBlastgun: new Weapon.Builder("Melta Blastgun")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 3)
            .withType(WeaponType.AT, 2)
            .withSpecialRule(specialRules.macro)
            .withSpecialRule(specialRules.ignoreCover)
            .build()
        )
        .withMode(new WeaponMode.Builder()
            .withSmallArmsType()
            .withSpecialRule(specialRules.macro)
            .withJoinType("and")
            .build())
        .build(),

    multimelta: new Weapon.Builder("Multi-Melta")
        .withRange(15)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 5)
            .withSpecialRule(specialRules.macro)
            .build()
        )
        .withMode(new WeaponMode.Builder()
            .withSmallArmsType()
            .withSpecialRule(specialRules.macro)
            .withJoinType("and")
            .build())
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

    plasmaCannon: new Weapon.Builder("Plasma Cannon")
        .withRange(30)
        .withMode(new WeaponMode.Builder()
            .withType(WeaponType.AP, 5)
            .withType(WeaponType.AT, 5)
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
        .build(),

    // TITAN WEAPONS
    scoutTitan: {
        vulcanMegaBolter: new Weapon.Builder("Vulcan Mega-Bolter")
            .withRange(45)
            .withShots(4)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 3)
                .withType(WeaponType.AT, 5)
                .build())
            .build(),
        infernoGun: new Weapon.Builder("Inferno Gun")
            .withRange(30)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.BP, 3)
                .withSpecialRule(specialRules.ignoreCover)
                .build())
            .build(),
        turboLaserDestructor: new Weapon.Builder("Scout Turbo-Laser Destructor")
            .withRange(45)
            .withShots(4)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .build())
            .build(),
        plasmaBlastgun: new Weapon.Builder("Plasma Blastgun")
            .withRange(45)
            .withShots(2)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .withSpecialRule(specialRules.macro)
                .withSpecialRule(specialRules.slowFiring)
                .build())
            .build(),
    },

    reaverTitan: {
        apocalypseMissileLauncher: new Weapon.Builder("Apocalypse Missile Launcher")
            .withRange(60)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.BP, 3)
                .withSpecialRule(specialRules.disrupt)
                .build())
            .build(),

        gatlingBlaster: new Weapon.Builder("Gatling Blaster")
            .withRange(60)
            .withShots(4)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 4)
                .build())
            .build(),

        laserBlaster: new Weapon.Builder("Laser Blaster")
            .withRange(45)
            .withShots(5)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .build())
            .build(),

        titanMeltaCannon: new Weapon.Builder("Titan Melta Cannon")
            .withRange(30)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .build()
            )
            .withMode(new WeaponMode.Builder()
                .withSmallArmsType()
                .withJoinType("and")
                .withSpecialRule(specialRules.extraAttack.withVariable("1"))
                .withSpecialRule(specialRules.titanKiller.withVariable("1"))
                .build()
            )
            .build(),

        turboLaserDestructor: new Weapon.Builder("Turbo-Laser Destructor")
            .withRange(60)
            .withShots(4)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .build())
            .build(),

        volcanoCannon: new Weapon.Builder("Volcano Cannon")
            .withRange(75)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .withSpecialRule(specialRules.titanKiller.withVariable("D3"))
                .build())
            .build(),

        warpMissile: new Weapon.Builder("Warp Missile")
            .withRange(120)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .withSpecialRule(specialRules.titanKiller.withVariable("D3"))
                .build())
            .build(),

        powerFist: new Weapon.Builder("Power Fist")
            .withMode(new WeaponMode.Builder()
                .withSpecialRule(specialRules.extraAttack.withVariable("2"))
                .withSpecialRule(specialRules.titanKiller.withVariable("D3"))
                .withAssaultType()
                .build())
            .build(),

        chainfist: new Weapon.Builder("Titan Chainfist")
            .withMode(new WeaponMode.Builder()
                .withAssaultType()
                .withSpecialRule(specialRules.extraAttack.withVariable("3"))
                .withSpecialRule(specialRules.macro)
                .build())
            .build(),
    },

    warlordTitan: {
        belicosaVolcanoCannon: new Weapon.Builder("Belicosa Volcano Cannon")
            .withRange(75)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .withSpecialRule(specialRules.titanKiller.withVariable("D3+1"))
                .build())
            .build(),

        macroGatlingBlaster: new Weapon.Builder("Macro-gatling Blaster")
            .withRange(75)
            .withShots(6)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 4)
                .build())
            .build(),

        moriQuakeCannon: new Weapon.Builder("Mori Quake Cannon")
            .withRange(60)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.BP, 3)
                .withSpecialRule(specialRules.macro)
                .build())
            .build(),

        sunfuryPlasmaAnnihilator: new Weapon.Builder("Sunfury Plasma Annihilator")
            .withRange(60)
            .withShots(4)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .withSpecialRule(specialRules.macro)
                .withSpecialRule(specialRules.slowFiring)
                .build())
            .build(),

        pairedApocalypseMissileLauncher: new Weapon.Builder("Paired Apocalypse Missile Launchers")
            .withRange(60)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.BP, 6)
                .withSpecialRule(specialRules.disrupt)
                .build())
            .build(),

        pairedGatlingBlaster: new Weapon.Builder("Paired Gatling Blasters")
            .withRange(60)
            .withShots(8)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 4)
                .build())
            .build(),

        pairedLaserBlaster: new Weapon.Builder("Paired Laser Blasters")
            .withRange(45)
            .withShots(10)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .build())
            .build(),

        pairedMeltaCannon: new Weapon.Builder("Paired Titan Melta Cannons")
            .withRange(30)
            .withShots(2)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 4)
                .withType(WeaponType.AT, 2)
                .build()
            )
            .withMode(new WeaponMode.Builder()
                .withSmallArmsType()
                .withJoinType("and")
                .withSpecialRule(specialRules.extraAttack.withVariable("2"))
                .withSpecialRule(specialRules.titanKiller.withVariable("1"))
                .build()
            )
            .build(),

        pairedTurboLaserDestructor: new Weapon.Builder("Paired Turbo-Laser Destructor")
            .withRange(60)
            .withShots(8)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 5)
                .withType(WeaponType.AT, 3)
                .build())
            .build(),

        pairedVulcanMegaBolter: new Weapon.Builder("Paired Vulcan Mega-Bolters")
            .withRange(45)
            .withShots(8)
            .withMode(new WeaponMode.Builder()
                .withType(WeaponType.AP, 3)
                .withType(WeaponType.AT, 5)
                .build())
            .build(),
    }
}