<template>
  <div>
    <b-img v-b-modal.meineKurseDozent
           rounded="circle" blank width="75" height="75"
           blank-color="#777" alt="hex shorthand color"/>
    <b-form-group label="Meine Kurse"/>
    <b-modal hide-header id="meineKurseStudent">
      Here are the courses! Filtered by ...
    </b-modal>
  </div>
</template>
