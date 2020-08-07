import React from 'react';
import PropTypes from 'prop-types';
import {Box} from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import ButtonBase from "@material-ui/core/ButtonBase";


class ExtendedPopover extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            anchorEl: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget,
        })
    }

    handlePopupClose() {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        let {data, dataMaxSize, renderReduced, renderNormal} = this.props;

        let fullyRenderedData = data.map((value, index) => renderNormal(value, index, data.length));

        let result;
        if (data.length > dataMaxSize) {
            result = (
                <Box>
                    <ButtonBase
                        style={{'padding': '2.5px'}}
                        onClick={this.handleClick}
                        focusRipple
                    >
                        {
                            data
                                .slice(0, dataMaxSize - 1)
                                .map((value, index) =>
                                    renderReduced(value, index, dataMaxSize - 1))
                        }
                    </ButtonBase>

                    <Popover
                        open={Boolean(this.state.anchorEl)}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handlePopupClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box style={{'margin': '5px'}}>
                            {fullyRenderedData}
                        </Box>
                    </Popover>
                </Box>
            )
        } else {
            result = (
                <Box>
                    {fullyRenderedData}
                </Box>
            );
        }

        return result;
    }
}

ExtendedPopover.propTypes = {
    data: PropTypes.array.isRequired,
    dataMaxSize: PropTypes.number.isRequired,

    renderReduced: PropTypes.func.isRequired,
    renderNormal: PropTypes.func.isRequired,
}

export default ExtendedPopover;