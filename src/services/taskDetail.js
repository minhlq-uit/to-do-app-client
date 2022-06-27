import axios from "axios";

class TaskDetailDataService {
  createTaskDetail(id, nameTaskDetail, accessToken) {
    return axios.post(
      `http://localhost:5000/tasks/${id}/tasks_detail/store`,
      {
        nameTaskDetail,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }
  getAllTasksDetailByTask(id, accessToken) {
    return axios.get(`http://localhost:5000/tasks/${id}/tasks_detail/all`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }
  updateTaskDetailById(id, nameTaskDetail, state, accessToken) {
    return axios.put(
      `http://localhost:5000/tasks-detail/${id}`,
      {
        nameTaskDetail,
        state,
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }
  deleteTaskDetailById(id, accessToken) {
    return axios.delete(`http://localhost:5000/tasks-detail/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }
}

export default new TaskDetailDataService();
