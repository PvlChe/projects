<template id="lm">
  <div id="app">
    <headerComponent></headerComponent>
    <h2 id="ergebnis">Ergebnisse:</h2>
    <div id="KurseContainer">

      <karte v-for="course in searchCourses" :course="course" :key="course._id"></karte>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import api from './api/api';

  export default {
    name: "Suche",
    data() {
      return {
        searchCourses: []
      }
    },
    mounted() {

      if (this.$route.params.id) {
        axios.get(api.searchCourses + this.$route.params.id).then(res => {
          this.searchCourses = res.data;
        });
      } else {
        axios.get(api.getStartCourses).then(res => {
          this.searchCourses = res.data;
        });
      }
    }
  }
</script>

<style scoped>
  #KurseContainer {
    display: flex;
    flex-flow: row wrap;
    left: 0px;
    right: 0px;
    top: 0px;
    height: 100%;
    padding-top: 1%;
    padding-left: auto;
    padding-right: auto;
    background-color: white;
    justify-content: center;
    bottom: 0;


  }

  #ergebnis{
    display: block;
    text-align: center;
    line-height: 2em;
    font-weight:lighter;
  }

  #app{
    background-color: whitesmoke;
  }

  #lm{
    background: whitesmoke;
  }

  @media only screen and (max-width: 680px) {

    #searchfield{
      width: 70%;
    }
  }
</style>
