import MainLayout from 'components/Single/main.layout.svelte'
import HomeView from "views/Home.view.svelte"
import SourceView from "views/Sources.view.svelte"

export const paths = {
    HOME: '/',
    SOURCE: '/source-view'
}

export const routes = [
    {
        name: paths.HOME,
        component: HomeView,
        layout: MainLayout
    },
    {
        name: paths.SOURCE,
        component: SourceView,
        layout: MainLayout
    }
]