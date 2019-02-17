<template id="header">
  <div id="app">

    <b-navbar toggleable="md" type="dark" id="t" class="l">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand @click="goIndex"><img src="../assets/logo2.png" alt="mEducate" width="180px"></b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="l" id="searchfield" type="text" placeholder="Kurs suchen"
                          v-model="searchString"/>
            <b-button size="xs" class="l2 searchbutton" type="submit" @click="goSearch">Suche</b-button>
          </b-nav-form>

        </b-navbar-nav>

        <b-navbar-nav v-if="!loggedIn">
          <anmeldenModal>
            <b-button class="l">
              Anmelden
            </b-button>
          </anmeldenModal>
          <registrierenAlsDozentModal>
            <b-button class="l">
              Dozent werden
            </b-button>
          </registrierenAlsDozentModal>
        </b-navbar-nav>

        <b-navbar-nav v-else>
          <b-button class="l" @click="goMySite">Meine Kurse</b-button>
          <b-button class="l" type="submit" @click="goHome" variant="primary">Abmelden</b-button>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import RegistrierenAlsDozent from '../Modal/RegistrierenAlsDozent';
  import Anmelden from '../Modal/Anmelden.vue';

  export default {
    data() {
      return {
        searchString: ''
      }
    },
    components: {
      'registrierenAlsDozentModal': RegistrierenAlsDozent,
      'anmeldenModal': Anmelden
    },
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      }
    },
    methods: {
      goHome() {
        this.$store.dispatch('destroyToken')
          .then(() => {
            this.$router.push('/');
          })
      },
      goIndex() {
        this.$router.push('/');
      },
      goSearch() {
        this.$router.push({path: `/suche/${this.searchString}`});
      },
      goMySite() {
        if(this.$store.state.status === 'student')
          this.$router.push({path:'/student'});
        if(this.$store.state.status === 'instructor')
          this.$router.push({path:'/dozent'});
      }
    }
  }
</script>
<style>
  #t {
    background-color: #2E2E2E;
    top: 0;
  }

  .searchbutton{
    left:0;
    margin-left: 0;

  }
  #searchfield{
    padding-right: -2px;
    right: -2px;
  }


  .l {
    background-color: white;
    color: black;
    border-color: black;
  }

  .l:hover {
    background-color: cornflowerblue;
  }

  .l2 {
    background-color: crimson;
    border-color: black;
  }

  .l2:hover {
    background-color: crimson;
    border-color: white;
  }

  #searchfield {
    width: 400px;
  }



  @media only screen and (max-width: 980px) {

  #searchfield{
    width: 200px;
  }
  }
  @media only screen and (max-width: 680px) {

    #searchfield{
      width: 75%;

    }
    .searchbutton{
      width: 25%;
    }
    .l{
      width: 100%;
    }
  }
</style>
