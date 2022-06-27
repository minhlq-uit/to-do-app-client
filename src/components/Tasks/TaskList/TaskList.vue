<template>
  <div id="task-list" class="grid grid-cols-3 gap-4" v-if="tasks">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :nameTask="task.nameTask"
      :desTask="task.description"
      :deadline="task.deadline"
      :id="task.id"
      @deleteTaskSuccess="deleteTaskSuccess"
    />
    <div class="add-task rounded-2xl" @click="toggleModal()">Add Task</div>
  </div>

  <!-- modal add new tasj -->
  <div>
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Add new task</h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <form class="w-full max-w-sm">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="name-task"
                  >
                    Name Task
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="name-task"
                    type="text"
                    v-model="nameTask"
                  />
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="description-task"
                  >
                    Description
                  </label>
                </div>
                <div class="md:w-2/3">
                  <textarea
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="description-task"
                    type="text"
                    v-model="desTask"
                  ></textarea>
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="dealine-task"
                  >
                    Dealine
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="dealine-task"
                    type="datetime-local"
                    v-model="deadline"
                  />
                </div>
              </div>
            </form>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
          >
            <button
              class="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="toggleModal()"
            >
              Close
            </button>
            <button
              class="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="handleSubmitNewTask()"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import TaskItem from "./TaskItem/TaskItem.vue";
export default {
  props: ["tasks"],
  components: {
    TaskItem,
  },
  setup(props, { emit }) {
    const store = useStore();
    const accessToken = store.state.user.accessToken
    const showModal = ref(false);
    const nameTask = ref(null);
    const desTask = ref(null);
    const deadline = ref(null);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const handleSubmitNewTask = async () => {
      toggleModal();
      console.log('deadline', deadline.value)
      try {
        await store.dispatch("createTaskByCurrentUser", {
          nameTask: nameTask.value,
          description: desTask.value,
          deadline: deadline.value + ':00.00Z',
          accessToken,
        });
        emit('addTaskSuccess')
      } catch (err) {
        console.log("err", err.message);
      }
    };
    const deleteTaskSuccess = () => {
      emit('deleteTaskSuccess')
    }

    return {
      showModal,
      nameTask,
      desTask,
      deadline,
      handleSubmitNewTask,
      toggleModal,
      deleteTaskSuccess
    };
  },
};
</script>

<style scoped>
.add-task {
  width: 100%;
  min-height: 50px;
  background: #ffeb94;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-task:hover {
  cursor: pointer;
  font-size: 2rem;
}
</style>
