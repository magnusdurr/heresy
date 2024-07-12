import {TestCategoryCount} from "./ts/test";
import React from "react";
import {Badge, Chip, Grid, Stack, Typography, useTheme} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export function CategoryChips(props: Readonly<{ items: TestCategoryCount[], color: string, forceText?: boolean }>) {
    return (
        <React.Fragment>
            {props.items.map((categoryCount) => (
                <Grid item key={categoryCount.category}>
                    <CategoryChip categoryCount={categoryCount} color={props.color}/>
                </Grid>
            ))}
        </React.Fragment>
    )
}

export function CategoryChip(props: Readonly<{
    categoryCount: TestCategoryCount,
    color: string,
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