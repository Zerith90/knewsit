<template lang="pug">
	v-app(column)
		v-navigation-drawer(
		height="100%",
		clipped,
		floating,
		persistent,
		light,
		enable-resize-watcher,
		v-model="drawer")
			v-list(v-if="categories")
				template(v-for="(category,key) in categories")
					v-list-tile(@click.native="selectCategory(key)")
						v-list-tile-action
							v-icon.grey--text {{icon[key.split('-').join('_')]}}
						v-list-tile-content
							v-list-tile-title {{key.toUpperCase().split('-').join(' ')}}
		v-toolbar.indigo(fixed dark)
			v-toolbar-side-icon.white--text(@click.native.stop="drawer=!drawer")
			v-toolbar-title.white--text Daily News
				//- v-spacer
		main(style="overflow-y:auto;height:95vh;overflow-x:hidden" v-scroll="onScroll")
			v-layout(column )
				v-flex(xs12 sm12 md8 lg8 xl8 offset-md2 offset-lg1 offset-xl1
				style="margin-bottom:150px", )
					v-card.mb-3.pa-3(v-for="ele in feed" flat )
						v-card-title
							v-layout(column)
								.title.mb-1
									a(:href="ele.url",target="_blank" style="text-decoration:none") {{ele.title}}
								.caption
									span.mr-1 {{getSource(ele.url)}}
									span - {{ele.publishedAt | ago}}
								v-layout.mt-3(row-sm column)
									v-flex(xs12 sm12 md4 lg4)
										img(:src="checkImage(ele.urlToImage)",style="width:100%")
									v-flex(sm4 md8 lg8)
										p.body-1 {{ele.description}}
						v-divider
					//- v-layout(justify-space-between)
					//- 	span
						//- v-btn(flat @click.native.stop="showNews(ele)") Read More
				v-container.mb-5
					p All caught up with today's news
				v-container.mb-5
					p.text-xs-center Powered by
						a.ma-1(href="https://newsapi.org/") NewsAPI.org.
		//- v-dialog(v-model='dialog', fullscreen transition="v-dialog-bottom-transition")
		//- 	v-card
		//- 		v-toolbar
		//- 			v-btn(flat,dark,icon,@click.native="dialog=false")
		//- 				v-icon close
		//- 		v-layout(style="background:#fff")
		//- 			//- iframe( :src="url")
        

</template>

<script>
	import Vue from "vue";
	import moment from "moment";
	import infiniteScroll from 'vue-infinite-scroll'
	import {
	    mapGetters,
	    mapActions
	} from "vuex";
	export default {
	    components: {
	        
	    },
	    data(){
	    	return{
	    		dialog:false,
	    		drawer:true,
	    		category:"general",
	    		url:"",
	    		icon:{
	    			general:"language",
	    			technology:"developer_board",
	    			business:"business",
	    			politics:"account_balance",
	    			entertainment:"local_movies",
	    			sport:"local_hotel",
	    			gaming:"videogame_asset",
	    			music:"music_note",
	    			science_and_nature:"terrain"
	    		}
	    	}
	    },
	    computed: {
	        ...mapGetters("news", [
	        	"feed",
	        	"categories",
	        	"loading"
	        ])
	    },

	    methods: {
	        ...mapActions("news", [
	        	"initNews",
	        	"initSources",
	        	"initStraitsTimes"
	        ]),
	        onScroll:function(e, position){
		      if(e.target.children[0].children[0].clientHeight-position.scrollTop <700){
		      	if(!this.loading){
		      		console.log("loading")
	      			this.initNews(this.category)	
		      	}
		      
		      }
		    },
		    checkImage(url){
		    	// return url
		    	try{
			    	if(url.substring(0,5)!= "https"){
			    		console.log(url,`https${url.substring(4,url.length)}`)
			    		if(url.substring(0,4)== 'http') return `https${url.substring(4,url.length)}`
			    		else return `https://${url}`
			    	}else{
			    		return url
			    	}
			    }catch(e){
			    	console.log(e)
			    }
		    },
		    selectCategory(category){
		    	this.feed.splice(0)
		    	this.category= category;
		    	this.initNews(category)
		    },
	        getSource(url){
	        	let parts = url.split('.');
	        	if(parts[0]=='http://www'||parts[0]=='https://www'){
	        		return parts[1].toUpperCase()
	        	}else{
	        		return parts[0].split('//')[1].toUpperCase()
	        	}
	        },
	        showNews(ele){
	        	this.url=ele.url
	        	this.dialog=true
	        }
	     
	    },
	    watch:{
	    	categories(){
	    		this.initNews()
	    	},
	    	'scroll'(s){
	    		console.log("scrolled",s)
	    	}
	    },
	    created() {
	    	
	    	this.initSources();
	    	this.initStraitsTimes()
	    }
	};

</script>

<style lang="sass">
	main{
		overflow-y:auto;
		height:100vh;
	}
	iframe{
		width:100%;
		height:95vh;
	}
		html,body{
		overflow:hidden !important
	}
</style>