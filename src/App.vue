<template>
  <div>
    <NavigationBar
      :isUserLogin="isUserLogin"
      :user="user"
      @logout="logout"
      @showAddNewTaskPage="showAddNewTaskPage"
    ></NavigationBar>

    <LoginPage
      v-if="page === 'login'"
      @login="login"
      @showRegisterPage="showRegisterPage"
    ></LoginPage>

    <RegisterPage
      v-if="page === 'register'"
      @register="register"
      @showLoginPage="showLoginPage"
    ></RegisterPage>

    <MainPage
      :tasks="tasks"
      @deleteTask="deleteTask"
      @showEditTask="showEditTask"
      v-if="page === 'main'"
    ></MainPage>

    <TaskAddPage
      v-if="page === 'addTask'"
      @cancel="cancel"
      @addNewTask="addNewTask"
    ></TaskAddPage>

    <TaskEditPage
      v-if="page === 'editTask'"
      :editTask="editTask"
      @cancel="cancel"
      @updateTask="updateTask"
    ></TaskEditPage>
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
    // console.log(">>> created");
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
        // console.log(">>> isUserLogin : ", this.isUserLogin);
        this.page = "login";
        this.isUserLogin = false;
      }
    },
    login(payload) {
      // console.log(">>> inputlogin : ", payload);
      let { email, password } = payload;

      let URL = this.URL_SERVER + "/user/login";
      axios
        .post(URL, {
          email: email,
          password: password,
        })
        .then((response) => {
          // console.log(">>> berhasil login", response.data);
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("user", email);

          this.user = localStorage.user;
          this.checkAuth();

          Swal.fire({
            icon: "success",
            title: `You are login using ${email}!`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          // console.log(err);

          Swal.fire({
            icon: "error",
            title: err,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    logout() {
      // console.log('logout')

      this.tasks = [];
      this.categories = [];
      // console.log('>>> task : ', this.tasks)
      // console.log('>>> categories : ', this.categories)

      localStorage.clear();
      // let auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log("User signed out.");
      // });

      this.checkAuth();
      Swal.fire({
        icon: "success",
        title: "You are logout !",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    register(inputRegister) {
      let { email, password } = inputRegister;
      // console.log('>>> input register', email, password)

      let URL = this.URL_SERVER + "/user/register";
      axios
        .post(URL, {
          email: email,
          password: password,
        })
        .then((response) => {
          // console.log('>>> berhasil ', response.data)

          this.showLoginPage();

          Swal.fire({
            icon: "success",
            title: `${email} is success registered, please login !`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          // console.log(err);

          Swal.fire({
            icon: "error",
            title: err,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    addNewTask(inputNewTask) {
      let title = inputNewTask.title;
      let CategoryId = +inputNewTask.CategoryId;
      // console.log(">>> addNewTask", title, CategoryId, typeof CategoryId);

      let data = {
        title: title,
        CategoryId: CategoryId,
      };

      let URL = this.URL_SERVER + "/task";
      // console.log(">>> URL : ", URL);

      axios
        .post(URL, data, {
          headers: { access_token: localStorage.access_token },
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: `New task : ${title} is Added from ${localStorage.user}!`,
            showConfirmButton: false,
            timer: 1500,
          });

          this.checkAuth();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    getAllTask() {
      let URL = this.URL_SERVER + "/task";
      axios
        .get(URL, {
          headers: { access_token: localStorage.access_token },
        })
        .then((response) => {
          // console.log(response.data)
          this.tasks = response.data;
          this.categories = response.data.map((category) => {
            return {
              id: category.id,
              category: category.category,
            };
          });

          // console.log(">>> task : ");
          // console.log(this.tasks);

          // console.log(">>> categories : ");
          // console.log(this.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showLoginPage() {
      this.page = "login";
    },
    showRegisterPage() {
      this.page = "register";
    },
    showAddNewTaskPage() {
      // console.log("show add new task");
      this.page = "addTask";
    },
    cancel() {
      this.checkAuth();
    },
    deleteTask(idTask) {
      // console.log(">>> delete task id", idTask);

      let URL = this.URL_SERVER + `/task/${idTask}`;
      // console.log(URL);

      axios
        .delete(URL, {
          headers: { access_token: localStorage.access_token },
        })
        .then((response) => {
          this.checkAuth();

          Swal.fire({
            icon: "success",
            title: "Success deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        })

        .catch((err) => {
          // console.log(err);
          Swal.fire({
            icon: "error",
            title: "You don't have permision !",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
    showEditTask(task) {
      console.log(">>> edit task", task);

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
    updateTask(editTask) {
      console.log(">>> edit Task", editTask);

      let id = editTask.id;
      let title = editTask.title;
      let CategoryId = editTask.CategoryId;

      let URL = this.URL_SERVER + `/task/${id}/${CategoryId}`;
      console.log(">>> URL : ", URL);
      axios
        .put(
          URL,
          { title },
          {
            headers: { access_token: localStorage.access_token },
          }
        )
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success updated!",
            showConfirmButton: false,
            timer: 1500,
          });

          this.checkAuth();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
  },
};
</script>

<style scoped>
</style>