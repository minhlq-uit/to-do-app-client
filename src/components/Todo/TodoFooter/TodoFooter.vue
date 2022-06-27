<template>
  <div id="todo-footer" class="grid grid-cols-3">
    <div>{{ countTaskDetail }} items left</div>
    <div class="grid grid-cols-3">
      <div
        class="filter-item"
        :class="{ active: filterActive === 'all' }"
        @click="toogleActive('all')"
      >
        All
      </div>
      <div
        class="filter-item"
        :class="{ active: filterActive === 'ToDo' }"
        @click="toogleActive('ToDo')"
      >
        Active
      </div>
      <div
        class="filter-item"
        :class="{ active: filterActive === 'Done' }"
        @click="toogleActive('Done')"
      >
        Completed
      </div>
    </div>
    <div class="text-right">Clear Completed</div>
  </div>
</template>

<script>
export default {
  props: ["countTaskDetail"],
  data() {
    return {
      filterItems: ["all", "ToDo", "Done"],
      filterActive: "all",
    };
  },
  methods: {
    toogleActive: function (value) {
      this.filterActive = value;
      this.$emit("changeFilter", value);
    },
  },
};
</script>

<style>
#todo-footer {
  background: #ffeb94;
  padding: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
.filter-item.active {
  color: blue;
}
</style>
