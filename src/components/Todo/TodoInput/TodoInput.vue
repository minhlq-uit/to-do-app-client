<template>
  <div class="mb-2 todo-input">
    <span
      class="round-custom"
      @click="addNewTaskDetail(c, nameTaskDetail, accessToken)"
      ><i class="fa-solid fa-plus"></i
    ></span>
    <input
      type="text"
      id="todo-input"
      class="input-custom"
      placeholder="Create a new todo..."
      v-model="nameTaskDetail"
      @keyup.enter="addNewTaskDetail(id, nameTaskDetail, accessToken)"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      accessToken: this.$store.state.user.accessToken,
      nameTaskDetail: null,
    };
  },
  methods: {
    async addNewTaskDetail(id, nameTaskDetail, accessToken) {
      try {
        await this.$store.dispatch("createTaskDetail", {
          id,
          nameTaskDetail,
          accessToken,
        });
        this.$emit("addTaskDetailSuccess");
        nameTaskDetail = "";
      } catch (err) {
        console.log("err", err.message);
      }
    },
  },
};
</script>

<style scoped>
.todo-input {
  position: relative;
  background: #ffeb94;
  padding: 1rem;
  border-radius: 1rem;
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
  font-size: 1rem;
  color: #000;
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}
.input-custom {
  width: 100%;
  background: transparent;
  padding: 1rem 2rem 1rem 3rem;
  outline: none;
  border: none;
}
</style>
