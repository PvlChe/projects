import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {store} from './store/store';
import Startseite from './Startseite.vue';
import Student from './Student.vue';
import Dozent from './Dozent.vue';
import Stream from './Stream';
import Kurs from './Kurs.vue';
import Formular from './Formular.vue';
import Suche from './Suche.vue';
import Header from './TopAndBottom/Header.vue';
import Footer from './TopAndBottom/Footer.vue';
import Slider from './Slider.vue';
import BearbeitenStudent from './Modal/BearbeitenStudent.vue';
import BearbeitenDozent from './Modal/BearbeitenDozent.vue';
import BearbeitenKurs from './Modal/BearbeitenKurs.vue';
import KursErstellen from './Modal/KursErstellen.vue';
import LektionHinzufuegen from './Modal/LektionHinzufuegen.vue';
import LektionBearbeiten from './Modal/LektionBearbeiten';
import AGB from './Modal/AGB.vue';
import Fehler from './Fehler.vue';
import Registrieren from './Modal/Registrieren';
import RegistrierenDozent from './Modal/RegistrierenAlsDozent';
import Karte from './card';


//bootstrap import
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import de from 'vee-validate/dist/locale/de';

//vue css files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Validator } from 'vee-validate';



Vue.component('fehlerComponent', Fehler);
Vue.component('headerComponent', Header);
Vue.component('footerComponent', Footer);
Vue.component('sliderComponent', Slider);
Vue.component('registrierenAlsStudent', Registrieren);
Vue.component('registrierenAlsDozent', RegistrierenDozent);
Vue.component('bearbeitenStudent', BearbeitenStudent);
Vue.component('bearbeitenDozent', BearbeitenDozent);
Vue.component('bearbeitenKurs', BearbeitenKurs);
Vue.component('kursErstellen', KursErstellen);
Vue.component('lektionHinzufuegen', LektionHinzufuegen);
Vue.component('lektionBearbeiten', LektionBearbeiten);
Vue.component('karte', Karte);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Validator.localize('de', de);




const routes = [
  {path: '/', component: Startseite},
  {path: '/student', component: Student},
  {path: '/dozent', component: Dozent},
  {path: '/stream', component: Stream},
  {path: '/kurs/:id', component: Kurs},
  {path: '/formular', component: Formular},
  {path: '/agb', component: AGB},
  {path: '/fehler', component: Fehler},
  {path: '/suche/:id', component: Suche},
  {path: '/suche/', component: Suche}

];

export const router = new VueRouter({
  routes,
  mode: 'history' //deletes the hashtag in the url
});



new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App)
});


