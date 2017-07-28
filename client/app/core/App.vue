<template lang="pug">
	router-view(keep-alive)
</template>
<!-- 		page-header(@sidebar="toggleSideBar")
		section.app-main(md-row)
			sidebar(:miniSidebar="miniSidebar") -->
			

<script>
	import Vue from "vue";

	import PageHeader from "./components/header/index";
	import Sidebar from "./components/sidebar/index";

	import Service from "./service";

	import { mapActions, mapGetters } from "vuex";

	export default {

		/**
		 * Create websocket connection to the root namespace
		 */		
		//mixins: [ MixinsIO() ],

		/**
		 * Load sub-components
		 */
		components: {
			PageHeader,
			Sidebar
		},
	
		/**
		 * Create app data object
		 * 
		 * TODO: move to vuex state
		 */
		data() {
			return {
				// wsReconnecting: false,
				miniSidebar: false
			};
		},

		watch: {

		},

		/**
		 * Socket handlers. Every property is an event handler
		 */
		socket: {

			// events: {
			// 	/**
			// 	 * Send welcome message after connect
			// 	 */
			// 	connect() {
			// 		console.log("Websocket connected to " + this.$socket.nsp);

			// 		if (this.wsReconnecting)
			// 			// Reload browser if connection established after disconnect
			// 			window.location.reload(true);
			// 		else
			// 			this.$socket.emit("welcome", "Hello! " + navigator.userAgent);
			// 	},

			// 	disconnect() {
			// 		console.log("Websocket disconnected from " + this.$socket.nsp);
			// 		this.wsReconnecting = true;
			// 	},

			// 	error(err) {
			// 		console.error("Websocket error!", err);
			// 	}
			// }
		},
		methods: {
			...mapActions("session", [
				"getSessionUser"
			]),
			toggleSideBar(event){
				this.miniSidebar=event;
			},
			update: function(vm) {
				// if (vm == null)
				// 	return;
				
				// let i = vm._watchers.length;
				// while (i--)
				// 	vm._watchers[i].update(true);
				
				// let children = vm.$children;
				// i = children.length;
				// while (i--)
				// 	this.update(children[i]);
			}
		},

		/**
		 * Application created
		 */
		created() {
			console.log("App started!");
			window.app = this;

			// this.getSessionUser();

			// debug
			// window.postService = new Service("posts", this);
			// window.counterService = new Service("counter", this);
			// window.deviceService = new Service("device", this);
			
		}
	};
</script>

// App.vue
<style lang="stylus">
	@import '../../../node_modules/vuetify/src/stylus/settings/_colors'
 
	$theme := {
	  primary: $red.darken-2
	  accent: $red.accent-2
	  secondary: $grey.lighten-1
	  info: $blue.lighten-1
	  warning: $amber.darken-2
	  error: $red.accent-4
	  success: $green.lighten-2
	}
	@import '../../../node_modules/vuetify/src/stylus/main'
</style>
