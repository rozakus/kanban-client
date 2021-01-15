<template>
  <div class="my-2 card btn-dark bg-dark" style="font-size: 12px">
    <div>
      <p class="fw-bold fst-italic m-0">{{ task.title }}</p>
      <p class="m-0">by {{ task.User.email }}</p>
    </div>
    <div class="my-1">
      <button
        @click="deleteTask(task.id)"
        class="btn btn-sm btn-dark bi bi-trash-fill"
        style="padding: 2px 5px"
      >
        delete
      </button>
      <button
        class="btn btn-sm btn-dark bi bi-tags-fill"
        style="padding: 2px 5px"
      >
        edit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ['task'],
  methods: {
      deleteTask(id){
          this.$emit("deleteTask", id)
      }
  }
};
</script>

<style>
</style>