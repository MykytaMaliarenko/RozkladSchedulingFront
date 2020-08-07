import React from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    fetchAllBuildingsIfNeeded,
    fetchAllRoomsInBuildingIfNeeded
} from "../../../../store/actions/rooms";
import {push} from "connected-react-router";
import routes from "../../../../routes";

const mapStateToProps = state => {
    return {
        roomsData: state.rooms.roomsByBuilding,
        buildings: state.rooms.buildings,
    }
};

class ByRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchRoomOpen: false,
            isSearchBuildingOpen: false,

            selectedBuilding: null,
        };

        this.openRoom = this.openRoom.bind(this);
        this.selectBuilding = this.selectBuilding.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchAllBuildingsIfNeeded());
    }

    openRoom(room) {
        this.props.dispatch(
            push(routes.schedulePreviewByRoom.replace(':room', room.id))
        );
    }

    selectBuilding(building) {
        this.setState({
            selectedBuilding: building,
        });

        this.props.dispatch(fetchAllRoomsInBuildingIfNeeded(building));
    }

    render() {
        return (
            <Grid
                container
                justify="center"
                alignItems="flex-end"
                spacing={5}
            >
                <Grid item>
                    <Autocomplete
                        disabled={!this.state.selectedBuilding}
                        open={this.state.isSearchRoomOpen}
                        options={this.props.roomsData.data}
                        loading={this.props.roomsData.isFetching}
                        openText={"опции"}
                        loadingText={"поиск..."}
                        noOptionsText={"не найдено"}
                        onChange={(e, value) => this.openRoom(value)}
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
                    <Autocomplete
                        open={this.state.isSearchBuildingOpen}
                        options={this.props.buildings.data}
                        loading={this.props.buildings.isFetching}
                        openText={"опции"}
                        loadingText={"поиск..."}
                        noOptionsText={"не найдено"}
                        onChange={(e, value) => this.selectBuilding(value)}
                        onOpen={() => {
                            this.setState({
                                isSearchBuildingOpen: true
                            });
                        }}
                        onClose={() => {
                            this.setState({
                                isSearchBuildingOpen: false
                            });
                        }}
                        getOptionSelected={(option, value) => option == value}
                        getOptionLabel={(option) => option.toString()}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                style={{width: 100}}
                                label="Здание"
                                placeholder="16"
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
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(ByRoom);