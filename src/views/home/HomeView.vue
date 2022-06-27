<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script>
import Todo from '@/components/Todo/Todo.vue';
export default {
  name: "HomeView",
  components: {
    Todo
  },
};
</script>
