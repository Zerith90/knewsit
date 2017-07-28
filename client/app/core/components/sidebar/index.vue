<template lang="pug">
	md-sidenav.md-left(ref="leftSideNav")
		md-list
			md-list-item(v-for="items in menu",:href="items.link",:class="{'color-indigo-500':items.selected}")
				md-icon {{items.icon}}
				span {{items.name}}
</template>

<script>

	export default {
		props: [
			"miniSidebar"
		],
		watch:{
			miniSidebar(){
				 this.$refs.leftSideNav.toggle();
			},
			'$route'(nv){
				this.menu = this.menu.map(v=>{
					v.selected=false
					if(v.link == nv.path) v.selected=true;
					return v;
				})
			}
		},
		data(){
			return{
				menu:[{
					name:'Home',
					link:"#/home",
					selected:true,
					icon:'home'
				},{
					name:'Custom Reports',
					link:"#/custom-reports",
					selected:false,
					icon:'assessment'
				}]
			}
		},
		methods:{
		},
		created(){
			setTimeout(()=>{
				this.$refs.leftSideNav.open();
			})
		}
	};
	
</script>

<style lang="sass">
	.md-sidenav-content{
		top:66px !important;
		box-shadow:none !important;
		width:250px !important;
	}
	.md-backdrop.md-sidenav-backdrop{
		opacity:0 !important;
		display:none
	}
	/*li.md-list-item:hover{
		background:;
	}*/

</style>