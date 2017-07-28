<template lang="pug">
	div
		md-dialog(ref="summary",md-open-from=".viewSummary",md-close-to="#menu")
			md-dialog-title {{report_type}}
			md-button(v-clipboard:copy="query", style="position:absolute;top:5px;right:5px",md-align="center",@click.native="query_copied()")
				md-icon content_copy
				| Copy Query
			md-dialog-content
				md-layout(md-column)
					md-layout(md-row,v-if="dimensions")
						md-layout(md-flex="15") Dimensions
						md-layout(md-flex="70") 
							md-chip.fg90(v-for="ele in dimensions",style="background-color:#2196f3 !important;color:#fff !important") {{ele.split('_').join(' ')}}
					md-layout(md-row,v-if="metrics")
						md-layout(md-flex="15") Metrics
						md-layout(md-flex="70") 
							md-chip.fg90(v-for="ele in metrics",style="background-color:#4caf50 !important;color:#fff !important") {{ele.split('_').join(' ')}}
					md-layout(md-row,v-if="filters")
						md-layout(md-flex="15") Filters
						md-layout(md-flex="70") 
							span(v-for="(ele,key) in filters",style="padding-right:10px") {{key}} = {{ele}}
					md-layout(md-row,v-if="oneOff")
						md-layout(md-flex="15") Date
						md-layout(md-flex="70") 
							span(v-if="oneOff") {{oneOff.start_date}} - {{oneOff.end_date}} ({{time_diff}})
					md-layout(md-row,v-if="query")
						pre(v-highlightjs="query")
							code.sql.sas89
			md-snackbar(md-position="top right" ref="snackysnacky")
				span {{snackbar_message}}

					
</template>	
<script>
	import moment from "moment";
	// import vClipboard from 'vue-clipboards';
	import VueClipboard from 'vue-clipboard2'
	export default {
		components:{
			
		},
		props:["itemSummary"],
		computed:{
			dimensions(){
				return this.itemSummary.report_request?this.itemSummary.report_request.request_details.dimensionsKeysSorted:null
			},
			filters(){
				return this.itemSummary.report_request?this.itemSummary.report_request.request_details.filters:null
			},
			metrics(){
				return this.itemSummary.report_request?this.itemSummary.report_request.request_details.metricsKeysSorted:null
			},
			report_type(){
				return this.itemSummary.report_request?this.itemSummary.report_request.request_details.name:null 
			},
			query(){
				return this.itemSummary.report_request?this.itemSummary.query_run:null 
			},
			oneOff(){
				return this.itemSummary.report_request?{start_date:moment(this.itemSummary.report_request.request_details.oneOff.startDate).format('ddd, DD/MM/YYYY'),
				end_date:moment(this.itemSummary.report_request.request_details.oneOff.endDate).format('ddd, DD/MM/YYYY')}:null
			},
			time_diff(){
				return this.itemSummary.report_request?moment(this.itemSummary.report_request.request_details.oneOff.endDate).diff(this.itemSummary.report_request.request_details.oneOff.startDate,'days') + ' days':null
			}
		},
		data(){
			return{
				snackbar_message:''
			}
			
		},
		methods:{
			query_copied(){
				this.snackbar_message = "Query Copied!"
				this.$refs.snackysnacky.open()
			}
		},
		watch:{
			itemSummary(){
				console.log(this.itemSummary,this.$refs)
				this.$refs.summary.open()
			}
		}
	}
</script>
<style>
	pre{
		width:100%;
	}
	.fg90{
		height: 25px;
	    padding: 0px 5px;
	    line-height: 25px;
	    border-radius: 0;
	    margin: 4px;
	}
	.sas89{
		word-break: break-all;
	    word-wrap: break-word;
	    overflow-wrap: break-word;
	    text-overflow: ellipsis;
        white-space: pre-wrap;
	}
</style>