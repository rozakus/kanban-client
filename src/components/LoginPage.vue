<template>
  <section style="display: flex; justify-content: flex-end; margin: 50px 0;"
            id="page-login">
            <div class="col-3 card shadow" style="width: 22rem; margin-right: 100px;">
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Login</h2>
                    <form>
                        <label for="emailLogin">Email address</label>
                        <input type="email" id="emailLogin" class="form-control"
                            placeholder="Email address" required autofocus style="margin: 15px 0px;">

                        <label for="passwordLogin">Password</label>
                        <input type="password" id="passwordLogin" class="form-control"
                            placeholder="Password" required style="margin: 15px 0px;">

                        <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                        <button class="w-100 btn btn-lg btn-danger" type="button"
                            id="to-page-register" style="margin: 15px 0px;">Register an Account</button>
                    </form>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    name: 'LoginPage'
}
</script>

<style>

</style>