import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext} from "react";
import {TestCategory} from "./ts/test";
import InfoIcon from '@mui/icons-material/Info';
import {CategoryChips, CostComponent, ValidationError, ValidationWarning} from "./ArmyBuilderUtils";
import {ValidationResult} from "./ts/restrictions";
import {FormationSpec} from "./ts/formationSpec";
import {ArmyContext} from "./ArmyBuilder";
import {DisplayUnitsDialog} from "./ArmyBuilderUnit";
import {UpgradeSpec} from "./ts/upgradeSpec";
import {Formation} from "./ts/formation";
import {Upgrade} from "./ts/upgrade";

export function FormationComponent(props: Readonly<{
    formation: Formation,
    deleteFunction: (id: string) => void
    updateFunction: (id: string) => void
}>) {
    const [upgradeDialogOpen, setUpgradeDialogOpen] = React.useState(false);
    const [formationDetailsOpen, setFormationDetailsOpen] = React.useState(false);

    const removeUpgrade = (id: string) => {
        props.formation.upgrades = props.formation.upgrades.filter(item => item.id !== id)
        props.updateFunction(props.formation.id)
    }

    const addUpgrade = (upgrade: UpgradeSpec) => {
        props.formation.upgrades.push(new Upgrade(upgrade))
        props.updateFunction(props.formation.id)
        setUpgradeDialogOpen(false)
    }

    return (
        <>
            <DisplayFormationPanel formation={props.formation}
                                   deleteFunction={props.deleteFunction}
                                   updateFunction={props.updateFunction}
                                   removeUpdateFunction={removeUpgrade}
                                   showUpdatesFunction={() => setUpgradeDialogOpen(true)}
                                   showUnitsFunction={() => setFormationDetailsOpen(true)}
            />

            <FormationUpgradeDialog formation={props.formation}
                                    upgradeDialogOpen={upgradeDialogOpen}
                                    addUpgradeFunction={addUpgrade}
                                    closeDialogFunction={() => setUpgradeDialogOpen(false)}/>

            <DisplayUnitsDialog formation={props.formation}
                                upgradeDialogOpen={formationDetailsOpen}
                                closeDialogFunction={() => setFormationDetailsOpen(false)}/>
        </>
    )
}

