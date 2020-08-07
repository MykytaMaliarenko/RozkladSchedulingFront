import React from 'react';
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {fetchAllBuildingsIfNeeded} from "../../../../store/actions/rooms";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import routes from "../../../../routes";
import Grid from "@material-ui/core/Grid";


const mapStateToProps = state => {
    return {
        buildings: state.rooms.buildings,
    }
};

class ByBuilding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchOpen: false,
        };

        this.selectBuilding = this.selectBuilding.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchAllBuildingsIfNeeded());
    }

    selectBuilding(building) {
        this.props.dispatch(
            push(routes.schedulePreviewByBuilding.replace(':building', building))
        );
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
                        open={this.state.isSearchOpen}
                        options={this.props.buildings.data}
                        loading={this.props.buildings.isFetching}
                        openText={"опции"}
                        loadingText={"поиск..."}
                        noOptionsText={"не найдено"}
                        onChange={(e, value) => this.selectBuilding(value)}
                        onOpen={() => {
                            this.setState({
                                isSearchOpen: true
                            });
                        }}
                        onClose={() => {
                            this.setState({
                                isSearchOpen: false
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

export default connect(mapStateToProps)(ByBuilding)