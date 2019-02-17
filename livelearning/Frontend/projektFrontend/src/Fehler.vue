<template>
  <b-alert show variant="danger">
    <h4 class="alert-heading">Fehler - {{this.$store.state.error.response.status}} !</h4>
    <p>
      Ohhh, deine Anfrage ist falsch, bitte überprüfe dies oder verlass einfach die Seite. Alternativ
      könntest du deinen Rechner aus dem Fenster schmeißen, oder eine andere Plattform benutzen.
      Spaß,
    </p>
    <p>{{this.$store.state.error.response.data.message}}</p>


  </b-alert>
</template>
<script>
  export default {
    created() {
      if(this.$store.state.error.response.data.message === 'jwt expired'){
        this.$store.commit('destroyToken');
      }
    }
  }

</script>
