import React from 'react';
import {fetchAllBuildingsIfNeeded} from "../../../../store/actions/rooms";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import routes from "../../../../routes";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";


const mapStateToProps = state => {
    return {
        buildings: state.rooms.buildings.data,
    }
};

const styles = () => ({
    menuPaper: {
        maxHeight: 250
    }
});

class ByBuilding extends React.Component {
    constructor(props) {
        super(props);

        this.selectBuilding = this.selectBuilding.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchAllBuildingsIfNeeded());
    }

    selectBuilding(event) {
        this.props.dispatch(
            push(routes.schedulePreviewByBuilding.replace(':building', event.target.value))
        );
    }

    render() {
        let {buildings, classes} = this.props;

        let menuItems = null;
        if (Array.isArray(buildings))
            menuItems = buildings.map(building => (
                <MenuItem value={building}>{building}</MenuItem>
            ))


        return (
            <Grid
                container
                justify="center"
                alignItems="flex-end"
                spacing={5}
            >
                <Grid item>
                    <FormControl>
                        <InputLabel id="search-by-building-label">Здание</InputLabel>
                        <Select
                            style={{width: 100}}
                            labelId="search-by-building-label"
                            id="search-by-building-select"
                            onChange={this.selectBuilding}
                            MenuProps={{ classes: { paper: classes.menuPaper }  }}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
        )
    }
}

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(ByBuilding)
)