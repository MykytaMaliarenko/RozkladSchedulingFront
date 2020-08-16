const homeRoutes = {
    home: "/"
};

const schedulePreviewRoutes = {
    schedulePreviewByGroup: "/schedule/group/:group",
    schedulePreviewByBuilding: "/schedule/building/:building",
    schedulePreviewByTeacher: "/schedule/teacher/:teacher",
    schedulePreviewByRoom: "/schedule/room/:room",
}

const classPreviewRoutes = {
    classPreview: "/class/:id",
}

const routes = {
    ...homeRoutes,
    ...schedulePreviewRoutes,
    ...classPreviewRoutes
};

export default routes;