import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../api/api'
import {router} from '../main'

Vue.use(Vuex);

if(api.localAPI){
  axios.defaults.baseURL = 'http://localhost:4000';

}else {
  axios.defaults.baseURL = 'https://meducate-backend.herokuapp.com';

}

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    status: localStorage.getItem('status') || null,
    userId: localStorage.getItem('userId') || null,
    accountData: {},
    startCourses: [],
    courses: [],
    error: {}
  },
  mutations: {
    retrieveLogData(state, data) {
      state.token = data.token;
      state.status = data.status;
      state.userId = data.userId;
      state.accountData = data.data;
    },
    destroyToken(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('status');
      localStorage.removeItem('userId');
      state.token = null;
      state.status = null;
      state.userId = null;
      state.accountData = null;
    },
    retrieveStartCourses(state, data) {
      state.startCourses = data;
    },
    retrieveAccountData(state, data) {
      state.accountData = data;
    },
    retrieveCourses(state, data) {
      state.courses = data;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    currentStatus(state) {
      return state.status;
    },
    currentUserId(state) {
      return state.userId;
    },
    startCourses(state) {
      return state.startCourses;
    },
    getAccountData(state) {
      return state.accountData;
    },
    getCourses(state) {
      return state.courses;
    }
  },
  actions: {
    logInStudent(context, credentials) {
      axios.post(api.logInStudent, credentials)
        .then(res => {
          const token = res.data.token;
          const status = res.data.status;
          const userId = res.data.userId;
          localStorage.setItem('token', token);
          localStorage.setItem('status', status);
          localStorage.setItem('userId', userId);
          context.commit('retrieveLogData', res.data);
          router.go(0);
        })
        .catch(err => {
          context.commit('setError', err);
          router.push('/fehler');
        })
    },
    logInInstructor(context, credentials) {
      axios.post(api.logInInstructor, credentials)
        .then(res => {
          const token = res.data.token;
          const status = res.data.status;
          const userId = res.data.userId;
          localStorage.setItem('token', token);
          localStorage.setItem('status', status);
          localStorage.setItem('userId', userId);
          context.commit('retrieveLogData', res.data);
          router.push('/dozent');
        })
        .catch(err => {
          console.log(err);
          context.commit('setError', err);
          router.push('/fehler');
        })
    },
    updateInstructor(context, credentials) {
      axios.patch(api.getInstructorAuth + context.state.userId, credentials, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
        .then(res => {
          context.commit('retrieveAccountData', res.data)
        })
    },
    updateStudent(context, credentials) {
      axios.patch(api.getStudentAuth + context.state.userId, credentials, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
        .then(res => {
          context.commit('retrieveStudentData', res.data)
        })
    },
    updateKurs(context, credentials) {
      axios.patch(api.updateCourse + credentials.id, {name: credentials.name, description: credentials.description}, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
        .then(res => {

          // context.commit('retrieveStudentData', res.data)
        })
    },
    signUpStudent({dispatch, commit}, credentials) {
      axios.post(api.signUpStudent, credentials)
        .then(res => {
          dispatch('logInStudent', credentials);

        })
        .catch(err => {
          console.log(err);
          commit('setError', err);
          router.push('/fehler');
        })
    },
    signUpDozent({dispatch, commit}, credentials) {
      axios.post(api.signUpInstructor, credentials)
        .then(res => {
          dispatch('logInInstructor', {email: res.data.email, password: credentials.get('password')});
        })
        .catch(err => {
          context.commit('setError', err);
          router.push('/fehler');
        })
    },
    destroyToken(context) {
      if (context.getters.loggedIn) {
        context.commit('destroyToken');
      }
    },
    createKurs(context, credentials) {
      return axios.post(api.createCourse, credentials, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
    },
    getStartCourses(context) {
      axios.get(api.getStartCourses + '?limit=8')
        .then(res => {
          context.commit('retrieveStartCourses', res.data);
        });
    },
    getStudentLogData(context) {
      axios.get(api.getStudentAuth + context.state.userId, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
        .then(res => {
          context.commit('retrieveAccountData', res.data);
        }).catch(err => {
        context.commit('setError', err);
        router.push('/fehler');
      })
    },
    getStudentAllData({dispatch, commit, state}) {
      dispatch('getStudentLogData').then(() => {
        axios.get(api.getStudentCourse + state.userId, {
          headers: {
            Authorization: 'Bearer ' + state.token
          }
        })
          .then(res => {
            commit('retrieveCourses', res.data);
          }).catch(err => {
          commit('setError', err);
          router.push('/fehler');
        })
      });
    },
    getInstructorLogData(context) {
      axios.get(api.getInstructorAuth + context.state.userId, {
        headers: {
          Authorization: 'Bearer ' + context.state.token
        }
      })
        .then(res => {
          context.commit('retrieveAccountData', res.data);
        }).catch(err => {
        context.commit('setError', err);
        router.push('/fehler');
      })
    },
    getInstructorAllData({dispatch, commit, state}) {
      dispatch('getInstructorLogData').then(() => {
        axios.get(api.getInstructorCourse + state.userId, {
          headers: {
            Authorization: 'Bearer ' + state.token
          }
        })
          .then(res => {
            commit('retrieveCourses', res.data);
          }).catch(err => {
          commit('setError', err);
          router.push('/fehler');
        })
      });
    },
    getCurrentAccountData({state, dispatch}) {
      if (state.status === 'student') {
        dispatch('getStudentLogData');
      }
      if (state.status === 'instructor') {
        dispatch('getInstructorLogData');
      }
    }
  }
});
