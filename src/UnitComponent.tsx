import {SpecialRule, Unit, UnitType} from './ts/unit';
import {Divider, Grid, Paper, Stack, Tooltip, Typography} from "@mui/material";
import React from "react";
import Markdown from 'react-markdown';
import {Weapon} from "./ts/weapon";

export function UnitComponent(props: { unit: Unit, count: number }) {

    const unit = props.unit;

    return (
        <Paper style={{padding: '5px 10px 5px 10px'}} elevation={5}>
            <Typography variant="subtitle1">
                <b>
                    {props.count > 1 ? props.count + 'x ' : ''}
                    {unit.name}
                    {unit.unitType === UnitType.CHAR && ' (Character)'}
                </b>
            </Typography>
            <Divider/>

            <Grid container columnSpacing={5}>
                {unit.unitType !== UnitType.CHAR &&
                    <Grid item xs={12} sm={5}>
                        <UnitStatsComponent unit={unit}/>
                    </Grid>
                }
                {unit.weapons !== undefined && unit.weapons.length > 0 &&
                    <Grid item xs={12} sm={7}>
                        <WeaponsList weapons={unit.weapons}/>
                    </Grid>
                }
            </Grid>

            {unit.specialRules.length > 0 &&
                <Typography variant="body2" mt={1}>
                    {'Notes: '}
                    <ul className="comma-list">
                        {unit.specialRules.map(specialRule => (
                            <SpecialRuleComponent rule={specialRule}/>
                        ))}
                    </ul>
                </Typography>
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

function WeaponsList(props: { weapons: Weapon[] }) {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Typography variant="caption">Weapons</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="caption">Range</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="caption">Firepower</Typography>
            </Grid>
            {props.weapons.map(weapon => (
                <>
                    {weapon.modes.map(mode => (
                        <>
                            <Grid item xs={4}>
                                <Typography variant="body2">{weapon.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="body2">{weapon.range}cm</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    {mode.firepower(weapon.shots)}&nbsp;
                                    <ul className="comma-list">
                                        {mode.specialRules.map(specialRule => (
                                            <SpecialRuleComponent rule={specialRule}/>
                                        ))}
                                    </ul>
                                </Typography>
                            </Grid>
                        </>
                    ))}
                </>
            ))}
        </Grid>
    )

}

function SpecialRuleComponent(props: { rule: SpecialRule }) {
    return (
        <Tooltip title={
            <>
                <Typography variant="body2">{props.rule.name}</Typography>
                {props.rule.description.map((line) => (
                    <Typography variant="body2">
                        <Markdown>{line}</Markdown>
                    </Typography>
                ))}
            </>
        }>
            <li>{props.rule.abbreviation ? props.rule.abbreviation : props.rule.name}</li>
        </Tooltip>
    )
}

function UnitStatItem(props: { label: string, value: any, suffix?: string }) {
    return (
        <Stack direction="column" alignItems="center">
            <Typography variant="caption">{props.label}</Typography>
            <Typography variant="body2">
                {props.value}
                {props.suffix !== undefined && props.suffix}
            </Typography>
        </Stack>
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
