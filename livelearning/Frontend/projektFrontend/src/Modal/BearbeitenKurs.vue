<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="l">
      Bearbeiten
    </b-button>
    <b-modal ref="modal" hide-footer hide-header v-model="modalShow">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Kursname:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.course"
              required
              placeholder="Java für Anfänger">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Kursbeschreibung:"
            label-for="reg_name_input">
            <b-form-textarea
              type="text"
              v-model="form.description"
              :rows="3"
              required
              placeholder="Alles über Klassen, Methoden und weiteres">
            </b-form-textarea>
          </b-form-group>
          <b-button class="l" type="submit" variant="primary">Bearbeiten</b-button>
          <!--<b-button @click="hideModal" type="reset" variant="danger">Kurs löschen</b-button>-->
          <b-button @click="hideModal" type="reset" variant="danger">Abbrechen</b-button>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>
<script>
  export default {
    props: {
      courseProp: {}
    },
    data() {
      return {
        modalShow: false,
        form: {
          course: this.courseProp.name,
          description: this.courseProp.description,
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        this.$store.dispatch('updateKurs', {
          name: this.form.course,
          description: this.form.description,
          id: this.courseProp._id
        }).then(() => {
        });
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      hideModal() {
        this.$refs.modal.hide();
      },
    }
  }
</script>
