import {SpecialRule, VariableSpecialRule} from "../ts/unit";

export const specialRules = {
    // Unit rules

    leader: new SpecialRule("Leader", [
        "A formation that includes any *leaders* may remove one extra Blast marker for each leader whenever it regroups or successfully rallies."
    ]),
    supremeCommander: new SpecialRule("Supreme Commander", [
        "Supreme Commanders represent high-level command units. They count as *commanders* and *leaders*. In addition, each supreme commander unit in the army allows a player to re-roll one failed initiative test (of any type) once per turn."
    ]),
    invulnerableSave: new SpecialRule("Invulnerable Save", [
        "Certain units or characters receive a special *invulnerable* save. These units either have protective devices or supernatural vitality that will allow them to survive an attack that would kill another creature. To represent this, units with an invulnerable save receive a second save of 6+ if they fail their first save for any reason. They may take this second save against any form of attack, even attacks that would normally not allow a save to be taken. No modifiers ever apply to the second save."
    ]),
    transport: new VariableSpecialRule("Transport", [
        "Units with the *Transport* special rule can transport (x) number of INF units without *Bulky*."
    ], "Transport($)"),

    // Weapon rules

    macro: new SpecialRule("Macro Weapon", [
        "Only units with reinforced armour or invulnerable saves receive a saving throw against hits from a macro-weapon."
    ], "MW"),

    energetic: new SpecialRule("Energetic", [
        "When performing a *sustained fire* action, units with an *energetic* weapon receive an extra +1 to hit modifier."
    ]),

    extraAttack: new VariableSpecialRule("Extra Attacks", [
        "Some assault and close combat weapons are noted as having extra attacks (+x). Units armed with these weapons receive a number of extra attacks equal to x during an assault. For example, an assault weapon noted as having extra attacks (+2) would allow the unit using it to make two extra close combat attacks in an assault. Sometimes the entry will specify a dice roll rather than a fixed number. For example, a weapon that had extra attacks (D3) would attack D3 times each time it attacked. Extra attacks can apply to shooting attacks, close combat attacks, and firefight attacks."
    ], "EA(+$)")
}