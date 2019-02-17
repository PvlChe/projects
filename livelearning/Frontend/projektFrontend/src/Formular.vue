<template>
  <div id="app">
  <headerComponent></headerComponent>
  <b-row>
    <b-col>
      <div id ="form1">
        <b-form @submit="onSubmitRegistrieren" @reset="onResetRegistrieren" v-if="show">
          <b-form-group
            label="Dein Name:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="formRegister.name"
              required
              placeholder="Max Mustermann">
            </b-form-input>
          </b-form-group>

          <b-form-group
            id="app3"
            label="Deine E-Mail:"
            label-for="reg_email_input">
            <b-form-input
              type="email"
              v-model="formRegister.email"
              required
              placeholder="max.mustermann@yahoo.de">
            </b-form-input>
          </b-form-group>

         <b-form-group
            label="Dein Passwort:"
            label-for="reg_passwort_input">
            <b-form-input
              type="password"
              v-model="formRegister.password"
              required
              placeholder="Passwort">
            </b-form-input>
         </b-form-group>

          <b-form-group>
            <b-form-checkbox-group v-model="checked">
              <b-form-checkbox value="me">Hiermit akzeptiere ich die <b-link @click="goAGB">AGB's</b-link>.</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button @click="goStudentRegistrieren" type="submit" variant="primary">Registrieren</b-button>
          <b-button @click="hideModalRegistrieren" type="reset" variant="danger">Abbrechen</b-button>
        </b-form>
      </div>
    </b-col>
    <b-col>

      <div id="form2">
        <b-form @submit="onSubmitAnmelden" @reset="onResetAnmelden" v-if="show">
          <b-form-group
            label="Deine E-Mail:">
            <b-form-input
              type="email"
              v-model="formSign.email"
              required
              placeholder="max.mustermann@yahoo.de">
            </b-form-input>
          </b-form-group>

          <b-form-group label="Dein Passwort:">
            <b-form-input
              type="password"
              v-model="formSign.password"
              required
              placeholder="Passwort">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" @click="goStudentAnmelden" variant="primary">Anmelden als Student</b-button>
          <b-button type="submit" @click="goDozentAnmelden" variant="primary">Anmelden als Dozent</b-button>
          <b-button @click="hideModalAnmelden" type="reset" variant="danger">Abbrechen</b-button>
        </b-form>
      </div>
    </b-col>
  </b-row>
    <footerComponent></footerComponent>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modalShow: false,
        modalRegShow: false,
        formRegister: {
          email: '',
          name: '',
          password: ''
        },
        formSign: {
          email: '',
          password: ''
        },
        checked: [],
        show: true
      }
    },
    methods: {
      onSubmitRegistrieren(evt) {
        evt.preventDefault();
        this.$store.dispatch('signUpStudent' , {
          email: this.form.email,
          name: this.form.name,
          password: this.form.password
        }).then(()=> {

        })
          .catch(err => {
            console.log(err);
          });
      },
      onResetRegistrieren(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = '';
        this.form.name = '';
        this.form.password = '';
        this.checked = [];
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      onSubmitAnmelden(evt) {
        evt.preventDefault(); // bootstrapmagic
      },
      onResetAnmelden(evt) {
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
      hideModalRegistrieren(){
        this.$refs.modal.hide();
        this.modalRegShow = true;
      },
      hideModalAnmelden(){
        this.$refs.modal.hide();
      },
      goStudentRegistrieren() {
        this.hideModal();
      },
      goStudentAnmelden() {
        this.$store.dispatch('logInStudent' , {
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          this.$router.push('/student');
        });
      },
      goDozentAnmelden() {
        this.$store.dispatch('logInInstructor' , {
          email: this.form.email,
          password: this.form.password
        }).then(() => {
          this.$router.push('/dozent');
        });
      },
      goAGB() {
        this.$router.push('/agb');
      },
    }
  }
</script>
