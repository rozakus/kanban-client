<template>
        <section style="display: flex; justify-content: flex-end; margin: 50px 0;"
            id="page-register">
            <div class="col-3 card shadow" style="width: 22rem; margin-right: 100px;">
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Register</h2>
                    <form>
                        <label for="emailRegister">Email address</label>
                        <input  type="email" id="emailRegister" class="form-control"
                            placeholder="Email address" required autofocus style="margin: 15px 0px;">

                        <label for="passwordRegister">Password</label>
                        <input  type="password" id="passwordRegister"
                            class="form-control" placeholder="Password" required style="margin: 15px 0px;">

                        <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                        <button  class="w-100 btn btn-lg btn-warning" type="button"
                            id="to-page-login" style="margin: 15px 0px;">Already have an account</button>
                    </form>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    name: "RegisterPage",
};
</script>

<style>
</style>