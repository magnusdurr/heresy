import {Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import {ArmyAllocation} from "./ts/armyAllocation";
import {ItemCategory} from "./ts/itemCategory";

type ArmyAllocationPanelProps = {
    armyAllocation: ArmyAllocation
}

export function ArmyAllocationPanel({armyAllocation}: ArmyAllocationPanelProps) {
    return (
        <Grid container spacing={1}>
            {Object.keys(ItemCategory).map((key) => (ItemCategory[key as keyof typeof ItemCategory]))
                .map((category) => (
                    <ArmyAllowanceComponent name={category}
                                            available={armyAllocation.grants.getOrZero(category)}
                                            used={armyAllocation.cost.getOrZero(category)}/>
                ))}
        </Grid>
    )
}

type ArmyAllowanceComponentProps = {
    name: string,
    available: number,
    used: number
}

function ArmyAllowanceComponent({name, available, used}: ArmyAllowanceComponentProps) {
    return (
        <>
            {available + used > 0 &&
                <Grid item key={name}>
                    <Card elevation={8}>
                        <CardContent>
                            <Stack direction="column" alignItems="center">
                                <Typography variant="caption">{name}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <Typography>{used}/{Math.floor(available)}</Typography>
                                    {used > available && <ErrorIcon color="error"/>}
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            }
        </>
    )
}
