import {SpecialRule, Unit, UnitType} from './ts/unit';
import {
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import React from "react";
import Markdown from 'react-markdown';
import {EquippedWeapon} from "./ts/weapon";

export function UnitComponent(props: { unit: Unit, count: number }) {

    const unit = props.unit;

    return (
        <Paper style={{padding: '5px 10px 5px 10px'}} elevation={5}>
            {unit.unitType !== UnitType.WEAPON &&
                <>
                    <Typography variant="subtitle1">
                        <b>
                            {props.count > 1 ? props.count + 'x ' : ''}
                            {unit.name}
                            {unit.unitType === UnitType.CHAR && ' (Character)'}
                        </b>
                    </Typography>
                    <Divider/>
                </>
            }

            <Grid container columnSpacing={5} rowSpacing={1}>
                {(unit.unitType !== UnitType.CHAR && unit.unitType !== UnitType.WEAPON) &&
                    <Grid item>
                        <UnitStatsComponent unit={unit}/>
                    </Grid>
                }
                {unit.weapons !== undefined && unit.weapons.length > 0 &&
                    <Grid item>
                        <WeaponsList weapons={unit.weapons}/>
                    </Grid>
                }

                <Grid item xs={12}>
                    <Typography variant="body2">
                        {unit.dc > 0 && <>Damage Capacity: {unit.dc}{unit.specialRules.length > 0 ? ', ' : ''}</>}
                        {(unit.specialRules.length > 0) && <>
                            {'Notes: '}
                            <ul className="upgrade-list">
                                {unit.specialRules.map(specialRule => (
                                    <SpecialRuleComponent rule={specialRule}/>
                                ))}
                            </ul>
                        </>
                        }
                    </Typography>

                </Grid>
            </Grid>
        </Paper>
    )
        ;
}

function UnitStatsComponent(props: { unit: Unit }) {
    return (
        <Stack direction="row" spacing={2} mt={0.4}>
            <UnitStatItem label="Type" value={unitTypeName(props.unit.unitType)}/>
            <UnitStatItem label="Speed" value={props.unit.move} suffix="cm"/>
            <UnitStatItem label="Armour" value={props.unit.armour} suffix="+"/>
            <UnitStatItem label="CC" value={props.unit.cc} suffix="+"/>
            <UnitStatItem label="FF" value={props.unit.ff} suffix="+"/>
        </Stack>
    )
}

function WeaponsList(props: { weapons: EquippedWeapon[] }) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell className="dense-cell-header"><Typography
                        variant="caption">Weapons</Typography></TableCell>
                    <TableCell className="dense-cell-header"><Typography
                        variant="caption">Range</Typography></TableCell>
                    <TableCell className="dense-cell-header"><Typography
                        variant="caption">Firepower</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.weapons.map(weapon => (
                    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        {weapon.weapon.modes.map(mode => (
                            <>
                                <TableCell className="dense-cell">
                                    <Typography variant="body2">
                                        {weapon.count > 1 && weapon.count + 'x '}
                                        {weapon.weapon.name}
                                    </Typography>
                                </TableCell>
                                <TableCell className="dense-cell">
                                    <Typography
                                        variant="body2">{weapon.weapon.range === 0 ? 'N/A' : `${weapon.weapon.range}cm`}</Typography>
                                </TableCell>
                                <TableCell className="dense-cell">
                                    <Typography variant="body2">
                                        {mode.firepower(weapon.weapon.shots)}&nbsp;&nbsp;
                                        <ul className="comma-list">
                                            {weapon.firingArc !== undefined &&
                                                <SpecialRuleComponent rule={weapon.firingArcSpecialRule()!}/>}
                                            {mode.specialRules.map(specialRule => (
                                                <SpecialRuleComponent rule={specialRule}/>
                                            ))}
                                        </ul>
                                    </Typography>
                                </TableCell>
                            </>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
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
            <li><i>{props.rule.abbreviation ? props.rule.abbreviation : props.rule.name}</i></li>
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
        case UnitType.LV:
            return "LV"
        case UnitType.WE:
            return "WE"
        case UnitType.FIGHTER:
            return "Fighter"
        default:
            return "Unknown"
    }
}
