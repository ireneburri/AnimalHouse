import {createRouter , createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Quiz from '../views/Quiz.vue'
import Curiosity from '../views/Curiosity.vue'
import Memory from '../views/Memory.vue'
import Videos from "../views/Videos.vue";
import Facts from "../views/Facts";
import Login from "../views/Login"
import SignUp from "../views/SignUp"
import Logout from "@/views/logout";
const router= createRouter({
    history: createWebHistory(),
    root:  '/',
    mode: 'html5',
    linkActiveClass: "active",
    hashbang: false,
    routes: [
        {
            path:'/',
            name: 'Home',
            component: Home,
            props: true
        },
        {
            path:'/about',
            name: 'About',
            component: About
        },
        {
            path:'/animalQuiz',
            name: 'Quiz',
            component: Quiz
        },
        {
            path:'/curiosity',
            name: 'Curiosity',
            component: Curiosity
        },
        {
            path:'/memory',
            name: 'memory',
            component: Memory
        },
        {
            path:'/videos',
            name: 'videos',
            component: Videos
        },
        {
            path:'/facts',
            name: 'Facts',
            component: Facts
        },
        {
            path:'/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path:'/logout',
            name: 'Logout',
            component: Logout
        },
    ]
})
export default router