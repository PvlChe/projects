<template id="footer">
  <b-navbar toggleable="md" type="dark" id="e">
    <b-container>
      <b-row >
        <b-col cols="2.5"><impressumModal></impressumModal></b-col>
        <b-col cols="2.5" ><kontaktModal></kontaktModal></b-col>
        <b-col cols="2.5" ><ueberUnsModal ></ueberUnsModal></b-col>
        <b-col cols="2.5"><supportModal ></supportModal></b-col>
      </b-row>
    </b-container>
  </b-navbar>
</template>

<script>
  import Impressum from '../Modal/Impressum.vue';
  import UeberUns from '../Modal/UeberUns.vue';
  import Support from '../Modal/Support.vue';
  import Kontakt from '../Modal/Kontakt.vue';
  export default {
    components: {
      'impressumModal': Impressum,
      'ueberUnsModal': UeberUns,
      'kontaktModal': Kontakt,
      'supportModal': Support
    }
  }
</script>
<style>

  #e{
    background-color: #2E2E2E;
    position: relative;
    left:0;
    right:0;
  }
</style>
