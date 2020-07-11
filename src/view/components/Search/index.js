import React from 'react';
import Paper from "@material-ui/core/Paper";
import SearchOptionPicker from "./SearchOptionPicker";
import searchOptions from "./SearchOptions"
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";


const styles = theme => ({
    searchRoot: {
        padding: theme.spacing(3),
    },
    
    searchSub: {
        marginTop: theme.spacing(1.5),
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchByOptions: [
                {
                    optionName: "Группе",
                    component: searchOptions.ByGroup,
                },
                {
                    optionName: "Корпусу",
                    component: searchOptions.ByBuilding,
                },
                {
                    optionName: "Кабинету",
                    component: searchOptions.ByRoom,
                },
                {
                    optionName: "Преподователю",
                    component: searchOptions.ByTeacher,
                },
            ],

            selectedOptionIndex: 0,
        };

        this.onSearchOptionSelect = this.onSearchOptionSelect.bind(this);
    }

    onSearchOptionSelect(index) {
        this.setState(() => ({
            selectedOptionIndex: index,
        }));
    }

    render() {
        const { classes } = this.props;

        const SearchByComponent = this.state.searchByOptions[this.state.selectedOptionIndex].component;
        const searchOptionsNames = this.state.searchByOptions.map(option => option.optionName);

        return (
            <Paper className={classes.searchRoot} elevation={3}>
                <SearchOptionPicker
                    searchOptions={searchOptionsNames}
                    onSelect={this.onSearchOptionSelect}
                />

                <Divider />

                <Box className={classes.searchSub}>
                    <SearchByComponent />
                </Box>
            </Paper>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Search);
