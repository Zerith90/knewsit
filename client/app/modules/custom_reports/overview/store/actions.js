import Vue from "vue";
import moment from "moment";
import {LOAD_REPORT_REQUEST,LOADING} from "./types";
import Service from "../../../../core/service";


let service = new Service("jobs"); 

export const loadReportJob = function ({commit, state,getters},type) {
	//dont load more when user load table without refreshing
	if(type.init && getters.items.length> 0){
		return
	}
	commit(LOADING);
	console.log(getters.loading)
	if(getters.loading){
		return service.rest("list",{
			offset:getters.items.length
		}).then((data) => {
			console.log(data)
			commit(LOADING);
			commit(LOAD_REPORT_REQUEST, data);
		}).catch((err) => {
			console.log(err)
		})
	}
};
