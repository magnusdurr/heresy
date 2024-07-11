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
    Badge,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Dialog,
    Divider,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import React, {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ErrorIcon from '@mui/icons-material/Error';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {ValidationResult} from "./ts/restrictions";

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
            <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h4">{props.armySpec.name}</Typography>
                <CategoryTypes cost={TestCategories.fromList([])} grants={props.armySpec.grants}/>
            </Stack>

            <Stack direction="row" spacing={1}>
                {Object.keys(TestCategory).map((key) => (TestCategory[key as keyof typeof TestCategory]))
                    .filter((category) => category !== TestCategory.CORE)
                    .map((category) => (
                        <ArmyAllowanceComponent name={category}
                                                available={armyAllocation.grants.getOrZero(category)}
                                                used={armyAllocation.cost.getOrZero(category)}/>
                    ))}
            </Stack>

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

export function ArmyAllowanceComponent(props: { name: string, available?: number, used?: number, extras?: number }) {
    return (
        <>
            {(props.available ?? 0) + (props.used ?? 0) > 0 && <Card>
                <CardContent>
                    <Stack direction="column" alignItems="center">
                        <Typography variant="caption">{props.name}</Typography>
                        <AllowanceValue used={props.used}
                                        available={Math.floor(props.available ?? 0)}
                                        extras={props.extras}/>
                    </Stack>
                </CardContent>
            </Card>}
        </>
    )
}

export function AllowanceValue(props: { used?: number, available?: number, extras?: number }) {
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

export function CostComponent(props: { cost: number }) {
    return (
        <Badge badgeContent={props.cost} color="primary" showZero>
            <AttachMoneyIcon/>
        </Badge>
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

    const validationErrors = props.formation.checkValidationErrors()

    return (
        <>
            <Paper key={props.formation.id}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{props.formation.spec.name}</Typography>
                    <CategoryTypes cost={props.formation.costWithUpgrades()} grants={props.formation.spec.grants}/>
                    <div>
                        {props.formation.spec.availableUpgrades.length > 0 && <Tooltip title='Upgrade'>
                            <IconButton onClick={() => setUpgradeDialogOpen(true)}>
                                <UpgradeIcon/>
                            </IconButton>
                        </Tooltip>}
                        <Tooltip title='Delete'>
                            <IconButton onClick={() => {
                                props.deleteFunction(props.formation.id)
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Stack>
                {validationErrors.map((error) => (
                    <Typography variant="caption" color="error">{error.message}</Typography>
                ))}

                {props.formation.upgrades.map((upgrade) => (
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body1"> - {upgrade.name}</Typography>
                        <Tooltip title='Delete Upgrade'>
                            <IconButton onClick={() => removeUpgrade(upgrade)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                ))}
            </Paper>

            <Dialog fullWidth
                    maxWidth="sm"
                    open={upgradeDialogOpen}
                    onClose={() => setUpgradeDialogOpen(false)}
            >
                <Stack spacing={1} sx={{m: 2}}>
                    <h2 id="parent-modal-title">Select Upgrade</h2>
                    {props.formation != null && props.formation.spec.availableUpgrades.map((upgrade) => (
                        <FormationUpgradeComponent formation={props.formation} upgrade={upgrade}
                                                   addUpgrade={addUpgrade}/>
                    ))}
                </Stack>
            </Dialog>
        </>
    )
}

export function FormationUpgradeComponent(props: {
    formation: TestFormation,
    upgrade: TestUpgradeSpec,
    addUpgrade: (upgrade: TestUpgradeSpec) => void
}) {
    const canApplyUpgrade = props.formation.canApplyUpgrade(props.upgrade)
    const theme = useTheme()

    function showAsEnabled(result: ValidationResult): Boolean {
        return result.success || (!result.success && !result.blocking)
    }

    return (
        <Card>
            <CardActionArea disabled={!showAsEnabled(canApplyUpgrade)} onClick={() => {
                props.addUpgrade(props.upgrade)
            }}>
                <CardContent sx={{m: 0, p: 1}}>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        {showAsEnabled(canApplyUpgrade) && <>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <CostComponent cost={props.upgrade.cost.getOrZero(TestCategory.UPGRADE)}/>
                                <Typography variant="body2">
                                    {props.upgrade.name}
                                </Typography>
                            </Stack>
                            <CategoryTypes cost={props.upgrade.cost}/>
                        </>}

                        {!showAsEnabled(canApplyUpgrade) && <>
                            <Typography variant="body2" sx={{color: theme.palette.text.disabled}} noWrap>
                                {props.upgrade.name} - {props.upgrade.cost.getOrZero(TestCategory.UPGRADE)} point
                            </Typography>
                            <ErrorIcon color="disabled"/>
                            <Typography variant="caption"
                                        sx={{color: theme.palette.text.disabled}}>{canApplyUpgrade.message}</Typography>
                        </>}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
