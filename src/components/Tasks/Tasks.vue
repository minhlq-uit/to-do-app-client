<template>
  <div class="task-body">
    <TaskList
      :tasks="tasks"
      @addTaskSuccess="addTaskSuccess"
      @deleteTaskSuccess="deleteTaskSuccess"
    />
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
  data() {
    return {
      tasks: null,
      accessToken: this.$store.state.user.accessToken,
    };
  },
  methods: {
    async getAllTasks(accessToken) {
      try {
        await this.$store.dispatch("getAllTasks", { accessToken });
        this.tasks = this.$store.state.tasks.taskList;
      } catch (err) {
        console.log(err.message);
      }
    },
    addTaskSuccess() {
      this.getAllTasks(this.accessToken);
    },
    deleteTaskSuccess() {
      this.getAllTasks(this.accessToken);
    }
  },
  created() {
    this.getAllTasks(this.accessToken);
  },
};
</script>

<style></style>
