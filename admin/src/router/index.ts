import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CourseList from '../views/courses/CourseList.vue'
import CourseEdit from '../views/courses/CourseEdit.vue'

const routes = [
  {
    path: '/',
    component: Main,
    children:[
      { name:'home', path:'/', component: Home },
      { name:'course-list', path:'/courses/list', component: CourseList },
      { name:'course-edit', path:'/courses/edit/:id', component: CourseEdit ,props:true},
      { name:'course-create', path:'/courses/create', component: CourseEdit },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
