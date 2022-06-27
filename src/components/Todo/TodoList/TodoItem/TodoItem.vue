<template>
  <div
    class="todo-item"
    v-if="filterActive === 'all' ? true : filterActive === state"
  >
    <span
      class="round-custom"
      @click="toogleCompleted(id, nameTaskDetail, state, accessToken)"
    >
      <i class="fa-solid fa-check" :class="{ active: isCompleted }"></i
    ></span>
    <input
      type="text"
      id="todo-input"
      class="input-custom"
      :value="newNameTask"
      :disabled="!isEditting"
      ref="input"
      @keyup.enter="closeEditting"
    />
    <span class="line" :class="{ active: isCompleted }"></span>
    <i
      class="fa-solid fa-pencil pencil"
      :class="{ active: !isEditting && !isCompleted }"
      @click="onEditting"
    ></i>
    <i
      class="fa-solid fa-check done"
      :class="{ active: isEditting && !isCompleted }"
      @click="closeEditting"
    ></i>
    <i class="fa-solid fa-x btn-delete" :class="{ active: isCompleted }" @click="deleteTaskDetail(id, accessToken)"></i>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { watch } from "vue";

export default {
  props: ["nameTaskDetail", "state", "id", "filterActive"],
  data() {
    return {
      // isCompleted: this.state === "Done",
      isEditting: false,
    };
  },
  methods: {
    onEditting() {
      this.isEditting = true;
      // this.$refs.input.focus()
    },
    closeEditting() {
      this.isEditting = false;
      // this.updateNameTask(this.id, this.newNameTask, this.state, this.accessToken)
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const accessToken = store.state.user.accessToken;
    const isCompleted = ref(props.state === "Done");
    const newNameTask = ref(props.nameTaskDetail)
    const toogleCompleted = async (id, nameTaskDetail, state, accessToken) => {
      try {
        state = state === "ToDo" ? "Done" : "ToDo";
        await store.dispatch("updateTaskDetailById", {
          id,
          nameTaskDetail,
          state,
          accessToken,
        });
        emit("updateSuccess");
        isCompleted.value = props.state;
      } catch (err) {
        console.log("err", err.message);
      }
    };
    const updateNameTask = async (id, nameTaskDetail, state, accessToken) => {
      try {
        // state = state === "ToDo" ? "Done" : "ToDo";
        await store.dispatch("updateTaskDetailById", {
          id,
          nameTaskDetail,
          state,
          accessToken,
        });
        emit("updateSuccess");
        // isCompleted.value = props.state;
      } catch (err) {
        console.log("err", err.message);
      }
    };

    watch(
      () => props.state,
      () => {
        console.log("props state changed");
        isCompleted.value = props.state === "Done";
      }
    );

    const deleteTaskDetail = async (id, accessToken) => {
      try {
        await store.dispatch("deleteTaskDetailById", {id, accessToken})
        emit("updateSuccess")
      } catch(err) {
        console.log('err', err.message)
      }
    }

    return { newNameTask,toogleCompleted, accessToken, isCompleted, deleteTaskDetail, updateNameTask };
  },
};
</script>

<style scoped>
.todo-item {
  position: relative;
  padding: 1rem;
}
.round-custom {
  display: inline-block;
  border: 1px solid #000;
  background: transparent;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
.round-custom i {
  display: none;
  font-size: 1.5rem;
  color: #000;
  position: absolute;
  left: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
}
.round-custom i.active {
  display: inline-block;
}
.input-custom {
  width: 100%;
  background: transparent;
  padding: 1rem 2rem 1rem 3rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
}
.line {
  display: none;
  position: absolute;
  border-top: 1px solid #000;
  top: 50%;
  left: 3.5rem;
  right: 2rem;
}
.line.active {
  display: block;
}
.pencil,
.done {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
}
i {
  display: none;
}
i.active {
  display: inline-block;
}
.btn-delete {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
