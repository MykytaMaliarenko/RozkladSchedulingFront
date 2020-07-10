import React from 'react';
import {connect} from "react-redux";
import { push } from 'connected-react-router'
import {searchGroup, searchStop} from "../../../../store/actions/groups";
import routes from "../../../../routes";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
    return {
        hasError: state.groups.hasError,
        isFetching: state.groups.isFetching,

        lastQuery: state.groups.search.query,
        searchData: state.groups.search.data,
    }
};

class ByGroup extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
            redirect: null,
        };

        this.onSearch = this.onSearch.bind(this);
        this.getSearchOptions = this.getSearchOptions.bind(this);
    };

    componentWillUnmount() {
        this.props.dispatch(searchStop());
    }

    onSearch(e, value) {
        console.log({value});
        this.props.dispatch(push(routes.schedulePreviewByGroup.replace(':group', value.id)));
    }

    getSearchOptions(e) {
        if (!this.state.open)
            return;

        let query = e.target.value;
        if (query.length === 0 || query === this.props.lastQuery)
            return;

        this.props.dispatch(searchGroup(query));
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
                        id="asynchronous-demo"
                        open={this.state.open}
                        openText={"опции"}
                        loadingText={"поиск..."}
                        noOptionsText={"не найдено"}
                        onChange={this.onSearch}
                        onOpen={(e) => {
                            this.setState({
                                open: true
                            });
                            this.getSearchOptions(e);
                        }}
                        onClose={() => {
                            this.setState({
                                open: false
                            });
                        }}
                        getOptionSelected={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.name}
                        options={this.props.searchData}
                        loading={this.props.isFetching}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                style={{width: 150}}
                                label="Имя Группы"
                                placeholder="км-92"
                                onChange={this.getSearchOptions}
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

export default connect(mapStateToProps)(ByGroup);