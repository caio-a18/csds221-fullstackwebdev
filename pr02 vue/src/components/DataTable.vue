<template>
  <div class="card" id="datatable">
      <div v-for="entry in varFromParent">
      <div class="card">
        <div class = "row">
          <!-- Declares comment elements -->
          <div class="col element">{{entry[0]}}</div>
          <div class="col element">{{entry[1]}}</div>
          <div class="col element">{{entry[2]}}</div>
          <div class="col element">{{entry[3]}}</div>
          <!-- Unchecks boxes -->
          <div v-if="!entry[4]" class="col element">
            <input class="element form-check-input" type="checkbox" @click="createToggle(entry)" value="" id="completeBox">
          </div>
          <!-- Checks boxes -->
          <div v-if="entry[4]" class="col element">
            <input class="element form-check-input" type="checkbox" @click="createToggle(entry)" value="" id="completeBox" checked>
          </div>
          <div class="col" style="padding-top: 2.5%; padding-bottom: 2.5%;">
            <div v-if="!entry[4]" class = "row" id="updateRow">
              <UpdateForm :varFromHeader="[varFromParent, false, entry]" />
            </div>
            <!-- Delete button -->
            <div class = "row">
            <button type="button" class=" btn btn-danger btn-sm tablebtn" @click="deleteEntry(entry)">
                <i class="fa fa-times-circle"></i> 
                DELETE
            </button> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/** Imports UpdateForm */
import UpdateForm from './UpdateForm.vue';
export default {
  name: 'Table',
  components: {
    UpdateForm,
  },
  props: ['varFromParent'],
  data: () => ({
  }),
  methods: {
    /** Creates entries */
    createToggle(entry) {
      for (let i = 0; i < this.varFromParent.length; i++) {
        if(this.varFromParent[i] == entry) {
          this.varFromParent[i][4] = !this.varFromParent[i][4]
          break;
        }
      }
    },
    /** Deletes entries */
    deleteEntry(entry) {
      for (let i = 0; i < this.varFromParent.length; i++) {
        if(this.varFromParent[i] == entry) {
          this.varFromParent.splice(i, 1)
          /** Toastr on bottom right */
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.success("Task sucessfully deleted");
          break;
        }
      }
    }
  }
};
</script>

<!-- Style for .element -->
<style scoped>
.element {
  font-size: 14px;
  padding-top: 1%;
  padding-bottom: 1%;
  margin: auto;
}
</style>
