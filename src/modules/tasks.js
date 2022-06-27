import TaskDataService from "../services/task";

const tasksStore = {
  state: () => ({
    taskList: null,
  }),
  mutations: {
    setTaskList(state, payload) {
      console.log("payload", payload);
      state.taskList = payload;
    },
  },
  actions: {
    async getAllTasks(context, { accessToken }) {
      console.log("getAllTasks action");

      const res = await TaskDataService.getAllTasks(accessToken);
      console.log(res.data);
      if (res) {
        context.commit("setTaskList", res.data);
      } else {
        context.commit("setTaskList", null);
      }
    },
    async createTaskByCurrentUser(
      context,
      { nameTask, description, deadline, accessToken }
    ) {
      console.log("createTaskByCurrentUser action");
      const res = await TaskDataService.createTaskByCurrentUser(
        nameTask,
        description,
        deadline,
        accessToken
      );
      if (res) {
        console.log("add new task success");
      }
    },
    async deleteTaskById(context, { id, accessToken }) {
      console.log("createTaskByCurrentUser action");
      const res = await TaskDataService.deleteTaskById(
        id,
        accessToken
      );
      if (res) {
        console.log("add new task success");
      }
    },
  },
};
export default tasksStore;
