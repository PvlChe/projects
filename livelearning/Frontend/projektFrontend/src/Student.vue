<template>
  <div>
    <headerComponent></headerComponent>
    <div id="profilContainer">
      <b-row>
        <b-col>
          <b-card title="Profil" id="card">
            <p>Name: {{startStudent.name}}&nbsp;&nbsp;</p>
            <p>Email: {{startStudent.email}}&nbsp;&nbsp;</p>
            <p>Status: {{this.$store.state.status}}&nbsp;&nbsp;</p>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-col>
    </b-col>
    <div id="container">
      <h4 class="h44">Meine Kurse</h4>
      <div id="meineKurseContainer">
        <karte class="kurs" v-for="course in courseData" :course="course" :key="course._id"></karte>
      </div>
    </div>
    <!--<slider-component></slider-component>-->
    <div class="indexHeader5">
      <h1>Mit Spaß lernen und Noten verbessern.</h1>
      <h1>Mehr verstehen, besser vorbereitet sein – bei Klassenarbeiten, Hausaufgaben und Abschlussprüfungen</h1>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
  import Card from "./card";
  export default {
    components: {Card},
    data () {
      return {
      }
    },
    computed: {
      startStudent() {
        return this.$store.getters.getAccountData;
      },
      courseData() {
        return this.$store.getters.getCourses;
      }
    },
    mounted () {
      this.$store.dispatch('getStudentAllData').then((data)=>{
      })
    }
  }
</script>
<style>
  #card{
    background-image: url(https://i.imgur.com/QDNPT5a.png);
    width:100%;
    color: #2E2E2E;
    margin:0;
    padding-left: 50px;
    border-radius: 0;
    border-width: 0;
    font-size: 1.2em;
  }

  #container{
    left:0;
    right:0;
    height: 100%;
    background-color:#2E2E2E;
  }

  .h44{
    padding-top: 10px;
    padding-left: 50px;
    color: white;
    line-height: 2em;
    font-weight:lighter;
  }

  #meineKurseContainer{
    display: flex;
    flex-flow: row wrap;
    left:0px;
    right:0px;
    top:0px;
    justify-content: center;
    padding-top: 1%;
    padding-left: auto;
    padding-right: auto;
    padding-bottom: 40px;
  }

  .indexHeader5 {
    background-image: url(https://i.imgur.com/aA6sBw5.jpg);

    padding:100px;
    color: ghostwhite;
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    h1{
      font-size: 1em;
    }

    .indexHeader4{
      padding: 60px;
    }
  }

</style>

