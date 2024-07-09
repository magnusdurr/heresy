import {Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography} from "@mui/material";
import {armies} from "./data/data-armies";
import {Army} from "./ts/army";
import React from "react";

export function ChoseArmy(props: { selectFunction: Function }) {
    return (
        <Stack direction='row'
               divider={<Divider orientation="vertical" flexItem/>}
               mt="50px"
               justifyContent="space-around">

            {armies.map((army: Army, index) => (
                <Card key={army.id}>
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
            ))}
        </Stack>
    );
}