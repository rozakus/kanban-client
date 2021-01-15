<template>
  <div>
    <NavigationBar></NavigationBar>
    <LoginPage v-if="page === 'login'"></LoginPage>
    <RegisterPage v-if="page === 'register'"></RegisterPage>
    <MainPage v-if="page === 'main'"></MainPage>
    <TaskAddPage v-if="page === 'addTask'"></TaskAddPage>
    <TaskEditPage v-if="page === 'editTask'"></TaskEditPage>
  </div>
</template>

<script>

// Component
import NavigationBar from "./components/NavigationBar.vue"
import RegisterPage from "./components/RegisterPage.vue"
import LoginPage from './components/LoginPage.vue'
import MainPage from './components/MainPage.vue'
import TaskAddPage from './components/TaskAddPage.vue'
import TaskEditPage from './components/TaskEditPage.vue'

// export
export default {
  name: "App",
  data() {
    return {
      page: 'login'
    };
  },
  components: {
    NavigationBar,
    RegisterPage,
    LoginPage,
    MainPage,
    TaskAddPage,
    TaskEditPage
  },
};
</script>

<style scoped>
</style>