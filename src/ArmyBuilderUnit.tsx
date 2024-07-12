import {Dialog, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {UnitComponent} from "./UnitComponent";

import {Formation} from "./ts/formation";


export function DisplayUnitsDialog(props: {
    formation: Formation,
    upgradeDialogOpen: boolean,
    closeDialogFunction: () => void
}) {

    return (
        <Dialog fullWidth
                maxWidth="sm"
                open={props.upgradeDialogOpen}
                onClose={props.closeDialogFunction}>

            <Stack spacing={1} sx={{m: 2}}>
                <Grid container direction="row" alignItems="center" columnSpacing={2}>
                    <Grid item>
                        <Typography variant="h5">
                            {props.formation.spec.name}
                        </Typography>
                    </Grid>

                    {props.formation.upgrades.length > 0 &&
                        <Grid item>
                            <Typography variant="subtitle1">
                                ({props.formation.upgrades.map(upgrade => upgrade.spec.name).join(', ')})
                            </Typography>
                        </Grid>
                    }
                </Grid>
                {props.formation.unitsInFormation().map((entry, formationIndex) => (
                    <UnitComponent key={formationIndex} unit={entry.unit} count={entry.count}/>
                ))}
            </Stack>
        </Dialog>
    );
}