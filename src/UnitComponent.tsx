import {SpecialRule, Unit, UnitType} from './ts/unit';
import {Box, Divider, Paper, Stack, Tooltip, Typography} from "@mui/material";
import React from "react";
import Markdown from 'react-markdown';
import {Weapon} from "./ts/weapon";

export function UnitComponent(props: { unit: Unit, count: number }) {

    const unit = props.unit;

    return (
        <Paper style={{padding: '5px 10px 5px 10px', marginTop: '1em'}} elevation={5}>
            <Typography variant="subtitle1">
                {props.count > 1 ? props.count + 'x ' : ''}
                {unit.name}
                {unit.unitType === UnitType.CHAR && ' (Character)'}
            </Typography>

            {unit.unitType !== UnitType.CHAR &&
                <>
                    <Divider/>
                    <UnitStatsComponent unit={unit}/>
                </>
            }

            {unit.weapons !== undefined && unit.weapons.length > 0 &&
                <>
                    <Divider/>
                    {unit.weapons.map(weapon => (
                        <WeaponComponent weapon={weapon}/>
                    ))}
                </>
            }

            {unit.specialRules.length > 0 &&
                <>
                    <Divider/>
                    <Typography variant="body2">
                        {'Notes: '}
                        <ul className="comma-list">
                            {unit.specialRules.map(specialRule => (
                                <SpecialRuleComponent rule={specialRule}/>
                            ))}
                        </ul>
                    </Typography>
                </>
            }
        </Paper>
    );
}

function UnitStatsComponent(props: { unit: Unit }) {
    return (
        <Stack direction="row" spacing={2}>
            <UnitStatItem label="Type" value={unitTypeName(props.unit.unitType)}/>
            <UnitStatItem label="Speed" value={props.unit.move} suffix="cm"/>
            <UnitStatItem label="Armour" value={props.unit.armour} suffix="+"/>
            <UnitStatItem label="CC" value={props.unit.cc} suffix="+"/>
            <UnitStatItem label="FF" value={props.unit.ff} suffix="+"/>
        </Stack>
    )
}

function WeaponComponent(props: { weapon: Weapon }) {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body1" fontStyle="italic">{props.weapon.name}</Typography>
            {Array.from(props.weapon.modes).map(mode => (
                <Stack direction="row" spacing={2}>
                    <UnitStatItem label="Range" value={props.weapon.range} suffix="cm"/>
                    <UnitStatItem label="Firepower" value={mode.firepower(props.weapon.shots)}/>
                    {mode.specialRules.length > 0 &&
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="caption">Special Rules</Typography>
                            <Typography variant="body2">
                                <ul className="comma-list">
                                    {mode.specialRules.map(specialRule => (
                                        <SpecialRuleComponent rule={specialRule}/>
                                    ))}
                                </ul>
                            </Typography>
                        </Box>}


                </Stack>
            ))}
        </Stack>
    )
}

function SpecialRuleComponent(props: { rule: SpecialRule }) {
    return (
        <Tooltip title={
            <React.Fragment>
                <Typography variant="subtitle1">{props.rule.name}</Typography>
                {props.rule.description.map((line) => (
                    <Typography variant="body2">
                        <Markdown>{line}</Markdown>
                    </Typography>
                ))}
            </React.Fragment>
        }>
            <li>{props.rule.abbreviation !== undefined ? props.rule.abbreviation : props.rule.name}</li>
        </Tooltip>
    )
}

function UnitStatItem(props: { label: string, value: any, suffix?: string }) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption">{props.label}</Typography>
            <Typography variant="body2">
                {props.value}
                {props.suffix !== undefined && props.suffix}
            </Typography>
        </Box>
    )
}

function unitTypeName(type: UnitType): string {
    switch (type) {
        case UnitType.INF:
            return "INF"
        case UnitType.AV:
            return "AV"
        default:
            return "Unknown"
    }
}
