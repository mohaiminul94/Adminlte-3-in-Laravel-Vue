/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform'
window.form= Form;

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import moment from 'moment';

import VueRouter from 'vue-router';
Vue.use(VueRouter)


const routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/developer', component: require('./components/Developer.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default }
  ]


const router = new VueRouter({
    mode: "history",
    routes // short for `routes: routes`
})


Vue.filter('upText', function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
});


Vue.filter('dateFormat', function(created) {
    return moment(created).format('MMMM Do YYYY');
});


import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    thickness:'2px'
});


import Swal from 'sweetalert2';
window.Swal =Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast =Toast;


window.Fire = new Vue();

  


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue'));

// Vue.component('dashboard-component', require('./components/Dashboard.vue'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);



const app = new Vue({
    el: '#app',
    router
});
