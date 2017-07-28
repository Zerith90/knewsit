"use strict";

require("es6-promise/auto");

import Vue from "vue";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
import Filters from "./core/filters";
import store from "./core/store";
import App from "./core/App";
import Vuetify from 'vuetify'
 import 'vuetify/dist/vuetify.min.css';
import vScroll from 'vue-scroll'
Vue.use(Vuetify)
Vue.use(Filters);
//Vue.http.headers.common['X-CSRF-TOKEN'] = $('input[name="csrf"]').val();
 Vue.use(vScroll) 


let router = require("./core/router").default; // Load only after i18next initialized

new Vue({
	el: "#app",
	components: {
		App
	},
	router,
	store,
	render: h => h("app")
});
	
// });
