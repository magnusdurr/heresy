import {TestArmyAllocation, TestCategory} from "./ts/test";
import {Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

export function ArmyAllocationPanel(props: Readonly<{ armyAllocation: TestArmyAllocation }>) {
    return (
        <Grid container spacing={1}>
            {Object.keys(TestCategory).map((key) => (TestCategory[key as keyof typeof TestCategory]))
                .filter((category) => category !== TestCategory.CORE)
                .map((category) => (
                    <Grid item key={category}>
                        <ArmyAllowanceComponent name={category}
                                                available={props.armyAllocation.grants.getOrZero(category)}
                                                used={props.armyAllocation.cost.getOrZero(category)}/>
                    </Grid>
                ))}
        </Grid>
    )
}

export function ArmyAllowanceComponent(props: Readonly<{
    name: string,
    available?: number,
    used?: number,
    extras?: number
}>) {
    return (
        <>
            {(props.available ?? 0) + (props.used ?? 0) > 0 &&
                <Card>
                    <CardContent>
                        <Stack direction="column" alignItems="center">
                            <Typography variant="caption">{props.name}</Typography>
                            <AllowanceValue used={props.used}
                                            available={Math.floor(props.available ?? 0)}
                                            extras={props.extras}/>
                        </Stack>
                    </CardContent>
                </Card>
            }
        </>
    )
}

export function AllowanceValue(props: Readonly<{ used?: number, available?: number, extras?: number }>) {
    const used = props.used ?? 0
    const available = props.available ?? 0
    const extras = props.extras ?? 0

    const isOverAllowance = () => {
        return used > available + extras
    }

    return (
        <Stack direction="row" spacing={1}>
            <Typography>
                {props.used}/{props.available}
                {props.extras !== undefined && '+' + props.extras}
            </Typography>
            {isOverAllowance() && <ErrorIcon color="error"/>}
        </Stack>
    )
}