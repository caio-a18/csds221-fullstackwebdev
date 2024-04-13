<template>
  <!-- Button for Add -->
  <button v-if="varFromHeader[1]" type="button" class="btn btn-primary float-end shadow btn-sm" data-bs-toggle="modal" data-bs-target="#dialog" @click=clearModal()>
    <i class="fa fa-plus-circle" style="font-size: 14px"></i>
     ADD
  </button>
  <!-- Button for Update -->
  <button v-if="!varFromHeader[1]" type="button" class="btn btn-primary float-end shadow btn-sm" data-bs-toggle="modal" data-bs-target="#dialog" @click=clearModal()>
    <i class="fa fa-edit"></i>
     UPDATE
  </button>

  <div class="modal fade text-dark" id="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="modaltitle">
          </h5>
        </div>

        <div class="modal-body">
          <form>
            <!-- Invalid Title -->
            <div class="form-group" id="titlevalidation">
              <input type="text" class="form-control" id="titleinput" placeholder="Title" required/>
              <div class="invalid-feedback">Invalid Title</div>
            </div>
            <!-- Invalid Description -->
            <div class="form-group" id="restvalidation">
              <input type="text" class="form-control" id="descriptioninput" placeholder="Description" required/>
              <div class="invalid-feedback">Invalid Description</div>
            <!-- Invalid Deadline -->
              <div class="input-group date">
                <input type="date" class="form-control" id="deadlineinput" placeholder="" required/>
                <div class="invalid-feedback">Invalid Deadline</div>
              </div>
            </div>
            <!-- Priority -->
            <div class="row">
              <div class="text-muted d-flex flex-row" style="font-size:14px">Priority</div>
            </div>
            <div id="radio">
              <div class="row">
                <!-- Low -->
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="priorityradio" id="low">
                    <label class="form-check-label" for="low">
                      Low
                    </label>
                  </div>
                </div>
                <!-- Medium -->
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="priorityradio" id="med">
                    <label class="form-check-label" for="medium">
                    Med
                    </label>
                  </div>
                </div>
                <!-- High -->
                <div class="col">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="priorityradio" id="high">
                    <label class="form-check-label" for="high">
                    High
                    </label>
                  </div>
                </div>
              </div>
        </form>
      </div>
        <!-- Footer - Add and Cancel -->
        <div class="modal-footer">
        <button type="button" id="submitbutton" class="btn btn-primary btn-sm" @click="submit()">
          <i class="fa fa-plus-circle" style="font-size: 14px"></i> Add
        </button>
        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal"><i class="fa fa-ban" ></i> Cancel</button>
      </div>
    </div>
  </div>
</template>

<!-- Exports default -->
<script>
export default {
  name: 'UpdateForm',
  props: ['varFromHeader'],
  data: () => ({
    isAdd: false,
  }),
  methods: {
    /** Clear */
    clearModal() {
      if (this.varFromHeader[1]) {
        document.getElementById('titleinput').style.display = 'block';
        document.getElementById('titleinput').value="";
        document.getElementById('modaltitle').innerHTML = '<i class="fa fa-plus-circle" style="font-size: 14px"></i> Add Task';
        document.getElementById('descriptioninput').value="";
        document.getElementById('deadlineinput').value="";
        document.getElementById('low').checked = false;
        document.getElementById('med').checked = false;
        document.getElementById('high').checked = false;
        document.getElementById('submitbutton').innerHTML = '<i class="fa fa-plus-circle" style="font-size: 14px"></i> ADD';
      }
      else if(!this.varFromHeader[1]) {
        let entry = this.varFromHeader[2]
        document.getElementById('titleinput').style.display = 'none';
        document.getElementById('titleinput').value=entry[0];
        document.getElementById('modaltitle').innerHTML = '<i class="fa fa-edit" style="font-size: 14px"></i> Edit Task';
        document.getElementById('descriptioninput').value=entry[1];
        document.getElementById('deadlineinput').value=entry[2]
        if(entry[3] == "low") {
          document.getElementById('low').checked=true;
        }
        else if(entry[3] == "med") {
          document.getElementById('med').checked=true;
        }
        else {
          document.getElementById('high').checked=true;
        }
        document.getElementById('submitbutton').innerHTML = '<i class="fa fa-edit" style="font-size: 14px"></i> EDIT';
      }
      document.getElementById('restvalidation').classList.remove("was-validated");
      document.getElementById('titleinput').classList.remove("is-valid");
      document.getElementById('titleinput').classList.remove("is-invalid");
    },
    /** Submit */
    submit() {
      /** Checks if valid */
      this.isAdd = document.getElementById('modaltitle').innerHTML.indexOf("Add") > -1
      let titleValue = document.getElementById('titleinput').value;
      let descriptionValue = document.getElementById('descriptioninput').value;
      let dateValue = $("#deadlineinput").val();
      let formatOfDate = moment(dateValue).format("MM/DD/YYYY");
      let validTitle = true;
      if (this.isAdd) {
        for (let i = 0; i < this.varFromHeader[0].length; i++) {
          if(this.varFromHeader[0][i][0] == titleValue || titleValue == "") {
            validTitle = false;
            break;
          }
        }
      }
      /** Radio */
      let radioID = ["low", "med", "high"]
      let priorityValue = "";
      for (let i = 0; i < radioID.length; i++) {
          if(document.getElementById(radioID[i]).checked) {
          priorityValue = radioID[i];
          break;
        }
      }
      document.getElementById('restvalidation').classList.add("was-validated");
      /** Not valid title */
      if(!validTitle) {
        document.getElementById('titleinput').classList.remove("is-valid");
        document.getElementById('titleinput').classList.add("is-invalid");
      }
      /** Valid title */
      else {
        document.getElementById('titleinput').classList.remove("is-invalid");
        document.getElementById('titleinput').classList.add("is-valid");
      }
      if (validTitle && descriptionValue != "" && dateValue != "" && priorityValue != "") {
        var newEntry = [titleValue, descriptionValue, formatOfDate, priorityValue, false]
        /* Toastr on bottom right for added task */
        if (this.isAdd) {
          this.varFromHeader[0].push(newEntry)
          toastr.options.positionClass = 'toast-bottom-right';
          toastr.success("Task sucessfully added")
        }
        /* Toastr on bottom right for updated task */
        else {
          for (let i = 0; i < this.varFromHeader[0].length; i++) {
            if(this.varFromHeader[0][i][0] == titleValue) {
              this.varFromHeader[0][i] = newEntry
              toastr.options.positionClass = 'toast-bottom-right';
              toastr.success("Task was updated successfully")
              break;
            }
          } 
        }
        this.$emit('newList', {
          data: this.varFromHeader[0]
        })
        $('.modal').modal('hide');
      }
    }
  }
};
</script>

<!-- style to .modal and .invalid-feedback -->
<style scoped>
.modal {
  margin: auto;
}
.invalid-feedback {
  font-size: 12px;
  text-align: left;
  padding-top: 0;
}

</style>
