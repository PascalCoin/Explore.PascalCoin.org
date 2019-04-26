<template>
    <div>
    <social></social>
    <div class="page-header header-filter" :class="`page-header-${cls}`">
        <div class="container">
            <div class="row">
                <div class="col-md-8 ml-auto mr-auto text-center" v-if="!showError">
                    <h1 class="title"><i class="fas fa-spinner fa-spin"></i>Loading {{title}}...</h1>
                    <p>
                        please wait...
                    </p>
                </div>
                <div class="col-md-8 ml-auto mr-auto text-center" v-if="showError">
                    <h1 class="title"><i class="fas fa-cogs"></i>Error..</h1>
                    <p>
                        An error occured...
                    </p>
                </div>
            </div>
        </div>
    </div>
        <div class="section">
            <div class="container">
                <div class="main main-raised">
                    <span v-if="showError" style="color: tomato; font-weight: bold;">{{error}}</span>
                    <span v-if="showError === false">Please wait while we are loading the data.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Social from './Social';

  export default {
    name: 'loading',
    props: ['title', 'cls', 'showError', 'error'],
    components: {
      Social,
    }
  };
</script>

<style scoped lang="scss">

@import "./../assets/settings";
.page-header-account {
    background-color: $pasc-color-account;
}
.page-header-block {
    background-color: $pasc-color-block;
}
.page-header-operation {
    background-color: $pasc-color-operations;
}

</style>
