const homeRoutes = {
    home: "/"
};

const schedulePreviewRoutes = {
    schedulePreviewByGroup: "/schedule/group/:group",
    schedulePreviewByBuilding: "/schedule/building/:building",
    schedulePreviewByTeacher: "/schedule/teacher/:teacher",
    schedulePreviewByRoom: "/schedule/room/:room",
}

const routes = {
    ...homeRoutes,
    ...schedulePreviewRoutes,
};

export default routes;