<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="l">
      Kurs erstellen
    </b-button>
    <b-modal ref="modal" hide-footer hide-header v-model="modalShow">
      <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            label="Kursname:"
            label-for="reg_name_input">
            <b-form-input
              type="text"
              v-model="form.name"
              required
              placeholder="Kursename...">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Category:"
            label-for="reg_description_input">
            <b-form-select v-model="selected" :options="options" required class="mb-3"/>
          </b-form-group>

          <div class="mt-3">Themenbild:</div>
          <b-form-file
            accept=".jpg, .png"
            v-model="form.file"
            :state="Boolean(form.file)"
            required
            placeholder="Wähle ein passendes Kursbild...">
          </b-form-file>
          <!--herausfinden wie man das beim reset verschwinden lässt-->

          <div class="mt-3">Kurzbeschreibung:</div>
          <b-form-textarea
            id="textarea1"
            label="Description:"
            v-model="form.description"
            placeholder="Beschreibung..."
            :rows="3"
            :max-rows="6">
          </b-form-textarea>

          <div class="mt-3">
            * Wichtig: Wir brauchen ein passendes Themenbild zum Kurs in den Formaten JPG oder PNG
          </div><br>

          <b-button class="l" type="submit" variant="primary">Kurs erstellen</b-button>
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
          description: '',
          file: null
        },
        show: true,
        selected: null,
        options: [
          {value: null, text: 'Bitte wählen Sie eine Kategorie aus.'},
          {value: 'Informatik', text: 'Informatik'},
          {value: 'Musik', text: 'Musik'},
          {value: 'Betriebswirtschaftlehre', text: 'Betriebswirtschaftlehre'},
          {value: 'Sport', text: 'Sport'},
          {value: 'Design', text: 'Design'}
        ]
      }
    },
    computed: {
      getInstructor() {
        return this.$store.getters.currentUserId;
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.form.name);
        formData.append('instructor', this.getInstructor);
        formData.append('category', this.selected);
        formData.append('description', this.form.description);
        formData.append('image', this.form.file);

        this.$store.dispatch('createKurs', formData)
          .then(res => {
            this.goKurs(res.data.courseId._id);
          })
          .then((res) => {
          })
          .catch(err => {
            console.log(err);
            this.$router.push('/fehler');
          });


      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.description = '';
        this.form.text = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      },
      hideModal() {
        this.$refs.modal.hide();
      },
      goKurs(id) {

        this.$router.push('/kurs/' + id);
      },
    }
  }
</script>
