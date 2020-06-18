import React from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


export default class ByGroup extends React.Component {
    render() {
        return (
            <Grid
                container
                justify="center"
                alignItems="flex-end"
                spacing={5}
            >
                <Grid item>
                    <TextField id="standard-basic" label="Имя Группы" placeholder="КМ-92" />
                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary">Поиск</Button>
                </Grid>
            </Grid>
        )
    }
}