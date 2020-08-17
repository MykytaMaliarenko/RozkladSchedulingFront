import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import {
    isMobile
} from "react-device-detect";
import routes  from '../routes.js';
import NavBar from "./components/NavBar";
import Home from "./Home";
import TimeTable from "./TimeTable";
import ClassPreview from "./mobile/ClassPreview";
import Grid from "@material-ui/core/Grid";


const Routes = (
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

        <Route exact path={[
            routes.classPreview,
        ]}>
            <ClassPreview />
        </Route>
    </Switch>
)


const App = () => {
    if (isMobile)
        return (
            <main>
                <NavBar />
                {Routes}
            </main>
        )
    else
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
                        {Routes}
                    </Grid>
                </Grid>
            </main>
        )
};

export default App;