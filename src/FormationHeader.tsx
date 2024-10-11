import {FormationSpec} from "./ts/formationSpec";
import {Stack, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {CategoryChips, CostComponent, FormationLabel} from "./ArmyBuilderUtils";
import {ItemCategory} from "./ts/itemCategory";
import React, {Children} from "react";
import {Formation} from "./ts/formation";
import {ItemCostEntry} from "./ts/itemCost";

type FormationHeaderProps = {
    formation: Formation | FormationSpec
}

export function FormationHeader({formation, children}: React.PropsWithChildren<FormationHeaderProps>) {
    const formationSpec = formation instanceof Formation ? formation.spec : formation;
    const cost = formation instanceof Formation ? formation.costWithUpgrades() : formationSpec.cost;
    const childCount = Children.count(children)

    return (
        <>
            {childCount > 0 ?
                <Grid container spacing={1}>
                    <Grid justifyContent="end" display="flex" size={{sm:2, xs:3}} order={{sm: 3, xs: 2}}>
                        {children}
                    </Grid>
                    <Grid size={{sm:5, xs:9}} order={{xs: 1}}>
                        <Stack direction="row" spacing={2}>
                            <CostComponent cost={cost.getOrZero(ItemCategory.FORMATION)}/>
                            <FormationLabel formation={formation}/>
                        </Stack>
                    </Grid>
                    <Grid size={{sm:5, xs:12}} order={{sm: 2, xs: 3}}>
                        <CostAndGrantCategories grants={formationSpec.grants?.toList() ?? []} cost={cost.toList()}/>
                    </Grid>
                </Grid>
                :
                <Grid container spacing={1}>
                    <Grid size={{sm:6, xs:12}}>
                        <Stack direction="row" spacing={2}>
                            <CostComponent cost={cost.getOrZero(ItemCategory.FORMATION)}/>
                            <FormationLabel formation={formation}/>
                        </Stack>
                    </Grid>
                    <Grid size={{sm:6, xs:12}}>
                        <CostAndGrantCategories grants={formationSpec.grants?.toList() ?? []} cost={cost.toList()}/>
                    </Grid>
                </Grid>
            }
        </>
    )
}

type CostAndGrantsProps = {
    grants: ItemCostEntry[],
    cost: ItemCostEntry[]
}

function CostAndGrantCategories({grants, cost}: CostAndGrantsProps) {
    return (
        <Stack direction="column">
            <Typography variant="caption">Grants & Cost</Typography>
            <Grid container columnSpacing={1}>
                <CategoryChips items={grants} color={"success"}/>
                <CategoryChips items={cost.filter(it => it.category !== ItemCategory.FORMATION)} color={"primary"}/>
            </Grid>
        </Stack>
    )
}