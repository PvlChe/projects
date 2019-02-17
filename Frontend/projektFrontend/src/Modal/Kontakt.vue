<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="footerButtons">
      Kontakt
    </b-button>
    <b-modal hide-header	ok-only v-model="modalShow">
      <h1>Kontakt</h1>
      Telefon: 0800 / 440 5500 <br>
      E-Mail: info@meducate.de
    </b-modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        modalShow: false
      }
    }
  }
</script>
