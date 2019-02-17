<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="l" id="bearbeitenButton2">
      Bearbeiten
    </b-button>
    <b-modal ref="modal" hide-footer hide-header	v-model="modalShow">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Dein Name:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.name"
              required
              placeholder="Max Mustermann">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Deine Kurzbeschreibung:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.description"
              required
              placeholder="Hier kommt deine Beschreibung...">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Dein Profilbild:">
          <b-form-file
            accept=".jpg, .png, .gif"
            v-model="form.file"
            :state="Boolean(form.file)"
            placeholder="Wähle ein neues Profilbild, zum ändern...">
          </b-form-file>
          </b-form-group>

          <div class="mt-3">
            * Bitte vergiss nicht ein passendes Profilbild in den Formaten JPG, PNG oder GIF hochzuladen
          </div> <br>

          <b-button class="l" type="submit" variant="primary">Bearbeiten</b-button>
          <b-button @click="hideModal" type="reset" variant="danger">Abbrechen</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modalShow: false,
        form: {
          name: this.$store.state.accountData.name,
          description:this.$store.state.accountData.description,
          file:''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('description', this.form.description);
        formData.append('image', this.form.file);
        this.$store.dispatch('updateInstructor' , formData).then(() => {
          //this.$router.push('/dozent');
          this.form.file = '';
          this.$store.dispatch('getInstructorLogData').then((data)=> {
            this.hideModal();
          });
        });
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.beschreibung = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      hideModal(){
        this.$refs.modal.hide();
      }
    }
  }
</script>
<style scoped>
  .l:hover{
    background-color: cornflowerblue;
    color: snow;
    border-color: cornflowerblue;


  }
</style>
