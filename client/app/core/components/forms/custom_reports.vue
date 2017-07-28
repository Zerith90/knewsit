<template lang="pug">
	form(style="margin-bottom:40%;padding-right:50px")
		md-layout.section(md-column,v-for="(section,key) in schema.form")
			span.md-headline
				b {{section.label}}
			md-layout.fields(md-column,style="padding-left:20px")
				div.md-layout(v-for="(input,key) in section.fields", :key="key",style="flex-wrap:nowrap !important"
				)
					div(md-row ,:class="input.class")
						md-input-container(v-if="input.input",v-show="input.show", :class="{'no-input-bg':input.chip}")
							label(v-if="input.type != 'chip'") {{input.label}}
							md-input(
								v-if="input.text",
								:type="input.type",
								v-model="input.value",
								:disabled="input.disabled")
							md-select(v-if="input.select && !input.dynamic" ,:type="input.type",:disabled="input.disabled",v-model="input.value")
								md-option(
								@click.native="input.dateObj?input.dateObj.open=!input.dateObj.open:null",
								 v-for="option in input.data",
								:value="option.id") {{option.name}}
							md-select(v-if="input.select && input.dynamic" ,:type="input.type",:disabled="input.disabled",v-model="input.value")
								md-option(
								 v-for="option in input.data()",
								:value="option.id") {{option.name}}
							md-chips-autocomplete(
								v-if="input.chip && input.autocomplete",
								:debounce="100",
								:md-input-placeholder="input.label",
								:value="input.value",
								:list="input.data",
								:disabled="input.disabled",
								:multiSelect="input.multiSelect"
								)
						md-menu.date-range-picker(
							v-if="input.date && !input.button",
							:disabled="input.disabled")
							md-button(md-menu-trigger) {{input.dateObj.readable}}
							md-menu-content
								md-menu-item(@click.native="input.dateObj.open=!input.dateObj.open")
									| Custom
								md-divider
								md-menu-item(v-for="(i,k) in input.dateObj.dateOptions ", @click.native="updateDateRange(input,i)")
									span()
										| {{i.readable}}
						datepicker(v-if="input.date",
						:doubled="input.dateObj.doubled",
						:open="input.dateObj.open",
						:dateObj="input.dateObj",
						:range="input.dateObj.range",
						:disablePassedDays="input.dateObj.disablePassedDays",
						:disableFrom="input.dateObj.disableFrom")
						div(v-if="input.table && !input.singleSelect")
							span {{input.label}}
							md-list()
								md-list-item.remove-padding(v-for="(row,index) in input.value")
									div(v-for="cols in input.columns", md-flex="25" md-gutter)
										md-input-container(v-if="cols.input")
											md-select(v-if="cols.dimensions", v-model="row.dimension", :disabled="dimensions.data.length<=0")
												md-option( v-for="item in dimensions.data" , v-if="item.namespace.indexOf('id')>-1 && item.namespace.indexOf('width')< 0", :value="item.namespace") {{item.name}}
											md-input(v-if="cols.text" ,:type="cols.type",v-model="row.value",:placeholder="row.dimension", :disabled="dimensions.data.length<=0")
										span(v-if="cols.conditions") =

										md-button.md-primary(v-if="cols.button" @click.native="removeFilterRow(index)", :disabled="row.remove")
											|Remove
							md-menu()
								md-button.md-primary.md-raised(md-menu-trigger, :disabled="dimensions.data.length<=0")
									md-icon add
									| Add Filter
								md-menu-content
									md-menu-item(v-for="item in dimensions.data", v-if="item.namespace.indexOf('id')>-1 && item.namespace.indexOf('width')< 0" ,@click.native="addFilterRow(item.namespace)") {{item.name}}
						md-layout(v-if="input.switch" md-row)
							label.md-flex-30.lh {{input.label}} 
							md-switch.md-primary(
								v-model="input.value",
								md-flex='70')
						md-layout(v-if="input.date && input.button", md-row)
							div.md-flex-30.lh {{input.label}}
							md-button.md-primary.md-raised(@click.native="input.dateObj?input.dateObj.open=!input.dateObj.open:null",md-flex="30",
							:disabled="input.disabled") {{input.dateObj.readable}}
						md-chips(v-if="input.chip && !input.autocomplete" ,
							v-model="input.value", :md-input-placeholder="input.label",
							:disabled="input.disabled")
							template(scope="chip") {{chip.value}}
			md-divider(style="margin:50px 0")
		md-button.md-primary.md-raised(@click.native="execute()") Execute Report
</template>


<script>
	import Vue from "vue";
	import mdChipsAutocomplete from "../mdChipsAutocomplete/mdChipsAutocomplete.vue";
	import datepicker from '../mdDatepicker/datepicker.vue';
	import moment from 'moment';
	import {
	    mapGetters,
	    mapActions
	} from "vuex";
	export default {
		components:{
			mdChipsAutocomplete,
			datepicker
		},
		props:[
			"schema",
			"dimensions"
		],
		data(){
			return{
			}
		},
		methods:{
			...mapActions("custom_reports_builder", [
	           "addFilterRow",
	           "removeFilterRow"
	        ]),
	        updateDateRange(el,i){
        		el.dateObj.readable = i.readable
        		el.dateObj.startDate = moment().subtract(i.value,'days');
        		el.dateObj.endDate = moment()
	        },
	        execute(){
	        	this.$emit('execute')
	        }
		},
		mounted(){

		}
	}
</script>

<style lang="sass" scoped>
	hr{
		width:100% !important;
	}
	span.section-header{
		font-size:1rem;
	}
	.fields{
		margin-top:2em;
	}
	.section{
		padding:24px 0;
	}
	.date-range-picker{
	    background: #ededed;
	    width: 100%;
	    .md-button {
	    	padding: 0;
	    	width:100%;
	    	text-align:left;
	    };
	    .md-button:hover{
	    	background:transparent;
	    }
	}
	.ch{
		height:50px;
	}
	.lh{
		line-height:50px;
	}
	.md-list-item.remove-padding{
		margin:0 -16px;
	}
	.no-input-bg.md-input-container:after{
		background-color:transparent;
	}
</style>