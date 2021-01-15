<template>
  <section style="height: calc(100vh - 90px); width: 100vw">
    <div class="container text-center">
      <div class="card">
        <form @submit.prevent="addNewTask">
          <h4>New Task</h4>
          <div class="input-group my-5">
            <span class="input-group-text">New Task</span>
            <textarea
              v-model="inputNewTask.title"
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
              v-model="inputNewTask.CategoryId"
              class="form-select"
              id="inputGroupSelect01"
              required
            >
              <option selected>Choose Category</option>
              <option value="1">backlog</option>
              <option value="2">todo</option>
              <option value="3">doing</option>
              <option value="4">done</option>
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
  name: "TaskAddPage",
  data() {
    return {
      inputNewTask: {
        title: "",
        CategoryId: null,
      },
    };
  },
  methods: {
    addNewTask() {
      this.$emit("addNewTask", this.inputNewTask);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>