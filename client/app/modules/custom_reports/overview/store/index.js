
import Vue from "vue"
import {LOAD_REPORT_REQUEST,LOADING} from "./types";
import schema from "../schema"
const state = {
	items:[],
	schema,
	loading:false
};

const mutations = {
	[LOAD_REPORT_REQUEST] (state,models){
		state.items.push(...models)
	},
	[LOADING] (state,models){
		state.loading = !state.loading
	},


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