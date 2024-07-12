import {Divider, Grid, Stack, Typography} from "@mui/material";
import React, {createContext, useState} from "react"
import {ArmyAllocationPanel} from "./ArmyBuilderAllocation";
import {AddFormationComponent, FormationComponent} from "./ArmyBuilderFormation";
import {CategoryChips, ValidationError} from "./ArmyBuilderUtils";
import {ArmySpec} from "./ts/armySpec";
import {FormationSpec} from "./ts/formationSpec";
import {Formation} from "./ts/formation";
import {ArmyAllocation} from "./ts/armyAllocation";

export const ArmyContext = createContext<ArmySpec | null>(null);

export function ArmyBuilder(props: { armySpec: ArmySpec }) {
    const [armyFormations, setArmyFormations] = useState<Formation[]>([])
    const [armyAllocation, setArmyAllocation] = useState<ArmyAllocation>(ArmyAllocation.fromFormations(props.armySpec, []));

    const handleAddFormation = (formation: FormationSpec) => {
        let updatedFormations = [...armyFormations, new Formation(formation)];
        setArmyFormations(updatedFormations);
        setArmyAllocation(ArmyAllocation.fromFormations(props.armySpec, updatedFormations));
    }

    const handleRemoveFormation = (id: string) => {
        let updatedFormations = armyFormations.filter(formation => formation.id !== id);
        setArmyFormations(updatedFormations);
        setArmyAllocation(ArmyAllocation.fromFormations(props.armySpec, updatedFormations));
    }

    const handleUpdateFormation = (id: string) => {
        setArmyFormations([...armyFormations])
        setArmyAllocation(ArmyAllocation.fromFormations(props.armySpec, armyFormations));
    }

    const canAddFormation = (toBeAdded: FormationSpec) => {
        return props.armySpec.canAddFormation(armyFormations, toBeAdded)
    }

    const validationErrors = props.armySpec.validate(armyFormations)

    return (
        <ArmyContext.Provider value={props.armySpec}>
            <Stack spacing={1}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item xs="auto">
                        <Typography variant="h4">{props.armySpec.name}</Typography>
                    </Grid>
                    <Grid item container sm={6} columnSpacing={1}>
                        <CategoryChips items={props.armySpec.grants.toList()} color="success"/>
                    </Grid>
                </Grid>

                <Divider/>
                <ArmyAllocationPanel armyAllocation={armyAllocation}/>
                {validationErrors.map((error) => (
                    <ValidationError message={error.message!}/>
                ))}

                <Divider/>
                <Typography variant="h5">Formations</Typography>

                {armyFormations.map((formation) => (
                    <FormationComponent key={formation.id}
                                        formation={formation}
                                        deleteFunction={handleRemoveFormation}
                                        updateFunction={handleUpdateFormation}/>
                ))}

                <AddFormationComponent addFunction={handleAddFormation} checkValidityFunction={canAddFormation}/>
            </Stack>
        </ArmyContext.Provider>
    )
}
