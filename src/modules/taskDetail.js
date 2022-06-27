import TaskDetailDataService from "../services/taskDetail";

const taskDetailsStore = {
  state: () => ({
    taskDetailList: null,
  }),
  mutations: {
    setTaskDetailList(state, payload) {
      console.log("payload", payload);
      state.taskDetailList = payload;
    },
  },
  actions: {
    async createTaskDetail(context, { id, nameTaskDetail, accessToken }) {
      console.log("createTaskDetail action");

      const res = await TaskDetailDataService.createTaskDetail(
        id,
        nameTaskDetail,
        accessToken
      );
      console.log(res);
      if (res) {
        context.commit("setTaskDetailList", res.data);
      } else {
        context.commit("setTaskDetailList", null);
      }
    },
    async getAllTasksDetailByTask(context, { id, accessToken }) {
      console.log("getAllTasksDetailByTask action");

      const res = await TaskDetailDataService.getAllTasksDetailByTask(
        id,
        accessToken
      );
      console.log(res);
      if (res) {
        context.commit("setTaskDetailList", res.data);
      } else {
        context.commit("setTaskDetailList", null);
      }
    },
    async updateTaskDetailById(context, {id, nameTaskDetail, state, accessToken}) {
      console.log("updateTaskDetailById action");
      const res = await TaskDetailDataService.updateTaskDetailById(id, nameTaskDetail, state, accessToken)
      if(res) {
        console.log('update success')
      }
    },
    async deleteTaskDetailById(context, {id, accessToken}) {
      console.log("deleteTaskDetailById action");
      const res = await TaskDetailDataService.deleteTaskDetailById(id, accessToken)
      if(res) {
        console.log('delete success')
      }
    }
  },
};
export default taskDetailsStore;
