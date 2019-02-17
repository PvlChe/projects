<template>
  <div id="app">
    <span @click="modalShow = !modalShow"><slot></slot></span>
    <b-modal class="modal-left-align" ref="modal" hide-footer hide-header v-model="modalShow">
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

          <div class="mt-3">Profilbild:</div>
          <b-form-file
            accept=".jpg, .png, .gif"
            v-model="form.file"
            :state="Boolean(form.file)"
            placeholder="Choose a file...">
          </b-form-file>

          <div class="mt-3">Kurzbeschreibung:</div>
          <b-form-textarea
            v-model="form.description"
            placeholder="Enter something"
            :rows="3"
            :max-rows="6">
          </b-form-textarea>

          <b-form-group>
            <b-form-checkbox-group v-model="form.checked">
              <b-form-checkbox  required value="me">Hiermit akzeptiere ich die
                <b-link @click="goAGB">AGB's</b-link>
                .
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <div class="mt-3">
            * Bitte vergiss nicht ein passendes Profilbild in den Formaten JPG, PNG oder GIF hochzuladen
          </div>
          <br>

          <b-button class="l" type="submit" variant="primary">Registrieren</b-button>
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
          email: '',
          name: '',
          password: '',
          file: null,
          description: '',
          checked: []
        },
        modalRegShow: false,
        show: true,
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('email', this.form.email);
        formData.append('password', this.form.password);
        formData.append('description', this.form.description);
        formData.append('image', this.form.file);
        this.$store.dispatch('signUpDozent', formData);
        this.hideModal();
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = '';
        this.form.name = '';
        this.form.password = '';
        this.form.file = null;
        this.form.text = '';
        this.form.description = '';
        this.form.checked = [];
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
      goAGB() {
        this.$router.push('/agb');
      }
    }
  }
</script>
<style scoped>
  .modal-left-align{
    text-align: left;
  }

</style>
