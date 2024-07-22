import {FormationSpec} from "./ts/formationSpec";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {CategoryChips, CostComponent, FormationLabel} from "./ArmyBuilderUtils";
import {ItemCategory} from "./ts/itemCategory";
import React from "react";
import {Formation} from "./ts/formation";

type FormationHeaderProps = {
    formation: Formation | FormationSpec
}

export function FormationHeader({formation, children}: React.PropsWithChildren<FormationHeaderProps>) {
    const formationSpec = formation instanceof Formation ? formation.spec : formation;
    const cost = formation instanceof Formation ? formation.costWithUpgrades() : formationSpec.cost;

    return (
        <Stack direction="row" justifyContent="space-between">
            <Box mr={3}>
                <CostComponent cost={cost.getOrZero(ItemCategory.FORMATION)}/>
            </Box>
            <Grid container spacing={1}>
                <Grid item sm={5} xs={12}>
                    <FormationLabel formation={formation}/>
                </Grid>
                <Grid item sm={7} xs={12}>
                    <Stack direction="column">
                        <Typography variant="caption">Grants & Cost</Typography>
                        <Grid container columnSpacing={1}>
                            <CategoryChips items={formationSpec.grants?.toList() ?? []}
                                           color={"success"}/>
                            <CategoryChips
                                items={cost.toList().filter(it => it.category !== ItemCategory.FORMATION)}
                                color={"primary"}/>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <Stack direction="row">
                {children}
            </Stack>
        </Stack>
    )
}