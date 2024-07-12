import {Container, createTheme, CssBaseline, IconButton, Stack, ThemeProvider, Tooltip, Typography} from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React, {useState} from "react"
import {ChoseArmy} from "./ChoseArmy";
import {ArmyBuilder} from "./ArmyBuilder";
import {ArmySpec} from "./ts/armySpec";

function App() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        }
    })

    const [army, setArmy] = useState<ArmySpec | null>(null)

    const toggleDarkTheme = () => {
        localStorage.setItem('theme', !darkMode ? 'dark' : 'light')
        setDarkMode(!darkMode)
    }

    return (
        <Container maxWidth="md">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Stack direction='row' mt="50px" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center">
                        <Typography variant="h5">
                            {army === null && "Select your army"}
                            {army !== null && ''}
                        </Typography>
                    </Stack>
                    <div>
                        <Tooltip title='Start over'>
                            <IconButton onClick={() => setArmy(null)}>
                                <RestartAltIcon></RestartAltIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Toggle theme'>
                            <IconButton onClick={toggleDarkTheme}>
                                {theme.palette.mode === 'dark' ? <Brightness7Icon style={{color: 'white'}}/> :
                                    <Brightness4Icon style={{color: 'gray'}}/>}
                            </IconButton>
                        </Tooltip>
                    </div>
                </Stack>

                {army === null ?
                    <ChoseArmy selectFunction={setArmy}/> :
                    <ArmyBuilder armySpec={army}></ArmyBuilder>
                }
            </ThemeProvider>
        </Container>
    );
}

export default App;
