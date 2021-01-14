const app = new Vue({
    el: '#app',
    data: {
        URL_SERVER: 'http://localhost:3000',
        user: '',
        tasks: [],
        categories: [],
        page: '',
        isUserLogin: false,
        inputLogin: {
            email: '',
            password: ''
        },
        inputRegister: {
            email: '',
            password: ''
        },
        inputNewTask: {
            title: '',
            CategoryId: null
        },
        editTask: {}
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.getAllTask()
                this.page = 'main'
                this.isUserLogin = true
                this.user = localStorage.user
            } else {
                this.page = 'login'
                this.isUserLogin = false
            }
        },
        async login() {
            try {
                let { email, password } = this.inputLogin
                // console.log('>>> inputlogin : ', email, password)

                let URL = this.URL_SERVER + '/user/login'
                let response = await axios.post(URL, {
                    email: email,
                    password: password
                })

                // console.log('>>> berhasil login', response.data)
                localStorage.setItem('access_token', response.data.access_token)
                localStorage.setItem('user', email)
                this.user = localStorage.user

                this.inputLogin.email = ''
                this.inputLogin.password = ''

                this.checkAuth()
                Swal.fire({
                    icon: 'success',
                    title: `You are login using ${email}!`,
                    showConfirmButton: false,
                    timer: 1500
                })

            } catch (err) {
                console.log(err)
            }
        },
        logout() {
            // console.log('logout')

            this.tasks = []
            this.categories = []
            // console.log('>>> task : ', this.tasks)
            // console.log('>>> categories : ', this.categories)

            localStorage.clear()
            this.checkAuth()
            Swal.fire({
                icon: 'success',
                title: 'You are logout !',
                showConfirmButton: false,
                timer: 1500
            })
        },
        async register() {
            try {
                let { email, password } = this.inputRegister
                // console.log('>>> input register', email, password)

                let URL = this.URL_SERVER + '/user/register'
                let response = await axios.post(URL, {
                    email: email,
                    password: password
                })

                // console.log('>>> berhasil ', response.data)
                this.inputRegister.email = ''
                this.inputRegister.password = ''

                this.showLoginPage()

                Swal.fire({
                    icon: 'success',
                    title: `${email} is success registered, please login !`,
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err)

                Swal.fire({
                    icon: 'error',
                    title: err,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        async addNewTask() {
            try {
                let title = this.inputNewTask.title
                let CategoryId = +this.inputNewTask.CategoryId
                console.log('>>> addNewTask', title, CategoryId, typeof CategoryId)

                let data = {
                    title: title,
                    CategoryId: CategoryId
                }

                let URL = this.URL_SERVER + '/task'
                // console.log('>>> URL : ', URL)
                let response = await axios.post(URL, data, {
                    headers: { access_token: localStorage.access_token }
                })

                Swal.fire({
                    icon: 'success',
                    title: `New task : ${title} is Added from ${localStorage.user}!`,
                    showConfirmButton: false,
                    timer: 1500
                })

                this.inputNewTask.title = ''
                this.inputNewTask.CategoryId = ''

                this.checkAuth()

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: err,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        async getAllTask() {
            try {
                let URL = this.URL_SERVER + '/task'
                let response = await axios.get(URL, {
                    headers: { 'access_token': localStorage.access_token }
                })

                // console.log(response.data)
                this.tasks = response.data
                this.categories = response.data.map(category => {
                    return {
                        id: category.id,
                        category: category.category
                    }
                })
                // console.log('>>> task : ')
                // console.log(this.tasks)

                console.log('>>> categories : ')
                console.log(this.categories)
            } catch (err) {
                console.log(err)
            }
        },
        showLoginPage() {
            this.page = 'login'
        },
        showRegisterPage() {
            this.page = 'register'
        },
        showAddNewTaskPage() {
            this.page = 'addTask'
        },
        cancel() {
            this.checkAuth()
        },
        async deleteTask(idTask) {
            try {
                console.log('>>> delete task id', idTask)

                let URL = this.URL_SERVER + `/task/${idTask}`
                console.log(URL)
                let deleteTask = await axios.delete(URL, {
                    headers: { 'access_token': localStorage.access_token }
                })
                console.log(deleteTask)

                this.checkAuth()

                Swal.fire({
                    icon: 'success',
                    title: 'Success deleted!',
                    showConfirmButton: false,
                    timer: 1500
                })

            } catch (err) {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    title: "You don't have permision !",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
        showEditTask(task) {
            // console.log('>>> edit task', task)

            if (localStorage.user !== task.User.email) {

                Swal.fire({
                    icon: 'error',
                    title: "You don't have permision !",
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                this.editTask = task
                console.log('>>> editTask : ', this.editTask)
                this.page = 'editTask'

            }
        },
        async updateTask() {
            try {
                console.log('>>> edit Task', this.editTask)
                let id = this.editTask.id
                let title = this.editTask.title
                let CategoryId = this.editTask.CategoryId

                let URL = this.URL_SERVER + `/task/${id}/${CategoryId}`
                let response = await axios.put(URL, { title }, {
                    headers: { access_token: localStorage.access_token }
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Success updated!',
                    showConfirmButton: false,
                    timer: 1500
                })

                this.checkAuth()
                
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: err,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },
    },
    created() {
        console.log('>>> created')
        this.checkAuth()
    }
})