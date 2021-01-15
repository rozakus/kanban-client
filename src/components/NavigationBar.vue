<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="height: 80px">
    <div
      class="container"
      style="display: flex; justify-content: space-between"
    >
      <img src="../assets/logo.png" width="80 px" />
      <button v-if="isUserLogin" class="btn btn-sm btn-dark">
        Welcome {{ user }}
      </button>

      <button
        v-if="isUserLogin"
        @click="showAddNewTaskPage"
        class="btn btn-sm btn-primary"
      >
        add New Task
      </button>

      <button
        v-if="isUserLogin"
        @click="logout"
        class="btn btn-sm btn-success shadow"
      >
        logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  props: ["isUserLogin", "user"],
  methods: {
    logout() {
      this.$emit("logout");
    },
    showAddNewTaskPage() {
      this.$emit("showAddNewTaskPage");
    },
  },
};
</script>

<style>
</style>