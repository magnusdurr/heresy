import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useContext} from "react";
import {CategoryChips, CostComponent, HeresyCardContent, ValidationWarning} from "./ArmyBuilderUtils";
import {ValidationResult} from "./ts/restrictions";
import {FormationSpec} from "./ts/formationSpec";
import {ArmyContext} from "./ArmyBuilder";
import {DisplayUnitsDialog} from "./DisplayUnitsDialog";
import {UpgradeSpec} from "./ts/upgradeSpec";
import {Formation} from "./ts/formation";
import {Upgrade} from "./ts/upgrade";
import {ItemCategory} from "./ts/itemCategory";
import {DisplayFormationPanel} from "./DisplayFormationPanel";
import {FormationHeader} from "./FormationHeader";
import {HeresyDialog} from "./HeresyDialog";

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
                                isDialogOpen={formationDetailsOpen}
                                closeDialogFunction={() => setFormationDetailsOpen(false)}/>
        </>
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
        <HeresyDialog
            maxWidth="sm"
            title="Select Upgrade"
            isOpen={props.upgradeDialogOpen}
            closeFunction={props.closeDialogFunction}>

            <Stack direction="column" spacing={1}>
                {props.formation.spec.availableUpgrades.map((upgrade) => (
                    <DisplayUpgradeSpec formation={props.formation}
                                        upgrade={upgrade}
                                        addUpgrade={props.addUpgradeFunction}/>
                ))}
            </Stack>
        </HeresyDialog>
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
                <HeresyCardContent>
                    <Grid item container direction="row" spacing={1} alignItems="center">
                        <Grid item xs={nameWidth}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CostComponent cost={props.upgrade.cost.getOrZero(ItemCategory.UPGRADE)}/>
                                <Typography noWrap variant="body2"
                                            sx={{color: textColor}}>{props.upgrade.name}</Typography>
                            </Stack>
                        </Grid>
                        {showAsEnabled &&
                            <CategoryChips
                                items={props.upgrade.cost.toList().filter(it => it.category !== ItemCategory.UPGRADE)}
                                color="primary"/>}

                        {!showAsEnabled && <Grid item xs={8}>
                            <ValidationWarning message={canApplyUpgrade.message!}/>
                        </Grid>}
                    </Grid>

                </HeresyCardContent>
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

            <HeresyDialog title="Select Formation"
                          maxWidth="sm"
                          isOpen={addFormationOpen}
                          closeFunction={closeAddFormation}>

                <Stack spacing={1}>
                    {armySpec.armySections.map((section) => (
                        <Accordion expanded={expanded === section.name}
                                   onChange={handleChange(section.name)}
                                   disableGutters>
                            <AccordionSummary>
                                <Typography variant="body1">{section.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{m: 0.5, p: 0}}>
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
            </HeresyDialog>
        </>
    )
}

export function DisplayFormationSpecToAdd(props: Readonly<{
    formation: FormationSpec,
    addFunction: (formation: FormationSpec) => void,
    validation: ValidationResult
    closePopupFunction: () => void
}>) {
    return (
        <Card variant="outlined">
            <CardActionArea disabled={!props.validation.success} onClick={() => {
                props.addFunction(props.formation)
                props.closePopupFunction()
            }}>
                <HeresyCardContent>
                    <FormationHeader formation={props.formation}/>
                    {!props.validation.success && <ValidationWarning message={props.validation.message!}/>}
                </HeresyCardContent>
            </CardActionArea>
        </Card>
    )
}
