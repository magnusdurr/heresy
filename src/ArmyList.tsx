import {ArmySpec} from "./ts/armySpec";
import {ArmySection} from "./ts/armySection";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {CategoryChips} from "./ArmyBuilderUtils";
import React from "react";
import {FormationSpec} from "./ts/formationSpec";

import ShieldIcon from '@mui/icons-material/Shield';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import {UpgradeSpec} from "./ts/upgradeSpec";
import {UnitComponent} from "./UnitComponent";
import {Unit} from "./ts/unit";

export function ArmyList(props: Readonly<{ armySpec: ArmySpec }>) {
    return (
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
            <Typography variant="h5">Formations</Typography>

            {props.armySpec.armySections.map((section) => (
                <DisplayArmySection section={section}/>
            ))}

        </Stack>
    )
}

function DisplayArmySection(props: Readonly<{ section: ArmySection }>) {
    return (
        <Stack spacing={1}>
            <Typography variant="caption">{props.section.name}</Typography>
            {props.section.formations.map((formation) => (
                <ListFormation formation={formation}/>
            ))}
        </Stack>
    )
}

function ListFormation(props: Readonly<{ formation: FormationSpec }>) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const unitsFromUpgrades: Unit[] = props.formation.availableUpgrades.map((upgrade) =>
        Array.from(upgrade.unitsToAdd).map(entry => entry[0])).flat()

    return (
        <Card>
            <CardHeader sx={{paddingBottom: 0}}
                        action={
                            <IconButton aria-label="unit info" onClick={handleExpandClick}>
                                {!expanded ? <InfoIcon/> : <CancelIcon/>}
                            </IconButton>
                        }
                        avatar={<ShieldIcon/>}
                        title={props.formation.name}
                        subheader={props.formation.unitCount().map(uc => uc.toDisplayString()).join(", ")}
            />
            <CardContent>
                <Typography variant="caption">Grants & Cost</Typography>
                <Grid container spacing={1}>
                    <CategoryChips items={props.formation.grants?.toList() ?? []} color={"success"}/>
                    <CategoryChips items={props.formation.cost.toList()} color={"primary"}/>
                </Grid>

                {props.formation.availableUpgrades.length > 0 &&
                    <>
                        <Box mt={1}>
                            <Typography variant="caption">Upgrades</Typography>
                        </Box>
                        <Typography variant="body2">
                            <ul className="upgrade-list">
                                {props.formation.availableUpgrades.map(upgrade => (
                                    <Tooltip title={<UpgradeTooltip upgrade={upgrade}/>} enterTouchDelay={0}>
                                        <li key={upgrade.name}>{upgrade.name} <InfoIcon fontSize="inherit"/></li>
                                    </Tooltip>
                                ))}
                            </ul>
                        </Typography>
                    </>}
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{m: 0.5, p: 0}}>
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <Typography variant="caption">Units</Typography>
                            {Array.from(props.formation.units.keys()).map((entry, index) => (
                                <UnitComponent key={index} unit={entry} count={1}/>
                            ))}
                        </Stack>

                        {unitsFromUpgrades.length > 0 &&
                            <Stack spacing={1}>
                                <Typography variant="caption">Upgrades</Typography>
                                {unitsFromUpgrades.map((unit, index) => (
                                    <UnitComponent key={index} unit={unit} count={1}/>
                                ))}
                            </Stack>}
                    </Stack>
                </CardContent>
            </Collapse>
        </Card>
    )
}

function UpgradeTooltip(props: { upgrade: UpgradeSpec }) {
    return (
        <Stack spacing={1} pb={1}>
            <Typography variant="caption">{props.upgrade.name}</Typography>
            <Typography variant="body2">{props.upgrade.description}</Typography>
            <Grid container spacing={1}>
                <CategoryChips items={props.upgrade.cost.toList()} color="primary"/>
            </Grid>
        </Stack>
    )
}