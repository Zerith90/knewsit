import Vue from "vue";
import Vuex from "vuex";

import news from "../modules/news/store";

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {

		news
	}
});