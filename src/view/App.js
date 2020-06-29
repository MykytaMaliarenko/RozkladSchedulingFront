import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import routes  from '../routes.js';
import NavBar from "./components/NavBar";
import Home from "./Home";
import TimeTable from "./components/Timetable";

const App = () => {
    return (
        <Router>
            <NavBar />

            <Switch>
                <Route exact path={routes.home}>
                    <Home />
                </Route>

                <Route exact path={"/timetable"}>
                    <TimeTable />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;