import {TestArmyAllocation, TestArmySpec, TestFormation, TestFormationSpec,} from "./ts/test";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import React, {createContext, useState} from "react"
import {ArmyAllocationPanel} from "./ArmyBuilderAllocation";
import {AddFormationComponent, FormationComponent} from "./ArmyBuilderFormation";
import {CategoryChips, ValidationError} from "./ArmyBuilderUtils";

const ArmyContext = createContext<TestArmySpec | null>(null);

export function ArmyBuilder(props: { armySpec: TestArmySpec }) {
    const [armyFormations, setArmyFormations] = useState<TestFormation[]>([])
    const [armyAllocation, setArmyAllocation] = useState<TestArmyAllocation>(TestArmyAllocation.fromFormations(props.armySpec, []));

    const handleAddFormation = (formation: TestFormationSpec) => {
        let updatedFormations = [...armyFormations, new TestFormation(formation, [])];
        setArmyFormations(updatedFormations);
        setArmyAllocation(TestArmyAllocation.fromFormations(props.armySpec, updatedFormations));
    }

    const handleRemoveFormation = (id: string) => {
        let updatedFormations = armyFormations.filter(formation => formation.id !== id);
        setArmyFormations(updatedFormations);
        setArmyAllocation(TestArmyAllocation.fromFormations(props.armySpec, updatedFormations));
    }

    const handleUpdateFormation = (id: string) => {
        setArmyFormations([...armyFormations])
        setArmyAllocation(TestArmyAllocation.fromFormations(props.armySpec, armyFormations));
    }

    const canAddFormation = (toBeAdded: TestFormationSpec) => {
        return props.armySpec.canAddFormation(armyFormations, toBeAdded)
    }

    const validationErrors = props.armySpec.validate(armyFormations)

    return (
        <ArmyContext.Provider value={props.armySpec}>
            <Stack spacing={1}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <Typography variant="h4">{props.armySpec.name}</Typography>
                    </Grid>
                    <CategoryChips items={props.armySpec.grants.toList()} color="success"/>
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
