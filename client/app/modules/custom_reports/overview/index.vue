<template lang="pug">
	md-layout(style="padding:50px 0px 50px 50px")
		md-dialog-confirm(
		ref="delete_dialog",
		:md-title="deleteDialog().title",
		:md-content-html="deleteDialog().contentHtml",
		:md-ok-text="deleteDialog().ok",
		:md-cancel-text="deleteDialog().cancel",
		@close="onClose")
		
		md-button.md-primary.md-raised(href="#/custom-reports/report-builder",)
			md-icon add
			| Create Report
		md-layout(md-flex="100")
			md-table#reports_table(style="margin-bottom:100px" ,v-infinite-scroll="loadMore" ,infinite-scroll-distance="100")
				md-table-header
					md-table-row
						md-table-head ID
						md-table-head Report
						md-table-head Type
						md-table-head Submitted At
						md-table-head User
						md-table-head File Size
						md-table-head Status
				md-table-body
					md-table-row(v-for="item in items", @click.native="getDetails(item.id)" v-if="!item.deleted")
						
						md-table-cell {{item.id}}
						md-table-cell {{item.report_request.request_details.name}} ({{item.job_type}})
							md-tooltip(md-delay="500")
								| Taken: {{timeDiff(item.submitted_at,item.status_updated_at)}}
						md-table-cell
							md-icon() {{report_type(item)}}
						md-table-cell {{readableDate(item.submitted_at)}}
						md-table-cell {{item.username}}
						md-table-cell {{prettify(item.results_size)}}
						md-table-cell 
							md-menu#menu(v-if="item.done")
								md-button.md-primary(md-menu-trigger)
									md-icon more_vert
								md-menu-content
									md-menu-item.fs8(v-for="(action,key) in schema.more",@click.native="addon(action,item)",:class="{'viewSummary':action.action=='view'}")
										| {{action.name}}
										md-divider(v-if="key==2")
							md-icon.color-red-500(v-if="item.errored") error
							md-icon.color-orange-500(v-if="item.cancelled") cancel
							md-spinner(v-if="item.status=='running'|| item.status=='waiting'" md-indeterminate :md-size="20")
				overview-dialog(:itemSummary="itemSummary")
		



														
</template>

<script>
	import schema from "./schema";
	import timeago from 'vue-timeago'
	import moment from "moment";
	import overviewDialog from "../../../core/components/dialog/overview_dialog.vue"
	import {
	    mapGetters,
	    mapActions
	} from "vuex";
	export default {
	    components: {
	    	overviewDialog
	    },
	    computed: {
	        ...mapGetters("custom_reports_overview", [
	        	"items",
	        	"schema"
	        ]),
	    },

	    methods: {
	        ...mapActions("custom_reports_overview", [
	        	"loadReportJob"
	        ]),
	        readableDate(date){
	        	return moment(date).format("DD MMM YYYY, HH:mm:ss")
	        },
	        addon(action,item){
	        	switch(action.action){
	        		case "edit":
	        			this.$router.push(action.link+'?id='+item.request_id);
	        		break
	        		case "delete":
	        			this.upForDeletion = item;
	        			this.$refs['delete_dialog'].open()
	        			break;
	        		case "download":
	        			window.open(`http://s3.amazonaws.com/${item.s3_bucket}/${item.s3_location}`)
	        		break;
	        		case "visualise":
	        			this.$router.push(action.link+'/'+item.id);
	        			break
	        		case "view":
	        			this.itemSummary = Object.assign({}, this.itemSummary, item)
	        	}
	        	
	        },
	        getDetails(id){
	        	console.log(id)
	        },
	        report_type(item){
	        	let dimensions = item.report_request.request_details.dimensionsKeysSorted;
	        	if(dimensions.some(v=>{
	        		return ['country','country_code','dma','region_name','region_code','region_id'].indexOf(v)>-1
	        	})){
	        		return "location_on"
	        	}
	        	return "assignment_turned_in";
	        },
	        loadMore(){
	        	this.loadReportJob({init:false})
	        },
	    	onClose(type){
	    		if(type == 'ok'){
	    			this.$nextTick(() => {
					  this.$set(this.upForDeletion,'deleted', true)
					})
	    			
	    		}
	    	},
	        prettify(size){
	        	size = +size;
    			if(size<1024) return (size)+"b"
        		if(size<1024*1024) return (size/(1024)).toFixed(2) +"kb";
        		if(size<1024*1024*1024)	return (size/(1024*1024*1024)).toFixed(2) +"mb"
	        },
	    	timeDiff(submitted,updated){
	    		let diff=moment(updated).diff(moment(submitted))/1000
	    		return diff>(60*60)?(diff/60/60).toFixed(0) +'hrs '+ diff%(60) +'mins': (diff/(60)).toFixed(0) +'mins ' + (diff%(60)).toFixed(0) + 'secs'
	    	},

	    	view_summary(item){
	    		console.log(item)
	    	}

	    },
	    data() {
	        return {
	        	deleteDialog(){
	        		let request_id = this.upForDeletion? this.upForDeletion.request_id:null
		        	return {
					    title: `Delete Request ${request_id}`,
					    contentHtml: 'Are you sure you want to delete this report?',
					    ok: 'Agree',
					    cancel: 'Disagree'
					}
			    },
			    upForDeletion:null,
			    itemSummary:{}
	        }
	    },
	    created() {
	    	this.loadReportJob({init:true})
	    },
	    watch:{
	    	
	    }
	};


</script>

<style lang="sass">
	#reports_table{
		width:100%;
		padding-right:50px;
	}
	.fs8 .md-list-item-container{
		font-size: 0.8rem !important;
		min-height: 30px !important
	}
</style>