import {Grid, Typography} from "@mui/material";
import React from "react";
import {UnitComponent} from "./UnitComponent";

import {Formation} from "./ts/formation";
import {HeresyDialog} from "./HeresyDialog";


export function DisplayUnitsDialog(props: {
    formation: Formation,
    isDialogOpen: boolean,
    closeDialogFunction: () => void
}) {

    return (
        <HeresyDialog title={props.formation.spec.name} isOpen={props.isDialogOpen}
                      closeFunction={props.closeDialogFunction}>
            <Grid container direction="row" alignItems="center" columnSpacing={2}>
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
        </HeresyDialog>
    );
}