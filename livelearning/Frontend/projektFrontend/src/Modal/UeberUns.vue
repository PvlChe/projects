<template>
  <div id="app">
    <b-button @click="modalShow = !modalShow" class="footerButtons">
      Über uns
    </b-button>
    <b-modal hide-header ok-only v-model="modalShow">
      <h1>Über uns</h1>
      mEducate ist ein Start-Up Unternehmen von sechs Berliner Studenten, das im Rahmen eines Projekts während Ihres Informatikstudiums im Jahr 2018 entstanden ist. Ziel der E-Learning-Website ist es, dass ein Jeder, der lernen oder auch lehren möchte, dies einfach und unkompliziert über unsere Lern- / Lehrplattform machen kann. Wir bieten Bildung und Wissen in allen nur möglichen Bereichen und Themen an, sodass für jeden etwas dabei ist.
      Wir glauben daran, dass wissen Macht ist und möchten es deshalb jedermann zugänglich machen! <br><br>

      <b>Gründungsmitglieder</b><br>
      Pavel Bodrov <br>
      Murat Yukari <br>
      Müslim Aktas <br>Ibrahim Jawad <br>
      Hoan To <br>
      Cihan Cavusoglu
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
