"use strict";

import Vue from "vue";
import VueRouter from "vue-router";

import news from "../modules/news";

Vue.use(VueRouter);

export default new VueRouter({
	mode: "hash",
	routes: [
	// {
	// 	name: 'home',
	// 	path: "/",
	// 	component: home
	// },
	{
		name: 'news',
		path: "/",
		component: news
	}]
});