<template>
  <div>
    <NavigationBar :isUserLogin="isUserLogin"></NavigationBar>

    <LoginPage
      v-if="page === 'login'"
      @login="login"
    ></LoginPage>

    <RegisterPage v-if="page === 'register'"></RegisterPage>

    <MainPage v-if="page === 'main'"></MainPage>

    <TaskAddPage v-if="page === 'addTask'"></TaskAddPage>

    <TaskEditPage v-if="page === 'editTask'"></TaskEditPage>
  </div>
</template>

<script>
// lib
import axios from "axios";

// Component
import NavigationBar from "./components/NavigationBar.vue";
import RegisterPage from "./components/RegisterPage.vue";
import LoginPage from "./components/LoginPage.vue";
import MainPage from "./components/MainPage.vue";
import TaskAddPage from "./components/TaskAddPage.vue";
import TaskEditPage from "./components/TaskEditPage.vue";

// export
export default {
  name: "App",
  data() {
    return {
      URL_SERVER: "http://localhost:3000",
      user: "",
      tasks: [],
      categories: [],
      page: "",
      isUserLogin: false,
      // inputLogin: {
      //   email: "",
      //   password: "",
      // },
      inputRegister: {
        email: "",
        password: "",
      },
      inputNewTask: {
        title: "",
        CategoryId: null,
      },
      editTask: {},
    };
  },
  components: {
    NavigationBar,
    RegisterPage,
    LoginPage,
    MainPage,
    TaskAddPage,
    TaskEditPage,
  },
  created() {
    console.log(">>> created");
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.getAllTask();
        this.page = "main";
        this.isUserLogin = true;
        this.user = localStorage.user;
      } else {
        console.log(">>> isUserLogin : ", this.isUserLogin);
        this.page = "login";
        this.isUserLogin = false;
      }
    },
    async login(payload) {
      try {
        // let { email, password } = this.inputLogin;
        console.log(">>> inputlogin : ", payload);

        // let URL = this.URL_SERVER + "/user/login";
        // let response = await axios.post(URL, {
        //   email: email,
        //   password: password,
        // });

        // console.log('>>> berhasil login', response.data)
        // localStorage.setItem("access_token", response.data.access_token);
        // localStorage.setItem("user", email);
        // this.user = localStorage.user;

        // this.inputLogin.email = "";
        // this.inputLogin.password = "";

        // this.checkAuth();
        // Swal.fire({
        //   icon: "success",
        //   title: `You are login using ${email}!`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      } catch (err) {
        console.log(err);
      }
    },
    logout() {
      // console.log('logout')

      this.tasks = [];
      this.categories = [];
      // console.log('>>> task : ', this.tasks)
      // console.log('>>> categories : ', this.categories)

      localStorage.clear();
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log("User signed out.");
      });

      this.checkAuth();
      Swal.fire({
        icon: "success",
        title: "You are logout !",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    async getAllTask() {
      try {
        let URL = this.URL_SERVER + "/task";
        let response = await axios.get(URL, {
          headers: { access_token: localStorage.access_token },
        });

        // console.log(response.data)
        this.tasks = response.data;
        this.categories = response.data.map((category) => {
          return {
            id: category.id,
            category: category.category,
          };
        });
        // console.log('>>> task : ')
        // console.log(this.tasks)

        // console.log('>>> categories : ')
        // console.log(this.categories)
      } catch (err) {
        console.log(err);
      }
    },
    showLoginPage() {
      this.page = "login";
    },
    showRegisterPage() {
      this.page = "register";
    },
    showAddNewTaskPage() {
      this.page = "addTask";
    },
    cancel() {
      this.checkAuth();
    },
    async deleteTask(idTask) {
      try {
        console.log(">>> delete task id", idTask);

        let URL = this.URL_SERVER + `/task/${idTask}`;
        console.log(URL);
        let deleteTask = await axios.delete(URL, {
          headers: { access_token: localStorage.access_token },
        });
        console.log(deleteTask);

        this.checkAuth();

        Swal.fire({
          icon: "success",
          title: "Success deleted!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "You don't have permision !",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    showEditTask(task) {
      // console.log('>>> edit task', task)

      if (localStorage.user !== task.User.email) {
        Swal.fire({
          icon: "error",
          title: "You don't have permision !",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.editTask = task;
        console.log(">>> editTask : ", this.editTask);
        this.page = "editTask";
      }
    },
  },
};
</script>

<style scoped>
</style>