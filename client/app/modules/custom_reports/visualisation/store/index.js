import Vue from "vue"
import {
	LOADING,
	UPDATE_CHART_META,
	UPDATE_OMEGA,
	UPDATE_REPORT_META
} from "./types";
import schema from "../schema"
const state = {
	chart_meta: null,
	loading: false,
	omega: null,
	report_meta: {},
	schema,
	selected_dimensions:[],
	selected_metrics:[]
};

const mutations = {
	[LOADING](state) {
		state.loading = !state.loading;
	},
	[UPDATE_CHART_META](state, model) {
		// Vue.set(state,'chart_meta',model.data)'

		state.chart_meta = Object.assign({}, state.chart_meta, model.data)
	},
	[UPDATE_REPORT_META](state, model) {
		state.report_meta = model.data
	},
	[UPDATE_OMEGA](state, model) {

		state.omega = model.data
	}
};

import * as getters from "./getters";
import * as actions from "./actions";

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};