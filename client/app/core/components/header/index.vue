<template lang="pug">
	md-whiteframe
		md-toolbar.bg-grey-100()
			div.md-toolbar-container
				md-button.md-icon-button(@click.native="toggleLeft($event)")
					i.material-icons.color-indigo-900 menu
				//- md-button.md-icon-button( @click.native="$router.push('/home')" ,to='/home' md-align="center")
				//- 	i.material-icons home
				//- form(style="flex: 0.4") 
				//- 	md-input-container(md-inline)
				//- 		md-input.input-focus( id ="search",placeholder="Search", @keyup.enter.native="init_search()", v-model="q")
				//- md-menu()
				//- 	md-button(md-menu-trigger) Menu
				//- 	md-menu-content
				//- 		router-link.md-button(v-for="list in menuBar" tag="md-menu-item", :to="list.link"  @click.native="$router.push(list.link)")
				//- 			a {{list.name}}
			
</template>

<script>
	import Logo from "./logo";
	import SearchBox from "./search-box";
	import UserBox from "./user-box";
	import {
	    mapGetters,
	    mapActions
	} from "vuex";
	export default {
		components: {
			Logo,
			SearchBox,
			UserBox
		},
		computed:{
			...mapGetters("session", [
			]),
		},
		data(){
			return{
				miniSidebar:false
			}
		},
		methods:{
			...mapActions("session", [
				"searching",
				"initSearch"
			]),
			toggleLeft(event) {
				this.miniSidebar=!this.miniSidebar
				this.$emit('sidebar',this.miniSidebar)
		    },
		    init_search(){
		    	this.initSearch()
		    	this.$router.push({name:'search',params:{q:this.q}})
		    }

		},
		props: [
			"toggleSidebar"
		]

	};
	
</script>

<style lang="sass">
	.bg-grey-100 {
    	background-color: #fff !important;
	}
</style>