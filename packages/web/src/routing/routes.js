import HomeView from "views/Home.view.svelte"
import {paths} from "./route-paths";

export const routes = [
    {
        name: paths.HOME,
        component: HomeView
    }
]