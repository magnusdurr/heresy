import {ItemCostEntry} from "./ts/itemCost";
import React from "react";
import {Badge, CardContent, Chip, Grid, Stack, styled, Typography, useTheme} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {FormationSpec} from "./ts/formationSpec";
import {Formation} from "./ts/formation";

export function CategoryChips(props: Readonly<{
    items: ItemCostEntry[],
    color: "success" | "primary" | "secondary" | "error" | "info" | "warning",
}>) {
    return (
        <>
            {props.items.map((categoryCount) => (
                <Grid item key={categoryCount.category}>
                    <CategoryChip categoryCount={categoryCount} color={props.color}/>
                </Grid>
            ))}
        </>
    )
}

export function CategoryChip(props: Readonly<{
    categoryCount: ItemCostEntry,
    color: "success" | "primary" | "secondary" | "error" | "info" | "warning",
    forceText?: boolean
}>) {
    return (
        <Chip label={props.categoryCount.count + ' ' + props.categoryCount.category}
              color={props.color}
              sx={{fontSize: 12}}
              size="small"/>
    )
}

export function ValidationError(props: Readonly<{ message: string }>) {
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <ErrorIcon fontSize="inherit" color="error"/>
            <Typography variant="caption" color="error">{props.message}</Typography>
        </Stack>
    )
}

export function ValidationWarning(props: Readonly<{ message: string }>) {
    const theme = useTheme()

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <ErrorIcon fontSize="inherit" color="disabled"/>
            <Typography variant="caption" sx={{color: theme.palette.text.disabled}}>{props.message}</Typography>
        </Stack>
    )
}

export function CostComponent(props: Readonly<{ cost: number }>) {
    return (
        <Badge badgeContent={props.cost} color="primary" showZero>
            <AttachMoneyIcon/>
        </Badge>
    )
}

export function FormationLabel(props: Readonly<{ formation: FormationSpec | Formation }>) {
    const name = props.formation instanceof Formation ? props.formation.spec.name : props.formation.name;
    const units = props.formation instanceof Formation ? props.formation.unitsInFormation() : props.formation.unitCount();

    return (<Typography variant="subtitle1" sx={{lineHeight: 1}}>
        {name}<br/>
        <small>{units.map(uc => uc.toDisplayString()).join(", ")}</small>
    </Typography>)
}

export const HeresyCardContent = styled(CardContent)(`
      padding: 15px 10px 5px 5px;
      &:last-child {
        padding-bottom: 5px;
      }
    `);