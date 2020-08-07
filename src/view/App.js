import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import routes  from '../routes.js';
import NavBar from "./components/NavBar";
import Home from "./Home";
import TimeTable from "./TimeTable";
import Grid from "@material-ui/core/Grid";

const App = () => {
    return (
        <main>
            <NavBar />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ minHeight: 'calc(90vh - 86px)' }}
            >

                <Grid item>
                    <Switch>
                        <Route exact path={routes.home}>
                            <Home />
                        </Route>

                        <Route exact path={[
                            routes.schedulePreviewByGroup,
                            routes.schedulePreviewByRoom,
                            routes.schedulePreviewByTeacher,
                            routes.schedulePreviewByBuilding,
                        ]}>
                            <TimeTable />
                        </Route>
                    </Switch>
                </Grid>

            </Grid>
        </main>
    )
};

export default App;