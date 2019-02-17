<template>
  <div id="app">
    <headerComponent></headerComponent>
    <div>
      <div>
        <b-card title="Kurs" style="max-width: 100%;" id="card3">
          <b-row>
            <b-col>
              <p>Name: {{course.name}}</p>
              <p>Dozent: {{instructor.name}}</p>
              <p>Kurzbeschreibung: {{course.description}} </p>
              <p>Kategorie: {{course.category}}</p>
              <bearbeitenKurs @updateCourse="updateCourseData" v-if="isCourseCreator"
                              :courseProp="course"></bearbeitenKurs>
            </b-col>
          </b-row>
        </b-card>
      </div>
      <div id="containerKurs">
        <h4 class="h44">Lektionen</h4>
        <b-col>
          <lektionHinzufuegen
            :courseId="course._id"
            @createLesson="getLessons"
            v-if="isCourseCreator"></lektionHinzufuegen>
          <b-button v-if="isStudentNonOwner" @click="takeCourse" class="l">
            Kurs Beitreten
          </b-button>
          <p v-if="isCourseCreator && lessons.length === 0" class="white">
            Erstellen Sie eine Lektion um Ihr Video hoch zu laden...</p>
          <p v-if="isInstructorNonOwner" class="white">
            Melden Sie sich als Student an um den Kurs zu betreten...</p>
          <b-list-group-item v-for="lesson in lessons" :key="lesson.videoURL"
                             class="d-flex justify-content-between align-items-center">
            {{lesson.title}}
            <span class="instructor-edit-span">
              <i v-if="isCourseCreator" class="fas fa-trash-alt fa-lg" @click="deleteLesson(lesson._id)"></i>
              <lektion-bearbeiten v-if="isCourseCreator" :lesson="lesson" @edit-lesson="getLessons"><i
                class="fas fa-edit fa-lg"></i></lektion-bearbeiten>
              <video-modal :lesson="lesson" :id="lesson._id"
                           v-if="isCourseOwner || isCourseCreator">
                <i class="fas fa-video fa-lg"></i>
              </video-modal>
            </span>
          </b-list-group-item>
        </b-col>
      </div>
    </div>

    <div class="indexHeader4" v-if="isUnregistered">
      <b-jumbotron id="overfooterid2" class="overfooter2" header="" lead="Melde dich an um am Kurs Teilzunehmen!"
                   v-if="isUnregistered">
        <anmeldenModal :student-only="true">
          <b-button id="f" class="l">Anmelden um Kurs zu betreten!
          </b-button>
        </anmeldenModal>
      </b-jumbotron>
      <b-jumbotron id="overfooterid" class="overfooter2" header=""
                   lead="Registrier dich jetzt als Student um am Kurs teilzunehmen!"
                   v-if="isUnregistered">
        <registrierenAlsStudent :button-text="'Registrieren'">
          <b-button id="f" class="l">Kein Account? Registrier dich jetzt!
          </b-button>
        </registrierenAlsStudent>
      </b-jumbotron>
    </div>
    <div class="indexHeader5">
      <h1>Erweiter deinen Horizont durch das Wissen anderer und teile dein Wissen mit deinen Freunden.</h1>
      <h1></h1>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>
<script>
  import axios from 'axios';
  import api from './api/api';
  import RegistrierenAlsDozent from './Modal/RegistrierenAlsDozent';
  import Anmelden from './Modal/Anmelden.vue';
  import Video from './Modal/Video';

  export default {
    components: {
      'registrierenAlsDozentModal': RegistrierenAlsDozent,
      'anmeldenModal': Anmelden,
      'videoModal': Video
    },
    computed: {
      accountData() {
        return this.$store.getters.getAccountData;
      },
      isCourseOwner() {
        return this.courseStatus === 'student-owner';
      },
      isCourseCreator() {
        return this.courseStatus === 'instructor-owner';
      },
      isInstructorNonOwner() {
        return this.courseStatus === 'instructor-non-owner';
      },
      isStudentNonOwner() {
        return this.courseStatus === 'student-non-owner';
      },
      isUnregistered() {
        return this.courseStatus === 'unregistered';
      }
    },
    data() {
      return {
        course: {},
        instructor: {},
        lessons: [],
        courseStatus: {}
      }
    },
    methods: {
      getLessons() {
        axios.get(api.getLessons + this.$route.params.id)
          .then(res => {
            this.lessons = res.data;
            //this.$router.go(0);
          })
      },
      takeCourse() {
        axios.patch(api.takeCourse + this.course._id, {studentId: this.$store.getters.currentUserId}, {
          headers: {
            Authorization: 'Bearer ' + this.$store.state.token
          }
        }).then(() => {
          this.getCourseStatus();
        })
      },
      getCourseStatus() {
        axios.post(api.getCourseStatus + this.$route.params.id, {
          status: this.$store.state.status,
          userId: this.$store.state.userId
        }).then((res) => {
          this.courseStatus = res.data.courseStatus;
        })
      },
      updateCourseData() {
        axios.get(api.getCourse + this.$route.params.id)
          .then(res => {
            this.course = res.data;
            axios.get(api.getInstructor + this.course.instructor)
              .then(instructor => {
                this.instructor = instructor.data;
                this.getLessons();
              })
              .catch(err => {
                console.log(err);
              })
          })
          .catch(err => {
            this.$router.push('/fehler');
          });
      },
      deleteLesson(id) {
        if (confirm("Wollen Sie diese Lektion wirklich löschen?")) {
          axios.delete(api.updateLesson + id, {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.token
            }
          })
            .then(() => {
              this.getLessons();
            });
        }
      },
    },
    mounted() {
      this.$store.dispatch('getCurrentAccountData').then(
      )
        .then(() => {
          this.getCourseStatus();
        });
      this.updateCourseData();
    }
  }
</script>
<style scoped>


  #card3 {
    border-color: white;
    background-image: url(https://i.imgur.com/pa1jAox.jpg);
    width: 100%;
    color: #2E2E2E;
    background-repeat: no-repeat;
    background-size: cover;
    right: 0;
    padding-left: 50px;
    border-width: 0px;
    padding-right: 50px;
    border-radius: 0;
    font-size: 1.2em;
  }

  #containerKurs {
    left: 0;
    right: 0;
    height: 100%;
    background-color: #2E2E2E;

    padding: 2%;
    padding-top: 0%;
    padding-bottom: 50px;
  }

  .indexHeader4 {
    border-top: black;
    border-top-color: black;
    width: 100%;
    background-color: snow;
    text-align: center;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .overfooter2 {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 49%;
    display: inline-block;
    background-color: snow;
    height: 170px;
  }

  .h44 {
    padding-top: 10px;
    padding-left: 50px;
    color: white;
    line-height: 2em;
    font-weight: lighter;
  }

  .indexHeader5 {
    background-image: url(https://i.imgur.com/aA6sBw5.jpg);
    padding:150px;
    color: ghostwhite;
    text-align: center;
  }

  .instructor-edit-span button {
    margin-left: 1rem;
  }

  .instructor-edit-span i {
    margin-left: 1rem;
  }

  span {
    display: inline-block;
  }
  .white {
    color: white;
  }

  @media only screen and (max-width: 530px) {


    #f {
      width: auto;
    }

    h1{
      font-size: 1em;
    }

    .indexHeader5{
      padding: 60px;
    }

  }
</style>
