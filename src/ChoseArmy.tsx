import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {armies} from "./data/data-armies";
import React from "react";
import {ArmySpec} from "./ts/armySpec";

export function ChoseArmy(props: Readonly<{ selectFunction: Function }>) {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={5} mt={5}>
                {armies.map((army: ArmySpec, index) => (
                    <Grid key={index} display="flex" justifyContent="center" alignItems="center" sm={6} xs={12}>
                        <Card elevation={16}>
                            <CardActionArea onClick={() => props.selectFunction(army)}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={require('' + army.imgUrl)}
                                    alt={army.name}/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{army.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}