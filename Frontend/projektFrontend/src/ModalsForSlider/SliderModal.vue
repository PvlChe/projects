<template>
  <b-col>

    <b-img v-b-modal="'myModal' + this.id"
           rounded="circle" blank width="120" height="120"
           blank-color="#777" alt="hex shorthand color"/>

    <b-modal ref="modal" hide-footer :id="'myModal' + this.id" class="modals">
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Einführungsvideo" active>
            <b-embed type="iframe"
                     aspect="16by9"
                     src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                     allowfullscreen
            ></b-embed>
            <b-btn @click="joinCourse">Kurs betreten!</b-btn>
            <b-btn @click="hideModal">Abbrechen</b-btn>
          </b-tab>

          <b-tab title="Einführungstext">
            <p>Hier steht der Einführungstext nochmal.</p>
            <b-btn href="#">Kurs betreten!</b-btn>
            <b-btn @click="hideModal">Abbrechen</b-btn>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-modal>
  </b-col>
</template>

<script>
  import api from '../api/api';
  import axios from 'axios';

  export default {
    methods: {
      hideModal () {
        this.$refs.modal.hide()
      },
      joinCourse () {
        axios.patch(api.takeCourse + this.course._id, {studentId: this.$store.getters.currentUserId}).then((data)=>{
          this.hideModal();
        })
      }
    },
    props: {
      course: Object,
      id: String,
    }
  }
</script>
<style>

  .modals{
    border-width: 3px;
    border-color: black;
  }
</style>
