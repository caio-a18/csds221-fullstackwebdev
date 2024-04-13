<template>
  <div class="card text-white bg-primary" id="banner">
    <div class="card-body">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <!-- FRAMEWORKS Title with bars-->
          <i class="fa fa-bars" style="font-size: 16.5px"></i>
          FRAMEWORKS
        </div>
        <div class="col">
          <UpdateForm :varFromHeader="[varFromParent, true]" ; />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/** Imports UpdateForm */
import UpdateForm from './UpdateForm.vue';
export default {
  name: 'Header',
  components: {
    UpdateForm,
  },
  props: ['varFromParent'],
  data: () => ({}),
};
</script>

<!-- Style for banner-->
<style scoped>
#banner {
  position: relative;
  background-color: #112b47;
}
</style>
