import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import routes from "../../../../../routes";
import {push} from "connected-react-router";
import Link from "@material-ui/core/Link";

const NAME_MAX_LENGTH = 30;

class ClassForRoom extends React.Component {
    render() {
        const {name, teacher, group} = this.props;

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

        let groupSection;
        if (group) {
            let groupUrl = routes.schedulePreviewByGroup.replace(':group', group.id)
            groupSection = (
                <Link
                    variant="caption"
                    component="button"
                    onClick={() => this.props.dispatch(push(groupUrl))}
                >
                    {group.name}
                </Link>
            )
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
                    {groupSection}
                </Grid>
            </Grid>
        )
    }
}

ClassForRoom.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,

    teacher: PropTypes.shape({
        officialName: PropTypes.string.isRequired,
    }),

    group: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default connect()(ClassForRoom);