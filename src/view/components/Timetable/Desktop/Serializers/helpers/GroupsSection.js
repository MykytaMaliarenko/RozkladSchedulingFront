import React from 'react';
import PropTypes from "prop-types";
import routes from "../../../../../../routes";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Popover from "@material-ui/core/Popover";
import {connect} from "react-redux";


class GroupsSection extends React.Component {
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
        const {groups} = this.props;

        let groupsSection;
        if (groups) {
            let linksToAllGroups = groups.map((group, index) => {
                let groupUrl = routes.schedulePreviewByGroup.replace(':group', group.id);
                return (
                    <Link
                        key={group.id}
                        variant="caption"
                        component="button"
                        onClick={() => this.props.dispatch(push(groupUrl))}
                    >
                        {index === groups.length - 1 ? group.name : group.name + ','}
                    </Link>
                )
            });

            if (groups.length > 3) {
                const groupsShortName = (
                    <Typography variant="caption">
                        {groups.slice(0, 2).map(group => group.name).join() + ' ...'}
                    </Typography>
                )

                groupsSection = (
                    <Box>
                        <ButtonBase
                            style={{'padding': '2.5px'}}
                            aria-describedby={'popover-' + this.props.id}
                            onClick={this.handleClick}
                            focusRipple
                        >
                            {groupsShortName}
                        </ButtonBase>

                        <Popover
                            id={'popover-' + this.props.id}
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
                                {linksToAllGroups}
                            </Box>
                        </Popover>
                    </Box>
                )
            } else {
                groupsSection = linksToAllGroups;
            }
        }

        return groupsSection;
    }
}

GroupsSection.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default connect()(GroupsSection);