export function DisplayFormationPanel(props: Readonly<{
    formation: Formation,
    deleteFunction: (id: string) => void
    updateFunction: (id: string) => void
    removeUpdateFunction: (id: string) => void
    showUpdatesFunction: () => void
    showUnitsFunction: () => void
}>) {
    const validationErrors = props.formation.checkUpgradeValidationErrors()

    function costToDisplay() {
        return props.formation.costWithUpgrades().toList().filter((item) =>
            item.category !== TestCategory.CORE && item.category !== TestCategory.FORMATION && item.category !== TestCategory.UPGRADE)
    }

    return (
        <Paper key={props.formation.id}>
            <Grid container alignItems="baseline" rowSpacing={1} columnSpacing={0} m={1}>
                <Grid container direction="column" xs={10}>
                    <Grid container direction="row" columnSpacing={1} alignItems="center">
                        <Grid item>
                            <Typography variant="h6">{props.formation.spec.name}</Typography>
                        </Grid>
                        <CategoryChips items={props.formation.spec.grants?.toList() ?? []} color={"success"}/>
                        <CategoryChips items={costToDisplay()} color={"primary"}/>
                    </Grid>

                    {props.formation.upgrades.length > 0 &&
                        <Grid container columnSpacing={1} alignItems="center" mt={1}>
                            <Grid item>
                                <Typography variant="body1" fontStyle="italic">Upgrades:</Typography>
                            </Grid>
                            {props.formation.upgrades.map((upgrade) => (
                                <Grid item>
                                    <DisplayUpgradePanel upgrade={upgrade}
                                                         removeUpdateFunction={props.removeUpdateFunction}/>
                                </Grid>
                            ))}
                        </Grid>
                    }

                    {validationErrors.map((error) => (
                        <Grid item xs={12}>
                            <ValidationError message={error.message!}/>
                        </Grid>
                    ))}
                </Grid>

                <Grid item xs={2}>
                    <Tooltip title="Formation Details">
                        <IconButton size="small" onClick={() => {
                            props.showUnitsFunction()
                        }}>
                            <InfoIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => {
                            props.deleteFunction(props.formation.id)
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>

                    {props.formation.spec.availableUpgrades.length > 0 &&
                        <Tooltip title="Upgrade">
                            <IconButton size="small" onClick={() => props.showUpdatesFunction()}>
                                <UpgradeIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}

export function DisplayUpgradePanel(props: Readonly<{
    upgrade: Upgrade,
    removeUpdateFunction: (id: string) => void
}>) {
    return (
        <Stack direction="row" alignItems="center" ml={1}>
            <Typography variant="body1">{props.upgrade.spec.name}</Typography>
            <Tooltip title='Delete Upgrade'>
                <IconButton size="small" onClick={() => props.removeUpdateFunction(props.upgrade.id)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </Stack>
    )
}

export function FormationUpgradeDialog(props: Readonly<{
    formation: Formation,
    upgradeDialogOpen: boolean,
    addUpgradeFunction: (upgrade: UpgradeSpec) => void
    closeDialogFunction: () => void
}>) {
    return (
        <Dialog fullWidth
                maxWidth="sm"
                open={props.upgradeDialogOpen}
                onClose={props.closeDialogFunction}
        >
            <DialogContent>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Typography variant="h6">Select Upgrade</Typography>
                    </Grid>
                    {props.formation.spec.availableUpgrades.map((upgrade) => (
                        <Grid item>
                            <DisplayUpgradeSpec formation={props.formation}
                                                upgrade={upgrade}
                                                addUpgrade={props.addUpgradeFunction}/>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export function DisplayUpgradeSpec(props: Readonly<{
    formation: Formation,
    upgrade: UpgradeSpec,
    addUpgrade: (upgrade: UpgradeSpec) => void
}>) {
    const canApplyUpgrade = props.formation.canApplyUpgrade(props.upgrade)
    const theme = useTheme()

    const showAsEnabled = canApplyUpgrade.success || (!canApplyUpgrade.success && !canApplyUpgrade.blocking)

    const textColor = showAsEnabled ? theme.palette.text.primary : theme.palette.text.disabled
    const nameWidth = showAsEnabled ? 'auto' : 4

    return (
        <Card>
            <CardActionArea disabled={!showAsEnabled} onClick={() => {
                props.addUpgrade(props.upgrade)
            }}>
                <CardContent sx={{m: 0, p: 1}}>
                    <Grid item container direction="row" spacing={1} alignItems="center">
                        <Grid item xs={nameWidth}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CostComponent cost={props.upgrade.cost.getOrZero(TestCategory.FORMATION)}/>
                                <Typography noWrap variant="body2"
                                            sx={{color: textColor}}>{props.upgrade.name}</Typography>
                            </Stack>
                        </Grid>
                        {showAsEnabled &&
                            <CategoryChips items={props.upgrade.cost.toList()} color="primary"/>}

                        {!showAsEnabled && <Grid item xs={8}>
                            <ValidationWarning message={canApplyUpgrade.message!}/>
                        </Grid>}
                    </Grid>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export function AddFormationComponent(props: {
    addFunction: (formation: FormationSpec) => void,
    checkValidityFunction: (formation: FormationSpec) => ValidationResult
}) {

    const [addFormationOpen, setAddFormationOpen] = React.useState(false);
    const openAddFormation = () => setAddFormationOpen(true);
    const closeAddFormation = () => setAddFormationOpen(false);

    const armySpec = useContext(ArmyContext)!

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
                    <Typography variant="h6">Select Formation</Typography>
                    {armySpec.armySections.map((section) => (

                        <Accordion expanded={expanded === section.name}
                                   onChange={handleChange(section.name)}
                                   disableGutters="true">
                            <AccordionSummary>
                                <Typography variant="body1">{section.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {section.formations.map((formation) => (
                                    <DisplayFormationSpecToAdd formation={formation}
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

export function DisplayFormationSpecToAdd(props: Readonly<{
    formation: FormationSpec,
    addFunction: (formation: FormationSpec) => void,
    validation: ValidationResult
    closePopupFunction: () => void
}>) {
    const costToDisplay = props.formation.cost.toList().filter(
        (item) => item.category !== TestCategory.CORE && item.category !== TestCategory.FORMATION && item.category !== TestCategory.UPGRADE)

    const nameWidth = props.validation.success ? 'auto' : 4

    return (
        <Card variant="outlined">
            <CardActionArea disabled={!props.validation.success} onClick={() => {
                props.addFunction(props.formation)
                props.closePopupFunction()
            }}>
                <CardContent sx={{m: 0, p: 1}}>
                    <Grid container direction="row" spacing={1} alignItems="center">
                        <Grid item xs={nameWidth}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CostComponent cost={props.formation.cost.getOrZero(TestCategory.FORMATION)}/>
                                <Typography noWrap variant="body2">{props.formation.name}</Typography>
                            </Stack>
                        </Grid>
                        {props.validation.success ? <>
                                <CategoryChips items={props.formation.grants.toList()} color="success"/>
                                <CategoryChips items={costToDisplay} color="primary"/>
                            </> :
                            <Grid item xs={8}>
                                <ValidationWarning message={props.validation.message!}/>
                            </Grid>
                        }
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
