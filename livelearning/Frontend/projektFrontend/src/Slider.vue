<template>
  <div>

    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                :interval="4000"
                img-width = "1024"
                img-height = "400"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
      <!--Top Music-->
      <b-carousel-slide class="a" img-src="https://i.imgur.com/s470g63.jpg">
        <b-container class="m">
          <b-row>
            <!--Hier kommt Inhalt rein-->
          </b-row>
        </b-container>
      </b-carousel-slide>
      <b-carousel-slide class="a" img-src="https://i.imgur.com/LBppE2p.jpg">
        <b-container class="m">
          <b-row>
            <!--Hier kommt Inhalt rein-->

          </b-row>
        </b-container>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
  import SliderModal from './ModalsForSlider/SliderModal.vue';


  export default {
    components: {
      //Music
      'sliderModal': SliderModal,
    },
    data () {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart (slide) {
        this.sliding = true
      },
      onSlideEnd (slide) {
        this.sliding = false
      }
    }
  }
</script>
<style>


</style>
