import {FormationSpec} from "./ts/formationSpec";
import {Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
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
        <Grid container spacing={1}>
            <Grid justifyContent="end" display="flex" sm={2} xs={3} order={{sm: 3, xs: 2}}>
                {children}
            </Grid>
            <Grid sm={5} xs={9} order={{xs: 1}}>
                <Stack direction="row" spacing={2}>
                    <CostComponent cost={cost.getOrZero(ItemCategory.FORMATION)}/>
                    <FormationLabel formation={formation}/>
                </Stack>
            </Grid>
            <Grid sm={5} xs={12} order={{sm: 2, xs: 3}}>
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
    )
}