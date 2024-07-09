import {
    TestArmyAllocation,
    TestArmySpec,
    TestCategories,
    TestCategory,
    TestFormation,
    testFormationsBySections,
    TestFormationSpec,
    TestUpgradeSpec
} from "./ts/test";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Divider,
    IconButton,
    Modal,
    Paper,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import React, {useState} from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ErrorIcon from '@mui/icons-material/Error';

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

            <AddFormationComponent addFunction={handleAddFormation}/>
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
    addFunction: (formation: TestFormationSpec) => void
}) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
            <Modal
                open={addFormationOpen}
                onClose={closeAddFormation}
            >
                <Box sx={{...style, width: 600}}>
                    <Stack spacing={1}>
                        <h2 id="parent-modal-title">Select formation</h2>
                        {Array.from(testFormationsBySections.entries()).map((entry) => (
                            <Accordion expanded={expanded === entry[0]} onChange={handleChange(entry[0])}>
                                <AccordionSummary>
                                    <Typography>{entry[0]}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {entry[1].map((formation) => (
                                        <Card variant="outlined">
                                            <CardActionArea onClick={() => {
                                                props.addFunction(formation)
                                                closeAddFormation()
                                            }}>
                                                <CardContent sx={{m: 0, p: 1}}>
                                                    <Stack direction="row" spacing={1} justifyContent="space-between">
                                                        <Typography variant="subtitle1">
                                                            {formation.name} - {formation.cost.getOrZero(TestCategory.FORMATION)} point
                                                        </Typography>
                                                        <CategoryTypes cost={formation.cost}
                                                                       grants={formation.grants}/>
                                                    </Stack>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </>
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
                        (item.count > 1 ? item.count + 'x ' : '') +
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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
            <Paper key={props.formation.id}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{props.formation.spec.name}</Typography>
                    <CategoryTypes cost={props.formation.constWithUpgrades()} grants={props.formation.spec.grants}/>
                    <div>
                        <Tooltip title='Upgrade'>
                            <IconButton onClick={() => setUpgradeDialogOpen(true)}>
                                <UpgradeIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Delete'>
                            <IconButton onClick={() => {
                                props.deleteFunction(props.formation.id)
                            }}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Stack>
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

            <Modal
                open={upgradeDialogOpen}
                onClose={() => setUpgradeDialogOpen(false)}
            >
                <Box sx={{...style, width: 600}}>
                    <h2 id="parent-modal-title">Select Upgrade</h2>
                    <Stack spacing={1}>
                        {props.formation != null && props.formation.spec.availableUpgrades.map((upgrade) => (
                            <Card>
                                <CardActionArea onClick={() => {
                                    addUpgrade(upgrade)
                                }}>
                                    <CardContent sx={{m: 0, p: 1}}>
                                        <Stack direction="row" spacing={1} justifyContent="space-between">
                                            <Typography variant="subtitle1">
                                                {upgrade.name} - {upgrade.cost.getOrZero(TestCategory.UPGRADE)} point
                                            </Typography>
                                            <CategoryTypes cost={upgrade.cost}/>
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}
