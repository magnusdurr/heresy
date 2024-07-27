import {Formation} from "./ts/formation";
import {Box, Card, IconButton, Tooltip, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {FormationHeader} from "./FormationHeader";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {HeresyCardContent, ValidationError} from "./ArmyBuilderUtils";
import React from "react";

export function DisplayFormationPanel(props: Readonly<{
    formation: Formation,
    deleteFunction: (id: string) => void
    updateFunction: (id: string) => void
    removeUpdateFunction: (id: string) => void
    showUpdatesFunction: () => void
    showUnitsFunction: () => void
}>) {
    const validationErrors = props.formation.checkUpgradeValidationErrors()

    return (
        <Card key={props.formation.id} elevation={16}>
            <HeresyCardContent>
                <FormationHeader formation={props.formation}>
                    <Grid container>
                        <Grid>
                            <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => {
                                    props.deleteFunction(props.formation.id)
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        {props.formation.spec.availableUpgrades.length > 0 &&
                            <Grid>
                                <Tooltip title="Upgrade">
                                    <IconButton size="small" onClick={() => props.showUpdatesFunction()}>
                                        <UpgradeIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        }

                        <Grid>
                            <Tooltip title="Unit Stats">
                                <IconButton size="small" onClick={() => {
                                    props.showUnitsFunction()
                                }}>
                                    <InfoIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </FormationHeader>

                {props.formation.upgrades.length > 0 &&
                    <>
                        <Box mt={1}>
                            <Typography variant="caption">Upgrades</Typography>
                        </Box>
                        <Typography variant="body2">
                            <ul className="upgrade-list-no-commas">
                                {props.formation.upgrades.map((upgrade) => (
                                    <li key={upgrade.spec.name}>
                                        {upgrade.spec.name}
                                        <Tooltip title='Remove Upgrade'>
                                            <IconButton size="small"
                                                        onClick={() => props.removeUpdateFunction(upgrade.id)}>
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </Tooltip>
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                    </>
                }

                {validationErrors.map((error) => (
                    <ValidationError message={error.message!}/>
                ))}
            </HeresyCardContent>
        </Card>
    )
}