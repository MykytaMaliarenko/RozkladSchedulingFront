import React from "react";
import {searchTeacherStop, searchTeacher} from "../../../../store/actions/teachers";
import {push} from "connected-react-router";
import routes from "../../../../routes";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        hasError: state.teachers.hasError,
        isFetching: state.teachers.isFetching,

        lastQuery: state.teachers.search.query,
        searchData: state.teachers.search.data,
    }
};

class ByTeacher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            redirect: null,
        };

        this.onSearch = this.onSearch.bind(this);
        this.getSearchOptions = this.getSearchOptions.bind(this);
    }

    componentWillUnmount() {
        this.props.dispatch(searchTeacherStop());
    }

    onSearch(e, value) {
        this.props.dispatch(push(routes.schedulePreviewByTeacher.replace(':teacher', value.id)));
    }

    getSearchOptions(e) {
        if (!this.state.open)
            return;

        let query = e.target.value;
        if (query.length === 0 || query === this.props.lastQuery)
            return;

        this.props.dispatch(searchTeacher(query));
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
                                style={{width: 200}}
                                label="Имя Преподавателя"
                                placeholder="Чертов"
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

export default connect(mapStateToProps)(ByTeacher)