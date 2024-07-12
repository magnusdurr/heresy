import React from "react";
import {Card, CardContent, Divider, Stack, Typography} from "@mui/material";

import {Army} from "./ts/army";
import {Formation} from "./ts/formation";
import {UnitComponent} from "./UnitComponent";

import {ArmySection} from "./ts/armySection";

export function ArmyComponent(props: { army: Army }) {

    return (
        <div>
            {props.army.armySections.map((section: ArmySection) => (<>
                <p>{section.name}</p>
                <Stack direction='column'
                       divider={<Divider orientation="vertical" flexItem/>}
                       spacing={3}>
                    {section.formations.map((formation: Formation, index) => (
                        <Stack key={index}
                               direction='row'
                               divider={<Divider orientation="vertical" flexItem/>}
                               spacing={3}>

                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        {formation.name}
                                    </Typography>
                                    {Array.from(formation.units.entries()).map((entry, formationIndex) => (
                                        <UnitComponent key={formationIndex} unit={entry[0]} count={entry[1]}/>
                                    ))}
                                </CardContent>
                            </Card>

                            {formation.upgradeOptions.length > 0 &&
                                <Stack spacing={1}>
                                    <Typography variant="h6">{formation.name} Upgrades</Typography>
                                    {formation.upgradeOptions.map((upgrade, index) => (
                                        <Card key={index}>
                                            <CardContent>
                                                <Stack>
                                                    <Typography variant="h6">{upgrade.name}</Typography>
                                                    <Typography variant="body2">{upgrade.description}</Typography>
                                                    {Array.from(upgrade.unitsToAdd.entries()).map((entry) => (
                                                        <UnitComponent unit={entry[0]} count={entry[1]}/>
                                                    ))}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            }
                        </Stack>
                    ))}
                </Stack>
            </>))}
        </div>
    )
}

