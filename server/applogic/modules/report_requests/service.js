"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");
let _ = require("lodash");

let report_requests = require("../../../models").report_requests;
let moment = require('moment');

module.exports = {
    settings: {
        name: "report_requests",
        version: 1,
        namespace: "report_requests",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
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
        list: {
            cache: true,
            handler(ctx) {
                if (ctx.params.top_5_generated) {
                    return report_requests.get_top_5_generated().then(results=>{
                        return results
                    }).catch(err=>{
                        console.log(err)
                    })
                } else {
                    ctx.params.limit = 10;
                    ctx.params.order = [
                        ['request_date', 'DESC']
                    ];
                    return report_requests.findAll(ctx.params).then(reports => {
                        return reports
                    }).catch((err) => {
                        console.log(err)
                    })
                }

            }
        },
        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {


                return report_requests.findById(ctx.params.id).then(report_request => {
                    return report_request
                }).catch(err => {
                    console.log(err)
                })

            }
        },

        create(ctx) {

            return {}
        },

        update(ctx) {
            return {}
        },

        remove(ctx) {
            return {}
        }

    },

    methods: {

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