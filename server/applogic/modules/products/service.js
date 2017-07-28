"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");

let _ = require("lodash");

let Product = require("../../../models").product;

// let global_data=require("../../../../data/global")
let moment = require('moment')
module.exports = {
    settings: {
        name: "product",
        version: 1,
        namespace: "products",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Product,
        modelPropFilter: "code type address name description status lastCommunication createdAt updatedAt"
    },

    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};

                // let query = Device.find(filter);
                // return ctx.queryPageSort(query).exec().then( (docs) => {
                // 	return this.toJSON(docs);
                // });

                return ctx.queryPageSort(query).exec().then((docs) => {
                // return this.toJSON(docs);

            })
            }
        },
        list:{
            cache:true,
            handler(ctx){
                if(ctx.params.q){
                    console.log("searching")
                    return Product.search(ctx.params).then((results)=>{
                        
                        return results
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
          
                else{
                    console.log("here",ctx.params)
                    return Product.findAll(ctx.params).then((results)=>{
                        return results

                    }).catch((err)=>{
                        console.log('err',err)
                    })
                }


            }
        },
        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                if(ctx.params.categories){

                    return new Promise((resolve,reject)=>{
                        resolve(global_data.top10Categories())
                    }).then((results)=>{
                        return results
                    }).catch((e)=>{
                        console.log('error',e)
                    })
                }
            }
        },

        create(ctx) {
            // this.validateParams(ctx, true);

            // let device = new Device({
            // 	address: ctx.params.address,
            // 	type: ctx.params.type,
            // 	name: ctx.params.name,
            // 	description: ctx.params.description,
            // 	status: ctx.params.status
            // });

            // return device.save()
            // .then((doc) => {
            // 	return this.toJSON(doc);
            // })
            // .then((json) => {
            // 	return this.populateModels(json);
            // })
            // .then((json) => {
            // 	this.notifyModelChanges(ctx, "created", json);
            // 	return json;
            // });	
            return {}
        },

        update(ctx) {
            // ctx.assertModelIsExist(ctx.t("app:DeviceNotFound"));
            // this.validateParams(ctx);

            // return this.collection.findById(ctx.modelID).exec()
            // .then((doc) => {

            // 	if (ctx.params.address != null)
            // 		doc.address = ctx.params.address;

            // 	if (ctx.params.type != null)
            // 		doc.type = ctx.params.type;

            // 	if (ctx.params.name != null)
            // 		doc.name = ctx.params.name;

            // 	if (ctx.params.description != null)
            // 		doc.description = ctx.params.description;

            // 	if (ctx.params.status != null)
            // 		doc.status = ctx.params.status;

            // 	return doc.save();
            // })
            // .then((doc) => {
            // 	return this.toJSON(doc);
            // })
            // .then((json) => {
            // 	return this.populateModels(json);
            // })
            // .then((json) => {
            // 	this.notifyModelChanges(ctx, "updated", json);
            // 	return json;
            // });	
            return {}
        },

        remove(ctx) {
            // ctx.assertModelIsExist(ctx.t("app:DeviceNotFound"));

            // return Device.remove({ _id: ctx.modelID })
            // .then(() => {
            // 	return ctx.model;
            // })
            // .then((json) => {
            // 	this.notifyModelChanges(ctx, "removed", json);
            // 	return json;
            // });	
            return {}
        }

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