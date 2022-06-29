<template>
  <div id="todo">
    <h1 class="title">TODO</h1>
    <TodoInput @addTaskDetailSuccess="addTaskDetailSuccess" :id="id" />
    <TodoList
      :taskDetails="taskDetails"
      :filterActive="filterActive"
      @updateSuccess="updateSuccess"
    />
    <TodoFooter
      @changeFilter="changeFilter"
      :countTaskDetail="countTaskDetail"
    />
  </div>
</template>

<script>
import TodoInput from "./TodoInput/TodoInput.vue";
import TodoList from "./TodoList/TodoList.vue";
import TodoFooter from "./TodoFooter/TodoFooter.vue";
export default {
  components: {
    TodoInput,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      accessToken: this.$store.state.user.accessToken,
      taskDetails: null,
      id: this.$route.params.id,
      filterActive: "all",
      countTaskDetail: 0,
    };
  },
  methods: {
    async getAllTasksDetailByTask(id, accessToken) {
      try {
        await this.$store.dispatch("getAllTasksDetailByTask", {
          id,
          accessToken,
        });
        this.taskDetails = this.$store.state.taskDetails.taskDetailList;
      } catch (err) {
        console.log(err.message);
      }
    },
    addTaskDetailSuccess() {
      this.getAllTasksDetailByTask(this.id, this.accessToken);
    },
    changeFilter(value) {
      this.filterActive = value;
    },
    updateSuccess() {
      this.getAllTasksDetailByTask(this.id, this.accessToken);
    },
  },
  watch: {
    filterActive() {
      if (this.filterActive === "all") {
        this.countTaskDetail = this.taskDetails.length;
      } else {
        this.countTaskDetail = 0;
        this.taskDetails.forEach((item) => {
          if (item.state === this.filterActive) {
            this.countTaskDetail++;
          }
        });
      }
    },
    taskDetails() {
      if (this.filterActive === "all") {
        this.countTaskDetail = this.taskDetails.length;
      }
    },
  },
  created() {
    this.getAllTasksDetailByTask(this.id, this.accessToken);
  },
};
</script>

<style scoped>
#todo {
  min-width: 700px;
  background: transparent;
  padding: 3rem 2rem;
}
.title {
  font-size: 3rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
