import {
    LOAD_NEWS,
    LOAD_SOURCES,
    UPDATE_CATEGORIES,
    LOADING
} from "./types";
import schema from "../schema";
import sources from "../sources"
import {
    each,
    find,
    assign,
    remove,
    isArray
} from "lodash";
import Vue from "vue"
const state = {
   feed:[],
   categories:{},
   sources:sources.sources,
   loading:false
};

const mutations = {
    [LOAD_NEWS](state,model){
        try{
            state.feed.push(...model)    
        }catch(e){
            console.log(e)
        }
        
    },
    [UPDATE_CATEGORIES](state,model){
        try{
            state.categories= model
        }catch(e){
            console.log(e)
        }
    },
    [LOADING](state,model){
        try{
            state.loading = !state.loading
        }catch(e){
            console.log(e)
        }
    }
};

import * as getters from "./getters";
import * as actions from "./actions";

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};