<template>
  <b-card :title="course.name" :img-src="course.imageURL"
          img-alt="Bild"
          img-top
          tag="article"
          class="cardd"
          style="width: 300px; height: 420px"
  >
    <p class="card-text">{{course.description}}</p>
    <b-button @click="goToCourse" class="l" variant="primary">Zum Kurs</b-button>
  </b-card>
</template>
<script>
  export default {
    name: "card",
    props: {
      course: {}
    },
    methods: {
      goToCourse() {
        this.$router.push({path: `/kurs/${this.course._id}`});
      }
    }
  }
</script>

<style scoped>

  img {
    height: 200px;
    width: 298px;
  }

  p {
    /*width: 260px;*/
    max-height:95px;
    overflow: hidden;
  }

  b-card {
  }

  .kurs {
    margin: 2px;
    margin-top: -2px;

  }


  .l{
    width: 255px;
    bottom: 15px;
    position: absolute;
  }

  .l:hover{
    background-color: crimson;
    border-color: white;
    color: snow;
  }

  .cardd{
    margin: 3px;

  }


</style>
