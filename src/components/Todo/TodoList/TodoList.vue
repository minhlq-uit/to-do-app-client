<template>
  <div id="todo-list" class="mt-8">
    <TodoItem v-for="task in taskDetails" :key="task.id" :nameTaskDetail="task.nameTaskDetail" :state="task.state" :id="task.id" :filterActive="filterActive" @updateSuccess="$emit('updateSuccess')"/>
  </div>
</template>

<script>
import TodoItem from "./TodoItem/TodoItem.vue";

export default {
  props: ["taskDetails", "filterActive"],
  components: {
    TodoItem,
  },
};
</script>

<style scoped>
#todo-list {
    background: #ffeb94;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}
</style>
