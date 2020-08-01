import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import ButtonBase from "@material-ui/core/ButtonBase";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routes from "../../../../../routes";
import {push} from "connected-react-router";

const NAME_MAX_LENGTH = 30;

class ClassForRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };

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
        const {name, teacher, groups} = this.props;

        let nameSection;
        if (name.length > NAME_MAX_LENGTH)
            nameSection = (
                <Tooltip title={name}>
                    <Typography variant="body2">
                        <strong>
                            {name.substring(0, NAME_MAX_LENGTH - 2) + '..'}
                        </strong>
                    </Typography>
                </Tooltip>
            )
        else
            nameSection = (
                <Typography variant="body2">
                    <strong>
                        {name}
                    </strong>
                </Typography>
            )

        let teacherSection;
        if (teacher)
            teacherSection = (
                <Typography variant="caption">
                    {teacher.officialName}
                </Typography>
            )

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

        return (
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
            >
                <Grid item xs>
                    {nameSection}
                </Grid>

                <Grid item xs>
                    {teacherSection}
                </Grid>

                <Grid item xs>
                    {groupsSection}
                </Grid>
            </Grid>
        )
    }
}

ClassForRoom.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,

    teacher: PropTypes.shape({
        officialName: PropTypes.string.isRequired,
    }),

    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
};

export default connect()(ClassForRoom);