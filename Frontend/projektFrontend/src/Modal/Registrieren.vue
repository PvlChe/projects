<template>
  <div id="app">
    <span @click="modalShow = !modalShow"><slot></slot></span>
    <div class="umriss">
      <b-modal id="modal2" ref="modal" hide-footer hide-header v-model="modalShow">
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
              id="app3"
              label="Deine E-Mail:"
              label-for="reg_email_input">
              <b-form-input
                type="email"
                v-model="form.email"
                required
                placeholder="max.mustermann@yahoo.de">
              </b-form-input>
            </b-form-group>

            <b-form-group
              label="Dein Passwort:"
              label-for="reg_passwort_input">
              <b-form-input
                type="password"
                v-model="form.password"
                required
                placeholder="Passwort">
              </b-form-input>
            </b-form-group>

            <b-form-group>
              <b-form-checkbox-group  required v-model="checked">
                <b-form-checkbox value="me">Hiermit akzeptiere ich die
                  <b-link @click="goAGB">AGB's</b-link>
                  .
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" class="l f2" variant="primary">Registrieren</b-button>
            <b-button class="abbrechenButton" @click="hideModal" type="reset" variant="danger">Abbrechen</b-button>
          </b-form>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<style>
  .f2{
    width: 100%;
    margin-bottom: 2px;
  }

  .abbrechenButton{
   margin-top: 3px;

    margin-left: 38.5%;
    margin-right: auto;
  }



  @media only screen and (max-width: 500px) {

    #regbutton1 {
      font-size: 0.6em;
      width:  140px;
    }
  }
  @media only screen and (max-width: 320px) {
    #regbutton1 {
      font-size: 0.5em;
    }
  }

  #modal2{
    text-align: left;
  }


</style>
<script>
  export default {
    data() {
      return {
        modalShow: false,
        modalRegShow: false,
        form: {
          email: '',
          name: '',
          password: ''
        },
        checked: [],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.$store.dispatch('signUpStudent', {
          email: this.form.email,
          name: this.form.name,
          password: this.form.password
        }).then(() => {

        })
          .catch(err => {
          });

      },
      onReset(evt) {
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
      hideModal() {
        this.$refs.modal.hide();
        this.modalRegShow = true;
      },
      goStudent() {
        this.hideModal();
      },
      goAGB() {
        this.$router.push('/agb');
      }
    }
  }
</script>
