import { createStore } from "vuex";
import userStore from "@/modules/user";
import tasksStore from "@/modules/tasks";
import taskDetailsStore from "@/modules/taskDetail";

const store = createStore({
  modules: {
    user: userStore,
    tasks: tasksStore,
    taskDetails: taskDetailsStore,
  },
});

export default store;
