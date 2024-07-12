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
                                    <Tooltip title={<UpgradeTooltip upgrade={upgrade}/>}>
                                        <li key={upgrade.name}>{upgrade.name}</li>
                                    </Tooltip>
                                ))}
                            </ul>
                        </Typography>
                    </>}
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>Display unit stats here...</CardContent>
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