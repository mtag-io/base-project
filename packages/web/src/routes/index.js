import Home from 'views/Home.view.svelte'
import About from 'views/About.view.svelte'

export const routes = {
    HOME: {
        path: '/',
        component: Home
    },
    ABOUT: {
        path: '/about',
        component: About
    }
}
