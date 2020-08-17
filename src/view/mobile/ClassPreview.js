import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../store/actions";
import {filters} from "../../store/actions/classes";
import Field from "../components/classpreview/Field";
import routes from "../../routes";
import {push} from "connected-react-router";
import SimpleDialog from "../components/SimpleDialog";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => {
    return {
        hasError: state.classes.hasError || state.timeSlots.hasError,
        isFetching: state.classes.isFetching || state.timeSlots.isFetching,

        classes: state.classes.data[filters.BY_ID],

        timeSlots: state.timeSlots.data,
    }
};

class ClassPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            dialogOpen: false,
        }

        this.loadClassData = this.loadClassData.bind(this);
        this.onGroupsSectionClick = this.onGroupsSectionClick.bind(this);
        this.openRoomSchedule = this.openRoomSchedule.bind(this);
        this.openGroupSchedule = this.openGroupSchedule.bind(this);
        this.openTeacherSchedule = this.openTeacherSchedule.bind(this);
    }

    componentDidMount() {
        this.loadClassData();
        this.props.dispatch(actions.timeSlots.fetchTimeSlotsIfNeeded());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params)
            this.loadClassData();
    }

    loadClassData() {
        let {id} = this.props.match.params;

        if (!this.state.id || this.state.id !== id)
            this.setState({
                id: Number(id),
            });

        this.props.dispatch(actions.classes.fetchClassByIdIfNeeded(id));
    }

    onGroupsSectionClick() {
        let {groups} = this.props.classes[this.state.id];
        if (groups.length > 1) {
            this.setState({
                dialogOpen: true,
            })
        } else {
            this.openGroupSchedule(this.props.classes[this.state.id].groups[0]);
        }
    }

    openGroupSchedule(group) {
        let groupUrl = routes.schedulePreviewByGroup.replace(':group', group.id);
        this.props.dispatch(push(groupUrl));
    }

    openRoomSchedule(room) {
        let roomUrl = routes.schedulePreviewByRoom.replace(':room', room.id);
        this.props.dispatch(push(roomUrl));
    }

    openBuildingSchedule(room) {
        let buildingUrl = routes.schedulePreviewByBuilding.replace(':building', room.universityBuilding)
        this.props.dispatch(push(buildingUrl));
    }

    openTeacherSchedule(teacher) {
        let teacherUrl = routes.schedulePreviewByTeacher.replace(':teacher', teacher.id);
        this.props.dispatch(push(teacherUrl));
    }

    render() {
        if (this.props.isFetching || !this.state.id)
            return (
                <CircularProgress size="4rem" />
            )

        let {name, type, groups, teacher, room, timeSlot} = this.props.classes[this.state.id];
        let timeSlotData = this.props.timeSlots.find(v => v.id === timeSlot);

        let nameSection;
        if (name)
            nameSection = (
                <Box>
                    <Typography variant={"h6"}>
                        {name}
                    </Typography>
                    <Typography variant={"subtitle2"}>
                        {timeSlotData.timeStart} - {timeSlotData.timeEnd}
                    </Typography>
                </Box>
            )

        let typeSection;
        if (type)
            typeSection = (<Field name={'Тип'} value={type} />)

        let groupsSection;
        if (groups)
            groupsSection = (
                <Field
                    name={'Группы'}
                    onClick={this.onGroupsSectionClick}
                    value={
                        groups
                            .slice(0, 4)
                            .map(group => group.name)
                            .join(',')
                        + (groups.length > 5 ? '...' : '')
                    }
                />
            )

        let teacherSection;
        if (teacher)
            teacherSection = (
                <Field
                    name={'Преподаватель'}
                    onClick={() => this.openTeacherSchedule(teacher)}
                    value={teacher.officialName}
                />
            )

        let roomSection;
        if (room)
            roomSection = (
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Field
                            name={'Помещение'}
                            onClick={() => this.openRoomSchedule(room)}
                            value={room.name}
                        />
                    </Grid>

                    <Grid item>
                        <Field
                            name={'Здание'}
                            onClick={() => this.openBuildingSchedule(room)}
                            value={room.universityBuilding}
                        />
                    </Grid>
                </Grid>
            )

        return (
            <Box p={1.5}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={1}
                >
                    <Grid item>
                        {nameSection}
                    </Grid>

                    <Grid item>
                        {typeSection}
                    </Grid>

                    <Grid item>
                        {groupsSection}
                    </Grid>

                    <Grid item>
                        {teacherSection}
                    </Grid>

                    <Grid item>
                        {roomSection}
                    </Grid>
                </Grid>

                <SimpleDialog
                    title={"Выберите группу:"}
                    values={groups}
                    valueRender={(value) => value.name}
                    open={this.state.dialogOpen}
                    onSelected={(value) => this.openGroupSchedule(value)}
                    onClose={() => this.setState({
                        dialogOpen: false
                    })}
                />
            </Box>
        )
    }
}

export default withRouter(connect(mapStateToProps)(ClassPreview));