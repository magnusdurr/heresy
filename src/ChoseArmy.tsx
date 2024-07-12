import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {armies} from "./data/data-armies";
import React from "react";
import {ArmySpec} from "./ts/armySpec";

export function ChoseArmy(props: Readonly<{ selectFunction: Function }>) {
    return (
        <Grid container spacing={5} mt={5}>
            {armies.map((army: ArmySpec, index) => (
                <Grid item key={index}>
                    <Card>
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

        /*<Stack direction='row'
               divider={<Divider orientation="vertical" flexItem/>}
               mt="50px"
               justifyContent="space-around">


        </Stack>*/
    );
}