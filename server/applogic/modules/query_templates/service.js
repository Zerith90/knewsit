"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");

let _ = require("lodash");
let query_templates = require("../../../models").query_template;
// let global_data=require("../../../../data/global")
let moment = require('moment')
module.exports = {
    settings: {
        name: "query_templates",
        version: 1,
        namespace: "query_templates",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
      //  collection: Product,
        modelPropFilter: "code type address name description status lastCommunication createdAt updatedAt"
    },

    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};
                return ctx.queryPageSort(query).exec().then((docs) => {


            })
            }
        },
        list:{
            cache:true,
            handler(ctx){
                return query_templates.findAll().then((results)=>{
                        return results

                    }).catch((err)=>{
                        console.log('err',err)
                    })
                // return new Promise((resolve,reject)=>{
                //     let templates = require('../../../query_templates')
                //     console.log(templates)
                //     resolve(templates)
                // }).then((results)=>{
                //     return results
                // }).catch((err)=>{
                //     console.log(err)
                // })

            }
        },


    },

    methods: {
        /**
         * Validate params of context.
         * We will call it in `create` and `update` actions
         * 
         * @param {Context} ctx 			context of request
         * @param {boolean} strictMode 		strictMode. If true, need to exists the required parameters
         */
         validateParams(ctx, strictMode) {
            if (strictMode || ctx.hasParam("name"))
                ctx.validateParam("name").trim().notEmpty(ctx.t("app:DeviceNameCannotBeBlank")).end();

            if (strictMode || ctx.hasParam("status"))
                ctx.validateParam("status").isNumber();

            ctx.validateParam("description").trim().end();
            ctx.validateParam("address").trim().end();
            ctx.validateParam("type").trim().end();

            if (ctx.hasValidationErrors())
                throw ctx.errorBadRequest(C.ERR_VALIDATION_ERROR, ctx.validationErrors);
        }
    },

    init(ctx) {
        // Fired when start the service
    },

    socket: {
        afterConnection(socket, io) {
            // Fired when a new client connected via websocket
        }
    }

};