<template>
  <div class="task-body">
    <TaskList :tasks="tasks" @addTaskSuccess="addTaskSuccess" @deleteTaskSuccess="deleteTaskSuccess"/>
  </div>
</template>

<script>
import TaskList from "./TaskList/TaskList.vue";
import { ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TaskList,
  },
  setup() {
    const store = useStore();
    const tasks = ref(null);
    const accessToken = store.state.user.accessToken

    const getAllTasks = async (accessToken) => {
      try {
        await store.dispatch("getAllTasks", {accessToken});
        tasks.value = store.state.tasks.taskList
      } catch (err) {
        console.log(err.message);
      }
    };
    watch(tasks, () => {
      console.log('tasks changed', tasks)
    },)
    watchEffect(() => getAllTasks(accessToken));
    const addTaskSuccess = () => {
      getAllTasks(accessToken)
    }
    const deleteTaskSuccess = () => {
      getAllTasks(accessToken)
    }


    return { tasks, addTaskSuccess, deleteTaskSuccess };
  },
};
</script>

<style></style>
