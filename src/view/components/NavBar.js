import React from "react";
import {connect} from "react-redux";
import { push } from 'connected-react-router'
import routes from "../../routes";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(2.5),
    },

    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },

}));

const NavBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant={"dense"}>
                    <Container maxWidth={"sm"}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="baseline"
                            spacing={2}
                        >
                            <Grid item>
                                <Typography variant="h6" className={classes.title}>
                                    Rozklad Scheduling
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body1"
                                    color="inherit"
                                    onClick={() => {
                                        props.dispatch(push(routes.home))
                                    }}
                                >
                                    Поиск
                                </Link>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default connect()(NavBar);