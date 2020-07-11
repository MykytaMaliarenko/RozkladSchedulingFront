const homeRoutes = {
    home: "/"
};

const schedulePreviewRoutes = {
    schedulePreviewByGroup: "/schedule/group/:group",
    schedulePreviewByUniversityBuilding: "/schedule/building/:buildingName",
    schedulePreviewByTeacher: "/schedule/teacher/:teacherName",
    schedulePreviewByRoom: "/schedule/room/:roomName",
}

const routes = {
    ...homeRoutes,
    ...schedulePreviewRoutes,
};

export default routes;