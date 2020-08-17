import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SimpleDialog from "../../../SimpleDialog";
import routes from "../../../../../routes";
import {push} from "connected-react-router";


const MAX_ROOMS = 7;

class ClassForBuilding extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDialogOpen: false,
        };

        this.openRoomSchedule = this.openRoomSchedule.bind(this);
    }

    openRoomSchedule(room) {
        let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id);
        this.props.dispatch(push(roomUrl));
    }

    render() {
        let {rooms} = this.props;
        if (!rooms || rooms.length === 0)
            return (
                <Box />
            )

        return (
            <Box style={{"width": "100%", 'height': '100%'}}>
                <ButtonBase
                    style={{"width": "100%", 'height': '100%'}}
                    onClick={() => this.setState({
                        isDialogOpen: true
                    })}
                >
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Typography variant="body2">
                                {rooms
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .slice(0, MAX_ROOMS)
                                    .map(room => room.name)
                                    .join(',')
                                }

                                {
                                    rooms.length > MAX_ROOMS ? '...' : ''
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </ButtonBase>

                <SimpleDialog
                    title={'Свободные Помещения'}
                    values={rooms}
                    valueRender={(room) => room.name}
                    open={this.state.isDialogOpen}
                    onSelected={(room) => this.openRoomSchedule(room)}
                    onClose={() => this.setState({
                        isDialogOpen: false
                    })}
                />
            </Box>
        )
    }
}

ClassForBuilding.propTypes = {
    weekNumber: PropTypes.number.isRequired,
    dayOfWeek: PropTypes.number.isRequired,
    timeSlot: PropTypes.number.isRequired,

    rooms: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            universityBuilding: PropTypes.number.isRequired,
        })
    ),
}

export default connect()(ClassForBuilding);