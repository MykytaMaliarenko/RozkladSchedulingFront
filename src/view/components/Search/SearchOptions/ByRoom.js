import React from "react";
import {connect} from "react-redux";
import {
    fetchAllBuildingsIfNeeded,
    fetchAllRoomsInBuildingIfNeeded
} from "../../../../store/actions/rooms";
import {push} from "connected-react-router";
import routes from "../../../../routes";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => {
    return {
        rooms: state.rooms.roomsByBuilding.data,
        isFetchingRooms: state.rooms.roomsByBuilding.isFetching,

        buildings: state.rooms.buildings.data,
    }
};

const styles = () => ({
    menuPaper: {
        maxHeight: 250
    }
});

class ByRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchRoomOpen: false,

            selectedBuilding: '',
        };

        this.selectRoom = this.selectRoom.bind(this);
        this.selectBuilding = this.selectBuilding.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchAllBuildingsIfNeeded());
    }

    selectRoom(room) {
        this.props.dispatch(
            push(routes.schedulePreviewByRoom.replace(':room', room.id))
        );
    }

    selectBuilding(event) {
        let value = event.target.value;
        if (value === '')
            return;

        this.setState({
            selectedBuilding: value,
        });

        this.props.dispatch(fetchAllRoomsInBuildingIfNeeded(value));
    }

    render() {
        let {rooms, isFetchingRooms, buildings, classes} = this.props;

        let buildingMenuItems = null;
        if (Array.isArray(buildings))
            buildingMenuItems = buildings.map(building => (
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
                    <Autocomplete
                        ListboxProps={{ style: { maxHeight: "15rem" }, position: "bottom-start" }}
                        disabled={!this.state.selectedBuilding}
                        open={this.state.isSearchRoomOpen}
                        options={rooms.sort((a, b) => a.name.localeCompare(b.name))}
                        loading={isFetchingRooms}
                        openText={"опции"}
                        loadingText={"поиск..."}
                        noOptionsText={"не найдено"}
                        onChange={
                            (e, value) => this.selectRoom(value)
                        }
                        onOpen={() => {
                            this.setState({
                                isSearchRoomOpen: true
                            });
                        }}
                        onClose={() => {
                            this.setState({
                                isSearchRoomOpen: false
                            });
                        }}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                style={{width: 125}}
                                label="Помещение"
                                placeholder="147а"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {this.props.isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item>
                    <FormControl
                        disabled={!Array.isArray(buildings)}
                    >
                        <InputLabel id="search-by-room-building-label">Здание</InputLabel>
                        <Select
                            value={this.state.selectedBuilding}
                            style={{width: 100}}
                            labelId="search-by-room-building-label"
                            id="search-by-room-building-select"
                            onChange={this.selectBuilding}
                            MenuProps={{ classes: { paper: classes.menuPaper }  }}
                        >
                            {buildingMenuItems}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(
    withStyles(styles, { withTheme: true })(ByRoom)
);