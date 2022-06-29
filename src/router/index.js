import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import TaskView from "../views/task/TaskView.vue"
import TaskDetail from "../views/taskDetail/TaskDetail.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: TaskView,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TaskView,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/task/:id/task_detail/store",
    name: "task detail",
    component: TaskDetail,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/auth/login",
    name: "login",
    component: LoginView,
    meta: {
      isAuth: false
    }
  },
  {
    path: "/auth/register",
    name: "register",
    component: RegisterView,
    meta: {
      isAuth: false
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.isAuth)) {
//     const store = useStore()
//     const accessToken = store.state.user.accessToken
//     if(!accessToken) {
//       next('/auth/login')
//     }
//   }
// })

export default router;
