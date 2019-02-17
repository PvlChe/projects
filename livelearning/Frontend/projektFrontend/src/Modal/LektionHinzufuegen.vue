<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="l">
      Lektion Hinzufügen
    </b-button>
    <b-modal ref="modal" hide-footer hide-header v-model="modalShow" no-close-on-esc no-close-on-backdrop>
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Name der Lektion:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.name"
              required
              placeholder="Titel der Lektion...">
            </b-form-input>
          </b-form-group>


          <label>Video in mp4:</label>
          <b-form-file
            required
            accept=".mp4"
            v-model="form.file"
            :state="Boolean(form.file)"
            ref="fileinput"
            placeholder="Wähle ein Video im .mp4">
          </b-form-file>
          <!--herausfinden wie man das beim reset verschwinden lässt-->
          <p v-if="loading">Video wird grade hochgeladen, bitte etwas geduld...</p>
          <b-button class="l" type="submit" variant="primary" :disabled="loading">Lektion erstellen</b-button>
          <b-button @click="resetModal" type="reset" variant="danger" :disabled="loading">Abbrechen</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import api from '../api/api'

  export default {
    data() {
      return {
        modalShow: false,
        form: {
          name: '',
          description: '',
          file: null
        },
        show: true,
        loading: false
      }
    },
    props: {
      courseId: String,
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        this.submitModal();
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.description = '';
        this.form.file = null;
        this.$refs.fileinput.reset();
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      submitModal() {
        //evt.preventDefault();
        let formData = new FormData();
        formData.append('title', this.form.name);
        formData.append('course', this.courseId);
        formData.append('video', this.form.file);
        this.loading = true;
        axios.post(api.createLesson, formData, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
        })
          .then(() => {
            this.$emit('createLesson');
            this.loading = false;
            this.form.name = '';
            this.form.description = '';
            this.form.file = null;
            this.$refs.fileinput.reset();
            this.$refs.modal.hide();
          });
      },
      resetModal() {
        this.$refs.modal.hide();
      },
    }
  }
</script>
