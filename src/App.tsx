import {Container, createTheme, CssBaseline, IconButton, Stack, ThemeProvider, Tooltip, Typography} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React, {useState} from "react"
import {ChoseArmy} from "./ChoseArmy";
import {ArmyBuilder} from "./ArmyBuilder";
import {ArmySpec} from "./ts/armySpec";
import {ArmyList} from "./ArmyList";

function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        }
    })

    const [army, setArmy] = useState<ArmySpec | null>(null)
    const [showBuilder, setShowBuilder] = useState(false)

    const toggleDarkTheme = () => {
        localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
        setDarkMode(!darkMode)
    }

    return (
        <Container maxWidth="md">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Stack direction='row' mt="10px" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center">
                        <Typography variant="h5">
                            {army === null && "Select your army"}
                            {army !== null && ''}
                        </Typography>
                    </Stack>
                    <div>
                        {army !== null && !showBuilder && <Tooltip title='Army Builder'>
                            <IconButton onClick={() => setShowBuilder(true)}>
                                <BuildCircleIcon/>
                            </IconButton>
                        </Tooltip>}
                        {army !== null && showBuilder && <Tooltip title='Army List'>
                            <IconButton onClick={() => setShowBuilder(false)}>
                                <AssignmentIcon/>
                            </IconButton>
                        </Tooltip>}
                        <Tooltip title='Start over'>
                            <IconButton onClick={() => setArmy(null)}>
                                <RestartAltIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Toggle theme'>
                            <IconButton onClick={toggleDarkTheme}>
                                {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </IconButton>
                        </Tooltip>
                    </div>
                </Stack>

                {army === null ?
                    <ChoseArmy selectFunction={setArmy}/> :
                    <DisplayArmy showBuilder={showBuilder} army={army}/>
                }
            </ThemeProvider>
        </Container>
    );
}

function DisplayArmy(props: { showBuilder: boolean, army: ArmySpec }) {
    return (
        props.showBuilder ?
            <ArmyBuilder armySpec={props.army}/> :
            <ArmyList armySpec={props.army}/>
    )
}

export default App;
