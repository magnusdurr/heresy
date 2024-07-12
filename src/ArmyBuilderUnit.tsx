import {Card, CardContent, Dialog, Typography} from "@mui/material";
import React from "react";
import {UnitComponent} from "./UnitComponent";
import {TestFormationSpec} from "./ts/testFormationSpec";


export function DisplayUnitsDialog(props: {
    formation: TestFormationSpec,
    upgradeDialogOpen: boolean,
    closeDialogFunction: () => void
}) {

    return (
        <Dialog fullWidth
                maxWidth="sm"
                open={props.upgradeDialogOpen}
                onClose={props.closeDialogFunction}
        >
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {props.formation.name}
                    </Typography>
                    {Array.from(props.formation.units.entries()).map((entry, formationIndex) => (
                        <UnitComponent key={formationIndex} unit={entry[0]} count={entry[1]}/>
                    ))}
                </CardContent>
            </Card>
        </Dialog>
    );
}