<template>
  <div id="app">
    <headerComponent></headerComponent>
    <b-row>
      <div>
        <b-card style="max-width: 57rem">
          <div class="responsive-video" align="center">
            <iframe width="869" height="489"
                    src="https://www.youtube.com/embed/EDDJQojQzyM?list=PLgZuSc7xewde9zlJjmbLci0w9lV5BbCHE"
                    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
        </b-card>
      </div>
      <div id="streamContainer">
        <b-row>
          <b-col>
            <b-img rounded="circle" blank width="100" height="100"
                   blank-color="#777" alt="hex shorthand color"
                   class="m-1"/>
          </b-col>
          <b-col>
            <b-form-group label="Java Einstieg Tutorial"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-img rounded="circle" blank width="60" height="60"
                   blank-color="#777" alt="hex shorthand color"
                   class="m-1"/>
          </b-col>
          <b-col>
            <b-form-group label="Hoan To"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Sprache: "/>
          </b-col>
          <b-col>
            <b-form-group label="Deutsch"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Beschreibung: "/>
          </b-col>
          <b-col>
            <b-form-group label="..."/>
          </b-col>
        </b-row>
      </div>
    </b-row>
    <div class="indexHeader3">
      <h1>Kontakt</h1>
      <p>Telefon: 0800 / 440 5500</p>
      <p> E-Mail: info@meducate.de</p>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style>
  #streamContainer{

    padding-left: 50px;
    padding-top: 50px;
    text-align: left;

  }
</style>
