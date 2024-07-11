import {
    TestArmyAllocation,
    TestArmySpec,
    TestCategories,
    TestCategory,
    TestFormation,
    testFormationsBySections,
    TestFormationSpec,
    TestUpgradeSpec,
} from "./ts/test";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Dialog,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import React, {useState} from "react"
import {ValidationResult} from "./ts/restrictions";
import {ArmyAllocationPanel} from "./ArmyBuilderAllocation";
import {DisplayFormationPanel, FormationUpgradeDialog} from "./ArmyBuilderFormation";
import {CostComponent} from "./ArmyBuilderUtils";

export function TestArmyBuilder(props: { armySpec: TestArmySpec }) {
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

    return (
        <Stack spacing={1}>
            <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <Typography variant="h4">{props.armySpec.name}</Typography>
                </Grid>
                <Grid item>
                    <CategoryTypes cost={TestCategories.fromList([])} grants={props.armySpec.grants}/>
                </Grid>
            </Grid>

            <Divider/>

            <ArmyAllocationPanel armyAllocation={armyAllocation}/>

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
    )
}


export function AddFormationComponent(props: {
    addFunction: (formation: TestFormationSpec) => void,
    checkValidityFunction: (formation: TestFormationSpec) => ValidationResult
}) {

    const [addFormationOpen, setAddFormationOpen] = React.useState(false);
    const openAddFormation = () => setAddFormationOpen(true);
    const closeAddFormation = () => setAddFormationOpen(false);

    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <>
            <Button onClick={openAddFormation}>Add formation</Button>
            <Dialog maxWidth="sm"
                    fullWidth
                    open={addFormationOpen}
                    onClose={closeAddFormation}
            >
                <Stack spacing={1} sx={{m: 2}}>
                    <h2 id="parent-modal-title">Select formation</h2>
                    {Array.from(testFormationsBySections.entries()).map((entry) => (
                        <Accordion expanded={expanded === entry[0]} onChange={handleChange(entry[0])}>
                            <AccordionSummary>
                                <Typography variant="body1">{entry[0]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {entry[1].map((formation) => (
                                    <FormationToAddComponent formation={formation}
                                                             closePopupFunction={closeAddFormation}
                                                             addFunction={props.addFunction}
                                                             validation={props.checkValidityFunction(formation)}/>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Stack>
            </Dialog>
        </>
    )
}

export function FormationToAddComponent(props: {
    formation: TestFormationSpec,
    addFunction: (formation: TestFormationSpec) => void,
    validation: ValidationResult
    closePopupFunction: () => void
}) {
    return (
        <Card variant="outlined">
            <CardActionArea disabled={!props.validation.success} onClick={() => {
                props.addFunction(props.formation)
                props.closePopupFunction()
            }}>
                <CardContent sx={{m: 0, p: 1}}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <CostComponent cost={props.formation.cost.getOrZero(TestCategory.FORMATION)}/>
                            <Typography variant="body2">{props.formation.name}</Typography>
                            {!props.validation.success &&
                                <Typography variant="caption" color="disabled">{props.validation.message}</Typography>}
                        </Stack>
                        <CategoryTypes cost={props.formation.cost}
                                       grants={props.formation.grants}/>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export function CategoryTypes(props: { cost: TestCategories, grants?: TestCategories }) {
    return (
        <Stack direction="row" spacing={1}>
            {props.grants !== undefined && props.grants.toList().map((categoryCount) => (
                <Chip label={
                    categoryCount.count + 'x ' +
                    categoryCount.category
                } color="success" size="small"/>
            ))}

            {props.cost.toList()
                .filter((item) => item.category !== TestCategory.CORE && item.category !== TestCategory.FORMATION && item.category !== TestCategory.UPGRADE)
                .map((item, value) => (
                    <Chip label={
                        (item.count !== 1 ? item.count + 'x ' : '') +
                        item.category
                    }
                          color="primary"
                          size="small"/>
                ))}
        </Stack>
    )
}

export function FormationComponent(props: Readonly<{
    formation: TestFormation,
    deleteFunction: (id: string) => void
    updateFunction: (id: string) => void
}>) {
    const [upgradeDialogOpen, setUpgradeDialogOpen] = React.useState(false);

    const removeUpgrade = (upgrade: TestUpgradeSpec) => {
        props.formation.upgrades = props.formation.upgrades.filter(item => item !== upgrade)
        props.updateFunction(props.formation.id)
    }

    const addUpgrade = (upgrade: TestUpgradeSpec) => {
        props.formation.upgrades.push(upgrade)
        props.updateFunction(props.formation.id)
        setUpgradeDialogOpen(false)
    }

    return (
        <>
            <DisplayFormationPanel formation={props.formation}
                                   deleteFunction={props.deleteFunction}
                                   updateFunction={props.updateFunction}
                                   removeUpdateFunction={removeUpgrade}
                                   showUpdatesFunction={() => setUpgradeDialogOpen(true)}/>

            <FormationUpgradeDialog formation={props.formation}
                                    upgradeDialogOpen={upgradeDialogOpen}
                                    addUpgradeFunction={addUpgrade}
                                    closeDialogFunction={() => setUpgradeDialogOpen(false)}/>
        </>
    )
}


