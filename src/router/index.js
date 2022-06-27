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
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TaskView,
  },
  {
    path: "/task/:id/task_detail/store",
    name: "task detail",
    component: TaskDetail,
  },
  {
    path: "/auth/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/auth/register",
    name: "register",
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
