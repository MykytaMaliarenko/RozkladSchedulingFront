import React from 'react';
import PropTypes from "prop-types";
import routes from "../../../../../../routes";
import Link from "@material-ui/core/Link";
import {push} from "connected-react-router";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";
import ExtendedPopover from "../../../../ExtendedPopover";


class GroupsSection extends React.Component {
    constructor(props) {
        super (props);
        this.renderReduced = this.renderReduced.bind(this);
        this.renderNormal = this.renderNormal.bind(this);
    }

    renderReduced(value, index, length) {
        return (
            <Typography
                key={value.id}
                variant="caption"
            >
                {index === length - 1 ? value.name + ' ...' : value.name + ','}
            </Typography>
        )
    }

    renderNormal(value, index, length) {
        let groupUrl = routes.schedulePreviewByGroup.replace(':group', value.id);

        return (
            <Link
                key={value.id}
                variant="caption"
                component="button"
                onClick={() => this.props.dispatch(push(groupUrl))}
            >
                {index === length - 1 ? value.name : value.name + ','}
            </Link>
        )
    }

    render() {
        const {groups} = this.props;

        return (
            <ExtendedPopover
                renderNormal={this.renderNormal}
                renderReduced={this.renderReduced}
                data={groups}
                dataMaxSize={3}
            />
        )
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