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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ref, watch, watchEffect } from "vue";
export default {
  components: {
    TodoInput,
    TodoList,
    TodoFooter,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const accessToken = store.state.user.accessToken;
    const taskDetails = ref(null);

    const id = route.params.id;

    const getAllTasksDetailByTask = async (id, accessToken) => {
      try {
        await store.dispatch("getAllTasksDetailByTask", { id, accessToken });
        taskDetails.value = store.state.taskDetails.taskDetailList;
      } catch (err) {
        console.log(err.message);
      }
    };
    watch(taskDetails, () => {
      console.log("taskDetails", taskDetails.value);
    });
    watchEffect(() => getAllTasksDetailByTask(id, accessToken));

    const addTaskDetailSuccess = () => {
      getAllTasksDetailByTask(id, accessToken);
    };

    const filterActive = ref("all");
    const countTaskDetail = ref(
      taskDetails.value ? taskDetails.value.length : 0
    );

    watch(
      () => taskDetails.value,
      () => {
        if (filterActive.value === "all") {
          countTaskDetail.value = taskDetails.value.length;
        }
      }
    );

    watch(
      () => filterActive.value,
      () => {
        if (filterActive.value === "all") {
          countTaskDetail.value = taskDetails.value.length;
        } else {
          countTaskDetail.value = 0;
          taskDetails.value.forEach((item) => {
            if (item.state === filterActive.value) {
              countTaskDetail.value++;
            }
          });
        }
      }
    );

    const changeFilter = (value) => {
      filterActive.value = value;
    };

    const updateSuccess = () => {
      getAllTasksDetailByTask(id, accessToken);
    };

    return {
      taskDetails,
      addTaskDetailSuccess,
      id,
      filterActive,
      changeFilter,
      updateSuccess,
      countTaskDetail,
    };
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
