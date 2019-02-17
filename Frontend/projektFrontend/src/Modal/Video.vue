<template>
  <span>
    <span @click="modalShow = !modalShow"><slot></slot></span>
    <b-modal size="lg" ref="modal" v-model="modalShow" hide-footer hide-header no-close-on-esc no-close-on-backdrop>
      <h2>{{lesson.title}}</h2>
      <video :id="id" width="100%" controls controlsList="nodownload" webkitallowfullscreen mozallowfullscreen
             allowfullscreen>
        <source :src="lesson.videoURL" type="video/mp4">
      </video>
      <b-button class ="l" @click="hideModal" variant="primary">Schließen</b-button>
    </b-modal>
  </span>
</template>
<script>
  export default {
    data() {
      return {
        modalShow: false
      }
    },
    props: {
      lesson: {},
      id: {}
    },
    methods: {
      hideModal() {
        const vid = document.getElementById(this.id.toString());
        vid.pause();
        this.$refs.modal.hide();
      },
    }
  }
</script>
<style scoped>

  h2{
    text-align: center;
  }
</style>
