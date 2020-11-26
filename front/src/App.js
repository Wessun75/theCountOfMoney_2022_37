import './App.css';
import React from "react";
import {createMuiTheme, Grid, MuiThemeProvider} from "@material-ui/core";
import Home from "./Pages/Home/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import NavBar from "./UIComponents/NavBar";
import NotFound from "./Pages/NotFound/NotFound";


function App() {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#082A7E'
            },
            secondary: {
                main: '#7E082A'
            }
        }
    });

  return (
    <div className="App">
        <MuiThemeProvider theme={theme}>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path={"/"}>
                        <Home />
                    </Route>
                    <Route path={'*'}>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </MuiThemeProvider>
    </div>
  );
}

export default App;
