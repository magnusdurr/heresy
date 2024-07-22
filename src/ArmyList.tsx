import {ArmySpec} from "./ts/armySpec";
import {ArmySection} from "./ts/armySection";
import {Box, Card, CardContent, Divider, Grid, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {CategoryChips, CostComponent} from "./ArmyBuilderUtils";
import React from "react";
import {FormationSpec} from "./ts/formationSpec";
import InfoIcon from '@mui/icons-material/Info';
import {UpgradeSpec} from "./ts/upgradeSpec";
import {ItemCategory} from "./ts/itemCategory";
import {DisplayUnitsDialog} from "./ArmyBuilderUnit";
import {FormationHeader} from "./FormationHeader";

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
                <DisplayListFormation formation={formation}/>
            ))}
        </Stack>
    )
}

function DisplayListFormation(props: Readonly<{ formation: FormationSpec }>) {
    const [formationDetailsOpen, setFormationDetailsOpen] = React.useState(false);

    return (
        <>
            <Card>
                <CardContent>
                    <FormationHeader formation={props.formation}>
                        <IconButton aria-label="unit info" onClick={() => setFormationDetailsOpen(true)}>
                            <InfoIcon/>
                        </IconButton>
                    </FormationHeader>

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
                </CardContent>
            </Card>

            <DisplayUnitsDialog formation={props.formation}
                                isDialogOpen={formationDetailsOpen}
                                closeDialogFunction={() => setFormationDetailsOpen(false)}/>
        </>
    )
}

function UpgradeTooltip(props: { upgrade: UpgradeSpec }) {
    return (
        <Stack spacing={1} pb={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption">{props.upgrade.name}</Typography>
                <CostComponent cost={props.upgrade.cost.getOrZero(ItemCategory.UPGRADE)}/>
            </Stack>
            <Typography variant="body2">{props.upgrade.description}</Typography>
            <Grid container spacing={1}>
                <CategoryChips items={props.upgrade.cost.toList().filter(it => it.category !== ItemCategory.UPGRADE)}
                               color="primary"/>
            </Grid>
        </Stack>
    )
}