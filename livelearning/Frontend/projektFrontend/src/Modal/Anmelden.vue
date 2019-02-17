<template>
  <div id="app">
    <span @click="modalShow = !modalShow"><slot></slot></span>
    <b-modal id="modal" ref="modal" hide-footer hide-header v-model="modalShow">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Deine E-Mail:"
          >
            <b-form-input
              type="email"
              name="email"
              v-model="form.email"
              v-validate.disable="'required|email'"
              placeholder="max.mustermann@yahoo.de">
            </b-form-input>
            <span>{{ errors.first('email') }}</span>

          </b-form-group>

          <b-form-group
            label="Dein Passwort:"
          >
            <b-form-input
              type="password"
              name="password"
              v-validate.disable="'required'"
              v-model="form.password"
              required
              placeholder="Passwort">
            </b-form-input>
            <span>{{ errors.first('password') }}</span>
          </b-form-group>

          <b-button class="l l3" name="v-student" @click="goStudent" variant="primary">Anmelden als Student</b-button>
          <b-button class="l l3" v-if="!studentOnly" name="v-dozent" @click="goDozent" variant="primary">Anmelden als Dozent</b-button>
          <b-button class="breakbutton" @click="hideModal" type="reset" variant="danger">Abbrechen</b-button>
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
          email: '',
          password: ''
        },
        show: true,
        studentForm: true
      }
    },
    props: {
      studentOnly: {
        type: Boolean,
        required: false,
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault(); // bootstrapmagic
        this.hideModal();

        console.log(evt);
      },
      onReset(evt) {
        evt.preventDefault(); // bootstrapmagic
        /* Reset our form values */
        this.form.email = '';
        this.form.password = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      hideModal() {
        this.$refs.modal.hide();
      },
      goStudent() {
        this.$validator.validate().then(result => {
          if(result) {
            this.$store.dispatch('logInStudent', {
              email: this.form.email,
              password: this.form.password
            });
            this.hideModal();
          }
        });

      },
      goDozent() {
        this.$validator.validate().then(result => {
          if(result) {
            this.$store.dispatch('logInInstructor', {
              email: this.form.email,
              password: this.form.password
            });
            this.hideModal();
          }
        });


      },
    }
  }
</script>
<style>
  #modal{
    text-align: left;
  }

  .l3{
    width: 100%;
    margin-bottom: 2px;
  }

  .breakbutton{
    margin-top: 3px;

    margin-left: 38.5%;
    margin-right: auto;
  }
</style>
