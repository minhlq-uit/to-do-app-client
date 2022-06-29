<template>
  <div
    class="task-item"
  >
    <div class="max-w-sm rounded rounded-2xl overflow-hidden shadow-lg">
      <router-link :to="{ path: `/task/${id}/task_detail/store`, params: { id: id } }" class="fa-solid fa-user task-icon"></router-link>
      <span class="btn-delete" @click.stop="deleteTaskById(id, accessToken)"><i class="fa-solid fa-x"></i></span>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ nameTask }}</div>
      </div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ desTask }}</div>
      </div>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ deadline }}</div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          class="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >4/8 done</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nameTask", "desTask", "deadline", "id"],
  data() {
    return {
      accessToken: this.$store.state.user.accessToken
    }
  },
  methods: {
    async deleteTaskById(id, accessToken) {
      try {
        await this.$store.dispatch("deleteTaskById", {id, accessToken})
        this.$emit('deleteTaskSuccess')
      } catch (err) {
        console.log('err', err.message)
      }
    }
  },
};
</script>

<style scoped>
.task-item {
  background: #ffeb94;
  border-radius: 1rem;
  position: relative;
}
.task-icon:hover {
  cursor: pointer;
}
.task-icon {
  font-size: 40px;
  color: #fff;
  background: rgba(39, 39, 39, 0.76);
  padding: 0.5rem;
}
.btn-delete {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 8px;
  right: 8px;
  text-align: center;
}
.btn-delete i {
  font-size: 1.5rem;
}
.btn-delete i:hover {
  font-size: 2rem;
}
</style>
