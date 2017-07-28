<template lang="pug">
	md-layout()
		md-layout(md-column)
			md-layout( md-align="center", md-gutter="16",  v-if="loading")
				md-spinner(md-indeterminate)
			md-layout(md-row, v-if="!loading")
				md-layout(md-row, md-flex="15")
					div(md-column)
						md-menu(md-size="7")
							md-button(md-menu-trigger) Show Me
							md-menu-content
								md-layout(md-row)
									md-layout(md-flex="33",v-for="item in schema.chart_types")
										md-button(@click.native="setChartType(item)") 
											img.align(:src="item.src",width="32",height="32",:class="{'rotate':item.rotate}")
											span {{item.name}}
						md-card(style="margin-top:16px;box-shadow:none !important")
							md-card-header
								div.md-subhead Dimensions
							md-card-content.md-column
								draggable(v-model="dimensions",v-if="report_meta",:options="{group:'people'}",:move="validateMove",@end="onEnd")
									transition-group.dimensions()
										md-chip.sleekify(v-for="ele in dimensions",key="$index",v-if="ele.indexOf('id')<0") {{ele.toUpperCase().split('_').join(' ')}}
							md-card-header
								div.md-subhead Metrics
							md-card-content
								draggable.metrics(v-model="metrics",v-if="report_meta",:options="{group:'people'}")
									transition-group()
										md-chip.sleekify(v-for="ele in metrics",key="$index") {{ele.toUpperCase().split('_').join(' ')}}
				md-layout(md-column,md-flex="80")
					div(md-row)
						span.md-caption Dimensions
						div
							draggable(:list="selected_dimensions",v-if="report_meta",:options="{group:'people'}",style="min-width:320px;height:50px")
								transition-group.dimensions(style="display:block;width:100%;height:100%")
									md-chip.sleekify(md-deletable,v-for="ele in selected_dimensions",key="$index",@delete="deleteChip(1,ele)") {{ele.toUpperCase().split('_').join(' ')}}
							md-divider
					div(md-row)
						span.md-caption Metrics
						div#selectedMets
							draggable(:list="selected_metrics",v-if="report_meta",:options="{group:'people'}",style="min-width:320px;height:50px")
								transition-group.metrics(style="display:block;width:100%;height:100%")
									md-chip.sleekify(md-deletable,v-for="ele in selected_metrics",key="$index",@delete="deleteChip(2,ele)") {{ele.toUpperCase().split('_').join(' ')}}
							md-divider
					vue-highcharts(:options="chart_meta" ref="chart", v-if="chart_meta")
				
												
</template>

<script>
	import Vue from 'vue'
	import {
	    mapGetters,
	    mapActions
	} from "vuex";
	import {each, isObject, isArray, isFunction, isNil,  isString, defaults, orderBy, includes, get} from "lodash";
	import VueHighcharts from "../../../core/components/vueHighcharts/VueHighcharts.vue"
 	import draggable from 'vuedraggable';
 	import Sortable from 'vue-sortable'
	export default {
	    components: {
	    	VueHighcharts,
	    	draggable
	    },
	    computed: {
	        ...mapGetters("custom_reports_visualisation", [
	        	"chart_meta",
	        	"dimensions",
	        	"loading",
	        	"metrics",
	        	"omega",//data from specific file
	        	"report_meta",
	        	"schema",
	        	"selected_dimensions",
	        	"selected_metrics"
	        ]),
	    },

	    methods: {
	        ...mapActions("custom_reports_visualisation", [
	        	"initReport",
	        	"getRawData",
	        	"renderChart"
	        ]),
	        onEnd: function(evt){
	        	let arr = evt.to.className=='dimensions'?this.selected_dimensions:this.selected_metrics,
	        	key = evt.item.outerText.split(' ').join('_');
	        	let dict = arr.reduce((p,c)=>{
	        		p[c] = p[c]+1|| 1
	        		return p
	        	},{});
	        	if(dict[key]>1) arr.splice(arr.indexOf(key),1)
			},
			onSort(sort){
				console.log('sort',sort)
				this.omega = _.orderBy(this.omega, [item => item[sort.name]], sort.type);
				console.log(this.omega)
			},
			validateMove(evt){
				return evt.to.className == evt.from.className
			},
			deleteChip(type,element){
				type==1? this.selected_dimensions.splice(this.selected_dimensions.indexOf(element),1) :this.selected_metrics.splice(this.selected_metrics.indexOf(element),1)
			},
			setChartType(item){
				this.schema.chart_config.chart.type = item.id
				this.renderChart();
			}
	    },
	    data() {
	        return {
	        	chart_type:""
	        }
	    },
	    created() {
			let id = this.$router.history.current.params.id;
			this.initReport(id)

	    },
	    watch:{
	    	// omega(){
	    	// 	this.renderChart();
	    	// },
	    	selected_metrics(){
	    		try{
    				this.renderChart();
	    		}catch(e){
	    			console.log(e)
	    		}
	    	},
	    	selected_dimensions(){
	    		try{
    				this.renderChart()
	    		}catch(e){
	    			console.log(e)
	    		}
	    		
	    	}
	    }
	};


</script>

<style lang="sass">
	#reports_table{
		width:100%;
		padding-right:50px;
	}
	.rotate{
		transform: rotate(-270deg)
	}
	.align{
		margin:auto;
	}
	.sleekify{
		font-size: 0.8rem !important;
	    border-radius: 0px !important;
	    margin:2px ;
	}
</style>