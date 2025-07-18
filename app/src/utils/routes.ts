export const routes = {
    home: {
        path: '/',
        label: 'Home',
    },
    projects: {
        path: '/projects',
        label: 'Projects',
    },
    work: {
        path: '/work',
        label: 'Work',
    },
    about: {
        path: '/about',
        label: 'About',
    },
    education: {
        path: '/education',
        label: 'Education',
    },
}

export const getRoutes = () => {
    return Object.values(routes).map((route) => ({
        path: route.path,
        label: route.label,
    }))
}
