<template>
  <section style="height: calc(100vh - 90px); width: 100vw">
    <div class="container text-center">
      <div class="card">
        <form @submit.prevent="updateTask">
          <h4>Edit Task</h4>
          <div class="input-group my-5">
            <span class="input-group-text">Task</span>
            <textarea
              v-model="editTask.title"
              class="form-control"
              aria-label="With textarea"
              style="height: 100px"
              required
            ></textarea>
          </div>
          <div class="input-group mb-3 my-5">
            <label class="input-group-text" for="inputGroupSelect01"
              >Category</label
            >
            <select
              v-model="editTask.CategoryId"
              class="form-select"
              id="inputGroupSelect01"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.category }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          <button @click="cancel" class="btn btn-danger">Cancel</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TaskEditPage",
  props: ["editTask", "categories"],
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    updateTask() {
      this.$emit("updateTask", this.editTask);
    },
  },
};
</script>

<style>
</style>