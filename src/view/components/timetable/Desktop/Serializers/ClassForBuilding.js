import React from 'react';
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {push} from "connected-react-router";
import routes from "../../../../../routes";
import {connect} from "react-redux";


class ClassForBuilding extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            isDialogOpen: false,
        }

        this.renderAllRooms = this.renderAllRooms.bind(this);
    }

    renderAllRooms(variant) {
        return this.props.rooms
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((room, index) => {
                let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id);
                return (
                    <Link
                        key={room.id}
                        variant={variant}
                        component="button"
                        onClick={() => this.props.dispatch(push(roomUrl))}
                    >
                        {index === this.props.rooms.length - 1 ? room.name : room.name + ','}
                    </Link>
                )
            }
        )
    }

    render() {
        let {rooms} = this.props;
        if (rooms) {
            if (rooms.length <= 5)
                return this.renderAllRooms("body2")
            else
                return (
                    <Box>
                        <ButtonBase
                            style={{'padding': '2.5px'}}
                            onClick={() => this.setState({isDialogOpen: true})}
                            focusRipple
                        >
                            <Typography variant="body2">
                                {
                                    rooms
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .slice(0, 4)
                                        .map(room => room.name).join(',')
                                    + " ..."
                                }
                            </Typography>
                        </ButtonBase>
                        <Dialog
                            open={this.state.isDialogOpen}
                            onClose={() => this.setState({isDialogOpen: false})}
                        >
                            <DialogTitle>
                                {`Кабинеты свободны на ${this.props.timeSlot}-й паре:`}
                            </DialogTitle>
                            <DialogContent>
                                {this.renderAllRooms("body1")}
                            </DialogContent>
                        </Dialog>
                    </Box>
                )
        } else
            return (<Box />)
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