import React from "react";
import testData from "./testData";
import DesktopTimeTable from "./Desktop/index";


class TimeTable extends React.Component {

    constructor(props) {
        super(props);

        const timeSlots = [
            {
                id: 1,
                timeStart: "08:30",
                timeEnd: "10:05",
            },
            {
                id: 2,
                timeStart: "12:20",
                timeEnd: "13:55",
            },
            {
                id: 3,
                timeStart: "12:20",
                timeEnd: "13:55",
            },
            {
                id: 4,
                timeStart: "14:15",
                timeEnd: "15:50",
            },
            {
                id: 5,
                timeStart: "16:10",
                timeEnd: "17:45",
            }
        ];


        this.state = {
            timeSlots
        };
    }

    render() {
        return (
            <DesktopTimeTable
                universityClasses={testData}
                timeSlots={this.state.timeSlots}
            />
        )
    }

}

export default TimeTable;