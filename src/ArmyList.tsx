import {ArmySpec} from "./ts/armySpec";
import {ArmySection} from "./ts/armySection";
import {
    Box,
    Card,
    Divider,
    Grid,
    IconButton,
    Stack,
    styled,
    Tooltip,
    tooltipClasses,
    TooltipProps,
    Typography
} from "@mui/material";
import {CategoryChips, CostComponent, HeresyCardContent} from "./ArmyBuilderUtils";
import React from "react";
import {FormationSpec} from "./ts/formationSpec";
import InfoIcon from '@mui/icons-material/Info';
import {UpgradeSpec, UpgradeType} from "./ts/upgradeSpec";
import {ItemCategory} from "./ts/itemCategory";
import {DisplayUnitsDialog} from "./DisplayUnitsDialog";
import {FormationHeader} from "./FormationHeader";
import {WeaponsList} from "./UnitComponent";
import {EquippedWeapon} from "./ts/weapon";

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

            {props.armySpec.armySections.map((section) => (
                <DisplayArmySection section={section}/>
            ))}

        </Stack>
    )
}

function DisplayArmySection(props: Readonly<{ section: ArmySection }>) {
    return (
        <Stack spacing={1}>
            <Typography variant="caption" pt={3}>{props.section.name}</Typography>
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
            <Card elevation={16}>
                <HeresyCardContent>
                    <FormationHeader formation={props.formation}>
                        <Box>
                            <IconButton aria-label="unit info" onClick={() => setFormationDetailsOpen(true)}>
                                <InfoIcon/>
                            </IconButton>
                        </Box>
                    </FormationHeader>

                    {props.formation.availableUpgrades.length > 0 &&
                        <>
                            <Box mt={1}>
                                <Typography variant="caption">Upgrades</Typography>
                            </Box>
                            <Typography variant="body2">
                                <ul className="upgrade-list">
                                    {props.formation.availableUpgrades.map(upgrade => (
                                        <HeresyToolTip title={<UpgradeTooltip upgrade={upgrade}/>} enterTouchDelay={0}>
                                            <li key={upgrade.name}>{upgrade.name} <InfoIcon fontSize="inherit"/></li>
                                        </HeresyToolTip>
                                    ))}
                                </ul>
                            </Typography>
                        </>}
                </HeresyCardContent>
            </Card>

            <DisplayUnitsDialog formation={props.formation}
                                isDialogOpen={formationDetailsOpen}
                                closeDialogFunction={() => setFormationDetailsOpen(false)}/>
        </>
    )
}

const HeresyToolTip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});

function UpgradeTooltip(props: { upgrade: UpgradeSpec }) {
    return (
        <Stack spacing={1} pb={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="caption">{props.upgrade.name}</Typography>
                <CostComponent cost={props.upgrade.cost.getOrZero(ItemCategory.UPGRADE)}/>
            </Stack>

            {props.upgrade.type !== UpgradeType.WEAPON ?
                <Typography variant="body2">{props.upgrade.description}</Typography> :
                <WeaponsList weapons={[new EquippedWeapon(props.upgrade.weaponToAdd!)]}/>
            }

            <Grid container spacing={1}>
                <CategoryChips
                    items={props.upgrade.cost.toList().filter(it => it.category !== ItemCategory.UPGRADE)}
                    color="primary"/>
            </Grid>
        </Stack>
    )
}