<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="footerButtons">
      Support
    </b-button>
    <b-modal hide-header ok-only v-model="modalShow">
      <h1>Support</h1>
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
