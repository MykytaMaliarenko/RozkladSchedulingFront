import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";

export default class SearchOptionPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            selectedOptionIndex: 0,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        let target = event.currentTarget;
        this.setState(() => ({
            anchorEl: target,
        }));
    }

    handleClose(index) {
        this.setState(() => ({
            anchorEl: null,
        }));

        if (index === 0 || index)
        {
            this.setState(() => ({
                selectedOptionIndex: index,
            }));
            this.props.onSelect(index);
        }
    }

    render() {
        return (
            <Grid
                container
                spacing={1}
                justify="center"
            >

                <Grid item>
                    <Typography variant="h6">
                        Поиск по:
                    </Typography>
                </Grid>

                <Grid item>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                        {this.props.searchOptions[this.state.selectedOptionIndex]}
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        getContentAnchorEl={null}
                        disablePortal={true}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleClose(null)}
                    >
                        {this.props.searchOptions.map((option, index) => (
                            <MenuItem
                                selected={index === this.state.selectedOptionIndex}
                                onClick={() => this.handleClose(index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
        )
    }
}

SearchOptionPicker.propTypes = {
    searchOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
};