<template>
  <div>
    <headerComponent></headerComponent>
    <div id="header1" v-if="this.$store.state.status === null">
      <b-img id="headerbild" src="https://i.imgur.com/Os3VnB4.png" fluid alt="Responsive image"/>
      <h1 id="headerSchrift">Lernen wann immer du willst.</h1>
      <div id="regbutton">
        <registrierenAlsStudent>
          <b-button id="regbutton1">Registrier dich jetzt!
          </b-button>
        </registrierenAlsStudent>
      </div>
    </div>
    <slider-component id="slider" v-if="!this.$store.state.status"></slider-component>

    <div>
      <img id="DozentStartseite" width="100%" src="https://i.imgur.com/Y9fnSXE.jpg" fluid alt="Responsive image"
           v-if="this.$store.state.status === 'instructor'"/>
    </div>
    <div>
      <img id="StudentStartseite" width="100%" src="https://i.imgur.com/ax5g2Rh.jpg" fluid alt="Responsive image"
           v-if="this.$store.state.status === 'student'"/>
    </div>
    <h2 id="unsereKurse">Unsere beliebten Kurse:</h2>
    <div id="indexHeader2">
      <div class="flex">
        <karte v-for="course in startCourses" :course="course" :key="course._id"></karte>
      </div>
    </div>
    <div class="indexHeader3" v-if="!this.$store.state.status">
      <b-jumbotron id="overfooterid2" class="overfooter" header="" lead="Jetzt Student werden">
        <p> Trete Kursen bei und lehre dich weiter </p>
        <registrieren-als-student>
          <b-btn id="f" class="l" variant="primary">Jetzt durchstarten als Student</b-btn>
        </registrieren-als-student>
      </b-jumbotron>
      <b-jumbotron id="overfooterid" class="overfooter" header="" lead="Jetzt Dozent werden">
        <p> Stelle Kurse Online, gebe dein Wissen weiter und verdiene Geld damit</p>
        <registrieren-als-dozent>
          <b-btn id="f" class="l" variant="primary"> Jetzt durchstarten als Dozent</b-btn>
        </registrieren-als-dozent>
      </b-jumbotron>

    </div>
    <footerComponent id="footerStartseite"></footerComponent>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {
      startCourses() {
        return this.$store.getters.startCourses;
      },
    },
    mounted() {
      this.$store.dispatch('getStartCourses').then((data) => {
      })
    }
  }
</script>
<style>
  body {
    width: 100%;
  }

  #headerbild {
    display: block;
  }

  #card {
    padding: 2px;
    margin: 2px;
  }

  #headerbild {
    top: -20px;
    width: 100%;
    display: inline-block;
  }

  #indexHeader2 {
    display: flex;
    height: 100%;
    margin: 0 auto;
    background-color: whitesmoke;
    justify-content: center;
    margin-top: -9px;
  }

  .flex {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;

  }

  #headerSchrift {
    color: whitesmoke;
    position: absolute;
    bottom: 40%;
    left: 10%;
    line-height: 2em;
    font-weight: lighter;
  }

  #header1 {
    position: relative;
    width: 100%;
  }

  #regbutton {
    position: absolute;
    top: 60%;
    left: 30%;

  }
  #unsereKurse{
    display: block;
    text-align: center;
    line-height: 2em;
    font-weight:lighter;
    background-color: whitesmoke;
  }

  #regbutton1 {
    background-color: gainsboro;
    color: black;
    border-color: black;
    transition: all 0.4s;
    width: 300px;
  }

  #regbutton1:hover {
    background-color: cornflowerblue;
    color: white;
    border: 2px solid white;
  }

  #footerStartseite {
    position: relative;
    background-color: #2E2E2E;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media only screen and (max-width: 800px) {

    #headerSchrift {
      font-size: 1.5em;

    }

  }

  @media only screen and (max-width: 530px) {
    #headerSchrift {
      font-size: 0.9em;


    }
    #f{
      width: auto;
    }

    #regbutton {
      margin-bottom: 15px;
    }

    #overfooterid {
      display: block;
      width: 100%;
      margin-top: -70px;
    }

    #overfooterid2 {
      display: block;
      width: 100%;
      padding: 0;

    }

    .overfooter {
      padding: 0;
      margin: 0;
      font-size: 0.7em;
    }

  }

  .indexHeader3 {
    border-top: black;
    border-top-color: black;
    width: 100%;
    height: 300px;
    background-color: snow;

    text-align: center;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  .overfooter {
    width: 49%;
    display: inline-block;
    background-color: snow;
    height: 200px;
  }


</style>
