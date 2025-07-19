import { MailIcon } from "@/components/Icons/MailIcon"
import { GitHubIcon, LinkedInIcon } from "@/components/Icons/SocialIcons"

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


export const socialLinks = {
    linkedin: {
        path: 'https://www.linkedin.com/in/bailey-nepe',
        label: 'LinkedIn',
        icon: LinkedInIcon,
    },
    github: {
        path: 'https://github.com/BaileyNepe',
        label: 'GitHub',
        icon: GitHubIcon,

    },
    email: {
        path: 'mailto:bailey.nepe@gmail.com',
        label: 'bailey.nepe@gmail.com',
        isMail: true,
        icon: MailIcon,
    }
}
