<template>
    <section style="height: calc(100vh - 90px); width: 100vw;">
            <div class="row flex-row align-items-start justify-content-evenly" style="min-height: 100%;">

                <div class="col-3" style="height: 100%;">
                    <div class="card flex-column shadow" style="height: 100%;">
                        <div class="card-header bg-danger text-center fs-6 fw-bold fst-italic shadow"
                            style="border-radius: 20px;"> category </div>
                        <div class="card-body" style="flex-grow: 1;">
                            <div class="my-2 card btn-dark bg-dark" style="font-size: 12px;">
                                <div>
                                    <p class="fw-bold fst-italic m-0">ttask</p>
                                    <p class="m-0">by </p>
                                </div>
                                <div class="my-1">
                                    <button  class="btn btn-sm btn-dark bi bi-trash-fill"
                                        style="padding: 2px 5px;">delete</button>
                                    <button class="btn btn-sm btn-dark bi bi-tags-fill"
                                        style="padding: 2px 5px;">edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
</template>

<script>
export default {
    name: 'MainPage'
}
</script>

<style>

</style>