<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="l" id="bearbeitenButton">
      Bearbeiten
    </b-button>
    <b-modal ref="modal" hide-footer hide-header v-model="modalShow">
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
            label="Deine E-Mail:"
          >
            <b-form-input
              type="email"
              v-model="form.email"
              required
              placeholder="max.mustermann@yahoo.de">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Dein Passwort:"
          >
            <b-form-input
              type="password"
              v-model="form.password"
              required
              placeholder="Passwort">
            </b-form-input>

          </b-form-group>

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
          name: '',
          email: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        this.$store.dispatch('updateStudent' , {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        }).then(() => {
          this.$router.push('/student');
        });
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.email = '';
        this.form.password = '';
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
<style>
  #bearbeitenButton:hover{
    background-color: cornflowerblue;
    color: snow;
    border-color: cornflowerblue;


  }
</style>
