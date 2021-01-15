<template>
  <section style="height: calc(100vh - 90px); width: 100vw">
    <div
      class="row flex-row align-items-start justify-content-evenly"
      style="min-height: 100%"
    >
      <div
        v-for="category in tasks"
        :key="category.id"
        class="col-3"
        style="height: 100%"
      >
        <div class="card flex-column shadow" style="height: 100%">
          <div
            class="card-header bg-danger text-center fs-6 fw-bold fst-italic shadow"
            style="border-radius: 20px"
          >
            {{ category.category }}
          </div>
          <div
            v-for="task in category.Tasks"
            class="card-body"
            style="flex-grow: 1"
          >
            <TaskCard
              :task="task"
              @deleteTask="deleteTask"
              @showEditTask="showEditTask"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TaskCard from "./TaskCard";

export default {
  name: "MainPage",
  props: ["tasks"],
  components: {
    TaskCard,
  },
  methods: {
    deleteTask(payload) {
      this.$emit("deleteTask", payload);
    },
    showEditTask(task) {
      this.$emit("showEditTask", task);
    },
  },
};
</script>

<style>
</style>