<template>
  <div id="app">
    <headerComponent></headerComponent>


    <div id="profilDozent">
      <b-card title="Profil" style="max-width: 100%;" id="card2">
        <b-row>
          <b-col>
            <p>Name: {{ accountData.name }}</p>
            <p>Email: {{ accountData.email }}</p>
            <p>Status: Dozent</p>
            <p>Kurzbeschreibung: {{ accountData.description }} </p>
            <bearbeitenDozent></bearbeitenDozent>
          </b-col>
          <b-col id="ml">
            <b-img v-if="imageExists()" rounded="circle" width="160" height="160"
                   alt="hex shorthand color"
                   class="m-1" :src="accountData.imageURL"></b-img>
            <b-img v-else rounded="circle" width="160" height="160"
                   alt="hex shorthand color"
                   class="m-1" blank blank-color="#777"></b-img>
          </b-col>
        </b-row>
      </b-card>
    </div>

    <div id="containerDozent">
      <b-col>
        <h4 id="h45">Meine Kurse</h4>
        <p v-if="courseData.length===0" class ="white">Erstellen Sie einen Kurs...</p>
        <kursErstellen></kursErstellen>
        <b-list-group-item v-for="(course,index) in courseData"  :key="course._id" class="d-flex justify-content-between align-items-center" >
          {{course.name}}
          <b-button id="kursButton" @click="goKurs(index)">Zum Kurs</b-button>
        </b-list-group-item>
      </b-col>
    </div>

    <div class="indexHeader5">
      <h1>Stellen Sie Kurse Online und helfen Sie Schüler und Studenten durch ihr Leben.</h1>
      <h1></h1>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    computed: {
      accountData(){
        return this.$store.getters.getAccountData;
      },
      courseData() {
        return this.$store.getters.getCourses;
      }
    },
    methods: {
      goKurs(index) {
        this.$router.push('/kurs/' + this.courseData[index]._id);
      },
      imageExists() {
        return (this.accountData.imageURL !== undefined);
      }
    },
    mounted() {
      this.$store.dispatch('getInstructorAllData').then();
    }
  }
</script>
<style scoped>
  #profilDozent{
    width: 100%;
    height: 100%;

  }

  #containerDozent{
    left:0;
    right:0;
    height: 100%;
    background-color: #2E2E2E;

    padding: 2%;
    padding-top: 0%;
  }
  #card2{

    border-color: white;
    background-image: url(https://i.imgur.com/UsC8UsI.png);
    background-repeat: no-repeat;
    background-size: cover;
    width:100%;
    color: #2E2E2E;
    right:0;
    padding-left: 50px;
    border-width: 0px;
    border-radius: 0px;
    padding-right: 50px;
    font-size: 1.2em;
  }

  .m-1{
    float: right;

  }
  #h45{
    padding-top: 10px;

    color: white;
    line-height: 2em;
    font-weight:lighter;
  }

  .indexHeader3{
    border-top: black;
    border-top-color: black;
    width:100%;
    height:100%;
    background-color: snow;
    /*opacity: 0.9;*/
    text-align: center;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .white{
    color: white;
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

    .indexHeader5{
      padding: 60px;
    }



      #ml{
        display: none;
      }

  }

  #kursButton{
    background-color: snow;
    border-color: black;
    color: black;
  }

  #kursButton:hover{
    background-color: cornflowerblue;
    border-color: cornflowerblue;
    color: aliceblue;
  }

</style>





