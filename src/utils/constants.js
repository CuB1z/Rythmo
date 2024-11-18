const SERVER_CONFIG = {
    url: import.meta.env.URL || "http://localhost:4321",
    api: "/api",
    authRoute: "/auth/check",
}

const AVAILABLE_ROUTES = {
    home: {
        path: "/",
        name: "Home",
        icon: "/favicon.svg",
    },
    subjects: {
        path: "/subjects",
        name: "Subjects",
        icon: "favicon.svg",
    },
    profile: {
        path: "/profile",
        name: "Profile",
        icon: "/favicon.svg",
    },
}

const APP_DATA = {
    name: "Rythmo",
    description: "Rythmo is a platform that helps you to organize your study time and keep track of your progress.",
    author: "Bit Forge",
}

export {
    SERVER_CONFIG,
    AVAILABLE_ROUTES,
    APP_DATA,
}