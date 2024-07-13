import {SpecialRule, VariableSpecialRule} from "../ts/unit";

export const specialRules = {
    // Unit rules

    blitz: new SpecialRule("Blitz", [
        "Units with *Blitz* adds 5cm to their movement when they make a charge move."
    ]),
    command: new VariableSpecialRule("Command", [
        "Some units and characters are noted as being commanders. Commanders can order up to three formations of troops to follow them when they make an assault, as long as all the formations have at least one unit within (x)cm of a unit from the commander’s formation.",
        "Make a single initiative roll for all the formations, counting a -1 modifier if any have Blast markers. If the test is failed then the commander’s formation receives a Blast marker and must take a hold action, but the other formations are unaffected (and may take an action later in the turn).",
        "If the test is passed then all three formations may take an engage action. Treat the three formations as if they were a single formation for all rules purposes for the duration of the assault. If the attackers lose then each formation is broken. If they win then each formation receives a number of Blast markers equal to the casualties it suffered in the combat."
    ], "Command($)"),
    inspiring: new SpecialRule("Inspiring", [
        "Some units or characters are noted as being inspiring. Each inspiring unit involved in an assault adds +1 to the result roll (as long as it survives the combat of course!)"
    ]),
    leader: new SpecialRule("Leader", [
        "A formation that includes any *leaders* may remove one extra Blast marker for each leader whenever it regroups or successfully rallies."
    ]),
    supremeCommander: new SpecialRule("Supreme Commander", [
        "Supreme Commanders represent high-level command units. They count as *commanders* and *leaders*. In addition, each supreme commander unit in the army allows a player to re-roll one failed initiative test (of any type) once per turn."
    ]),
    invulnerableSave: new SpecialRule("Invulnerable Save", [
        "Certain units or characters receive a special *invulnerable* save. These units either have protective devices or supernatural vitality that will allow them to survive an attack that would kill another creature. To represent this, units with an invulnerable save receive a second save of 6+ if they fail their first save for any reason. They may take this second save against any form of attack, even attacks that would normally not allow a save to be taken. No modifiers ever apply to the second save."
    ]),
    reinforcedArmour: new SpecialRule("Reinforced Armour", [
        "Units with reinforced armour are protected by armour many times thicker than that found on most armoured vehicles and have extremely robust internal construction too. Because of this they still take their saving throw when hit by macro-weapons. In addition, they may re-roll a failed save against any non-macro-weapon hit, including those inflicted during an assault."
    ]),
    transport: new VariableSpecialRule("Transport", [
        "Units with the *Transport* special rule can transport (x) number of INF units without *Bulky* or *Mounted*."
    ], "Transport($)"),

    // Weapon rules

    macro: new SpecialRule("Macro Weapon", [
        "Only units with reinforced armour or invulnerable saves receive a saving throw against hits from a macro-weapon."
    ], "MW"),

    energetic: new SpecialRule("Energetic", [
        "When performing a *sustained fire* action, *energetic* weapons receive an extra +1 to hit modifier."
    ]),

    extraAttack: new VariableSpecialRule("Extra Attacks", [
        "Some assault and close combat weapons are noted as having extra attacks (+x). Units armed with these weapons receive a number of extra attacks equal to x during an assault. For example, an assault weapon noted as having extra attacks (+2) would allow the unit using it to make two extra close combat attacks in an assault. Sometimes the entry will specify a dice roll rather than a fixed number. For example, a weapon that had extra attacks (D3) would attack D3 times each time it attacked. Extra attacks can apply to shooting attacks, close combat attacks, and firefight attacks."
    ], "EA(+$)")
}