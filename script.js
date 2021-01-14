const app = new Vue({
    el: '#app',
    data: {
        URL_SERVER: 'http://localhost:3000',
        task: [],
        category: [],
        isUserLogin: false,
        loginPage: true,
        inputLogin: {
            email: '',
            password: ''
        },
        inputRegister: {
            email: '',
            password: ''
        }
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.getAllTask()
                this.isUserLogin = true
            } else {
                this.isUserLogin = false
            }
        },
        async login() {
            try {
                let { email, password } = this.inputLogin
                console.log('>>> inputlogin : ', email, password)

                let URL = this.URL_SERVER + '/user/login'
                let response = await axios.post(URL, {
                    email: email,
                    password: password
                })

                console.log('>>> berhasil login', response.data)
                localStorage.setItem('access_token', response.data.access_token)

                this.inputLogin.email = ''
                this.inputLogin.password = ''

                this.checkAuth()
            } catch (err) {
                console.log(err)
            }
        },
        logout() {
            console.log('logout')

            this.task = []
            // console.log('>>> task : ', this.task)

            localStorage.clear()
            this.checkAuth()
        },
        async register() {
            try {
                let { email, password } = this.inputRegister
                console.log('>>> input register', email, password)

                let URL = this.URL_SERVER + '/user/register'
                let response = await axios.post(URL, {
                    email: email,
                    password: password
                })

                console.log('>>> berhasil ', response.data)
                this.inputRegister.email = ''
                this.inputRegister.password = ''

                this.showLoginPage()
            } catch (err) {
                console.log(err)
            }
        },
        async getAllTask() {
            try {
                let URL = this.URL_SERVER + '/task'
                let response = await axios.get(URL, {
                    headers: { 'access_token': localStorage.access_token }
                })

                // console.log(response.data)
                this.task = response.data
                // console.log('>>> task : ', this.task)
            } catch (err) {
                console.log(err)
            }
        },
        showLoginPage() {
            this.loginPage = true
        },
        showRegisterPage() {
            this.loginPage = false
        }
    },
    created() {
        console.log('>>> created')
        this.checkAuth()
    }
})