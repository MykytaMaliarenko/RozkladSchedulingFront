import React from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TimeLine from "../../TimeLine";

const MyTableBody = (props) => {
    const {
        showTimeLine,
        classes, ClassSerializer
    } = props;

    const timeSlots = useSelector(state => state.timeSlots.data);

    return (
        <TableBody>
            {
                [1, 2, 3, 4, 5].map(timeSlotId => (
                    <TableRow key={timeSlotId}>
                        {(() => {
                                if (showTimeLine) {
                                    return (
                                        <TableCell>
                                            <TimeLine
                                                timeSlot={timeSlots.find(v => v.id === timeSlotId)}
                                            />
                                        </TableCell>
                                    )
                                }
                        })()}

                        {
                            [0, 1, 2, 3, 4, 5].map(dayOfWeek => {
                                if (classes[dayOfWeek][timeSlotId-1]) {
                                    return (
                                        <TableCell component="th" scope="row" key={dayOfWeek}>
                                            <ClassSerializer
                                                {...classes[dayOfWeek][timeSlotId-1]}
                                            />
                                        </TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell component="th" scope="row" key={dayOfWeek} />
                                    )
                                }
                            })
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    )
}

MyTableBody.defaultProps = {
    highlightEmptySlots: false,
    showTimeLine: true,
}

MyTableBody.propTypes = {
    showTimeLine: PropTypes.bool,

    classes: PropTypes.array.isRequired,
    ClassSerializer: PropTypes.elementType.isRequired,
}

export default MyTableBody;
