import axios from "axios";

class TaskDataService {
  getAllTasks(accessToken) {
    return axios.get("http://localhost:5000/users/me/tasks/all", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }
  createTaskByCurrentUser(nameTask, description, deadline, accessToken) {
    return axios.post(
      "http://localhost:5000/users/me/tasks/store",
      {
        nameTask,
        description,
        deadline,
      },
      // {
      //   withCredentials: true,
      // },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }
  deleteTaskById(id, accessToken) {
    return axios.delete(`http://localhost:5000/tasks/${id}/`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }
}

export default new TaskDataService();
