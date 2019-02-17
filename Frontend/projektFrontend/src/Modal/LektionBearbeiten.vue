<template>
  <span>
    <span @click="modalShow = !modalShow"><slot></slot></span>
    <b-modal ref="modal" hide-footer hide-header v-model="modalShow" no-close-on-esc no-close-on-backdrop>
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Name der Lektion:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.title"
              required
              placeholder="Titel der Lektion">
            </b-form-input>
          </b-form-group>

          <label>Video in mp4:</label>
          <b-form-file
            accept=".mp4"
            v-model="form.file"
            :state="Boolean(form.file)"
            placeholder="Sie können ein neues Video auswählen...">
          </b-form-file>
          <!--herausfinden wie man das beim reset verschwinden lässt-->
          <p v-if="loading">Video wird grade hochgeladen, bitte etwas geduld...</p>
          <b-button  class="l" type="submit" variant="primary"
                    :disabled="loading">Lektion bearbeiten</b-button>
          <b-button @click="resetModal" type="reset" variant="danger" :disabled="loading">Abbrechen</b-button>
        </b-form>
      </div>
    </b-modal>
  </span>
</template>

<script>
  import axios from 'axios'
  import api from '../api/api'

  export default {
    name: "LektionBearbeiten",
    props: {
      lesson:{}
    },
    data() {
      return {
        modalShow: false,
        form: {
          title: this.lesson.title,
          file: null
        },
        show: true,
        loading: false
      }
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
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      submitModal() {
        //evt.preventDefault();
        let formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('video', this.form.file);
        this.loading = true;
        axios.patch(api.updateLesson + this.lesson._id, formData, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
        })
          .then(() => {
            this.$emit('edit-lesson');
            this.loading = false;
            this.$refs.modal.hide();
          });
      },
      resetModal() {
        this.$refs.modal.hide();
      },
    }
  }
</script>

