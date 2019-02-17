<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="footerButtons">
      Impressum
    </b-button>
    <b-modal hide-header ok-only v-model="modalShow">
      <h1>Impressum</h1>
      <b>Angaben gemäß § 5 TMG</b> <br><br>
      mEducate GmbH <br>
      Luxemburger Str. 10 <br>
      13353 Berlin <br><br>
      <b>Vertreten durch die persönlich haftende Gesellschafter:</b> <br>
      Müslim Aktas <br>
      Cihan Cavusoglu <br>
      Hoan To <br>
      Ibrahim Jawad <br>
      Pavel Bodrov <br>
      Murat Yukari <br><br>
      <b>Geschäftsführer:</b> <br>
      Murat Yukari <br><br>
      <b>Handelsregister:</b> <br>
      HRB 57322 Registergericht: Amtsgericht Berlin
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
<style>
  .footerButtons{
    background-color:#2E2E2E;
    border-color:#2E2E2E;

  }
  .footerButtons:hover{
    color: gray;
    background-color: #2E2E2E;
    border-color: #2E2E2E;
  }
</style>
