import {SpecialRule, VariableSpecialRule} from "../ts/unit";

export const specialRules = {
    // Unit rules

    blitz: new SpecialRule("Blitz", [
        "Units with *Blitz* adds 5cm to their movement when they make a charge move."
    ]),
    bulky: new SpecialRule("Bulky", [
        "Units takes one extra space in assault transports."
    ]),
    command: new VariableSpecialRule("Command", [
        "Some units and characters are noted as being commanders. Commanders can order up to three formations of troops to follow them when they make an assault, as long as all the formations have at least one unit within (x)cm of a unit from the commander’s formation.",
        "Make a single initiative roll for all the formations, counting a -1 modifier if any have Blast markers. If the test is failed then the commander’s formation receives a Blast marker and must take a hold action, but the other formations are unaffected (and may take an action later in the turn).",
        "If the test is passed then all three formations may take an engage action. Treat the three formations as if they were a single formation for all rules purposes for the duration of the assault. If the attackers lose then each formation is broken. If they win then each formation receives a number of Blast markers equal to the casualties it suffered in the combat."
    ], "Command($)"),
    inspiring: new SpecialRule("Inspiring", [
        "Some units or characters are noted as being inspiring. Each inspiring unit involved in an assault adds +1 to the result roll (as long as it survives the combat of course!)"
    ]),
    invulnerableSave: new SpecialRule("Invulnerable Save", [
        "Certain units or characters receive a special *invulnerable* save. These units either have protective devices or supernatural vitality that will allow them to survive an attack that would kill another creature. To represent this, units with an invulnerable save receive a second save of 6+ if they fail their first save for any reason. They may take this second save against any form of attack, even attacks that would normally not allow a save to be taken. No modifiers ever apply to the second save."
    ]),
    ionShield: new VariableSpecialRule("Ion Shield", [
        "Knights make use of Ion Shields to deflect shooting and firefight attacks. This allows them to make a saving throw on the number within brackets when they are hit by ranged fire instead of using their armour value.",
        "No modifiers ever apply to this saving throw and it is unaffected by Macro-Weapon, Lance and Titan Killer hits (each point of damage from a Titan Killer hit must be saved separately. Is affected normally by hits with the Disrupt special rule). If the unit has Reinforced Armour as well then it is allowed to re-roll a failed save using its armour value unless the hit was a Macro-Weapon, Lance or Titan killer.",
        "Ion Shields may only be used against shooting unless the unit is in a Crossfire, and against FF unless the hit is caused by a unit in support. They may not be used against CC attacks. If relevant, roll CC and FF dice separately when attacking units equipped with Ion Shields."
    ], "Ion Shield($)"),
    jumpPack: new SpecialRule("Jump Pack", [
        "Some units are noted as having jump packs. These units are equipped with special devices that allow them to fly for short distances, usually in a series of long hops.",
        "Units equipped with jump packs may ignore dangerous or impassable terrain as they move (they jump over it). They may not land on impassable terrain, and if they land in dangerous terrain they must take a dangerous terrain test. Units equipped with jump packs may also move over other friendly units as they move, but may not land on them. Units with jump packs are affected by enemy units and zones of control normally, and cannot jump over enemy formations."
    ]),
    leader: new SpecialRule("Leader", [
        "A formation that includes any *leaders* may remove one extra Blast marker for each leader whenever it regroups or successfully rallies."
    ]),
    mounted: new SpecialRule("Mounted", [
        "Some infantry units are noted as being mounted, and will either ride on bikes or living creatures such as horses. Mounted units count as vehicles for terrain effects, and as infantry units for all other purposes."
    ]),
    skirmishers: new SpecialRule("Skirmishers", [
        "10 cm coherency. Same rules as Scout for determining which formations that may garrison."
    ]),
    supremeCommander: new SpecialRule("Supreme Commander", [
        "Supreme Commanders represent high-level command units. They count as *commanders* and *leaders*. In addition, each supreme commander unit in the army allows a player to re-roll one failed initiative test (of any type) once per turn."
    ]),
    reinforcedArmour: new SpecialRule("Reinforced Armour", [
        "Units with reinforced armour are protected by armour many times thicker than that found on most armoured vehicles and have extremely robust internal construction too. Because of this they still take their saving throw when hit by macro-weapons. In addition, they may re-roll a failed save against any non-macro-weapon hit, including those inflicted during an assault."
    ]),
    thickRearArmour: new SpecialRule("Thick Rear Armour", [
        "Some armoured units are noted as having thick rear armour. These vehicles have equally thick armour all round, and so ignore the -1 save modifier when they are caught in a crossfire."
    ]),
    transport: new VariableSpecialRule("Transport", [
        "Units with the *Transport* special rule can transport (x) number of INF units without *Bulky* or *Mounted*."
    ], "Transport($)"),
    transportAssault: new VariableSpecialRule("Assault Transport", [
        "Units with the *Assault Transport* special rule can transport (x) number of INF units or AV units with the *Walker* special rule."
    ], "Assault Transport($)"),
    voidShield: new VariableSpecialRule("Void Shield", [
        "Imperial Titans are protected by void shield generators. The number of void shields each Titan has is noted on the Titan’s datasheet.",
        "Each void shield will automatically stop one point of damage and then go down. Do not make armour saves for damage stopped by void shields, nor allocate Blast markers. Once all of the shields have been knocked down, the Titan may be damaged normally and you may make saving throws against any hits that are scored. Hits from close combat ignore void shields but units using their firefight values must first knock down any shields before they can damage the Titan.",
        "Void shields that have been knocked down can be repaired. Each Titan can repair one downed void shield in the end phase of each turn. In addition, if a Titan regroups it can use the dice roll to either repair the void shield or remove Blast markers (e.g., if you rolled a 2 you could repair 2 shields, remove 2 Blast markers or repair 1 shield and remove 1 Blast marker).",
    ], "Void Shields($)"),
    walker: new VariableSpecialRule("Walker", [
        "Some vehicle units are noted as being walkers. They are able to negotiate dangerous terrain more easily than other vehicles. To represent this they may re-roll any failed dangerous terrain tests."
    ]),

    // Weapon rules
    disrupt: new SpecialRule("Disrupt", [
        "Certain weapons are designed to disrupt enemy formations as much as kill enemy troops. To represent this weapons noted as having the disrupt ability inflict a Blast marker on an enemy formation for each hit they inflict instead of for each kill they inflict. Note that the hits inflicted by disruptor weapons are saved for normally. Any units that fail their save are removed as casualties but do not cause a second Blast marker to be placed on the target formation."
    ]),
    energetic: new SpecialRule("Energetic", [
        "When performing a *sustained fire* action, *energetic* weapons receive an extra +1 to hit modifier."
    ]),
    extraAttack: new VariableSpecialRule("Extra Attacks", [
        "Some assault and close combat weapons are noted as having extra attacks (+x). Units armed with these weapons receive a number of extra attacks equal to x during an assault. For example, an assault weapon noted as having extra attacks (+2) would allow the unit using it to make two extra close combat attacks in an assault. Sometimes the entry will specify a dice roll rather than a fixed number. For example, a weapon that had extra attacks (D3) would attack D3 times each time it attacked. Extra attacks can apply to shooting attacks, close combat attacks, and firefight attacks."
    ], "EA(+$)"),
    ignoreCover: new SpecialRule("Ignore Cover", [
        "Some weapons are noted as being able to *ignore cover*. These weapons are designed to negate the effects of cover, either by blasting it apart or simply bypassing it altogether. These weapons ignore cover to hit modifiers, and negate infantry cover saves."
    ], "IC"),
    macro: new SpecialRule("Macro Weapon", [
        "Only units with reinforced armour or invulnerable saves receive a saving throw against hits from a macro-weapon."
    ], "MW"),
    slowFiring: new VariableSpecialRule("Slow Firing", [
        "Some weapons are noted as being *slow firing*. These weapons must take one turn to reload after they have fired. This means that if they fire on one turn they may not fire during the next. We have found that the best way of remembering this is simply to turn the unit around to face away from the enemy when it fires, and then turn it back again when the formation is activated again next turn, but you can use any method you prefer."
    ], "Slw"),
    titanKiller: new VariableSpecialRule("Titan Killer", [
        "Some units are armed with weapons that are noted as being Titan Killers (see 2.2.9). Many of these weapons are capable of taking down a war engine with a single shot. Enemy units hit by such weapons may not take a cover or armour save, even if they have reinforced armour. Note that cover to hit modifiers do apply.",
        "In addition, Titan Killer weapons will usually have a dice roll noted in brackets on their data sheet. For example, the Volcano Cannon mounted on an Imperial Guard Shadowsword is noted as being a Titan Killer (D3) weapon. If such a weapon hits a war engine then the war engine suffers damage equal to the roll of the appropriate sort of dice. Each point of damage will reduce the war engine’s damage capacity by 1 point. Roll for critical hits for each point of damage inflicted. Titan Killer weapons that do not have a dice roll in brackets only inflict one point of damage.",
        "When allocating Titan killer hits that may cause multiple points of damage, roll for damage immediately after allocating the hit. The War Engine counts as having been allocated a number of hits equal to the damage rolled. This is solely for purposes of allocation. Damage is applied as normal, only after all hits have been allocated."
    ], "TK($)"),
}