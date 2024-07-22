import {Typography} from "@mui/material";
import React from "react";
import {UnitComponent} from "./UnitComponent";

import {Formation} from "./ts/formation";
import {HeresyDialog} from "./HeresyDialog";
import {FormationSpec} from "./ts/formationSpec";


export function DisplayUnitsDialog(props: {
    formation: Formation | FormationSpec,
    isDialogOpen: boolean,
    closeDialogFunction: () => void
}) {

    const name = props.formation instanceof Formation ? props.formation.spec.name : props.formation.name;
    const unitsInFormation = props.formation instanceof Formation ? props.formation.unitsInFormation() : props.formation.unitCount()
    const upgradeUnits = props.formation instanceof FormationSpec ? props.formation.possibleUpgradeUnits() : undefined;

    return (
        <HeresyDialog title={name}
                      subtitle={props.formation instanceof Formation && props.formation.upgrades.length > 0 ?
                          ' + ' + props.formation.upgrades.map(upgrade => upgrade.spec.name).join(', ') :
                          undefined}
                      isOpen={props.isDialogOpen}
                      closeFunction={props.closeDialogFunction}>

            {unitsInFormation.map((entry, formationIndex) => (
                <UnitComponent key={formationIndex} unit={entry.unit}/>
            ))}

            {upgradeUnits && upgradeUnits.length > 0 &&
                <>
                    <Typography variant="caption">Available upgrades</Typography>
                    {upgradeUnits.map((entry, formationIndex) => (
                        <UnitComponent key={formationIndex} unit={entry.unit}/>
                    ))}
                </>
            }
        </HeresyDialog>
    );
}