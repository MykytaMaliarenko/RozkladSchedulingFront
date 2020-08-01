const homeRoutes = {
    home: "/"
};

const schedulePreviewRoutes = {
    schedulePreviewByGroup: "/schedule/group/:group",
    schedulePreviewByUniversityBuilding: "/schedule/building/:buildingName",
    schedulePreviewByTeacher: "/schedule/teacher/:teacher",
    schedulePreviewByRoom: "/schedule/room/:room",
}

const routes = {
    ...homeRoutes,
    ...schedulePreviewRoutes,
};

export default routes;