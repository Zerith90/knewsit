"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");
let _ = require("lodash");

let meta_report = require("../../../models").meta_report;
let meta_subreport = require("../../../models").meta_subreport;
let moment = require('moment');
let t1 = require("terminalone")
    /**hardcode for testing purposes)**/
let t1config = {
    'user': "partnerapi@mediamath.com",
    'password': "h0n348ad93r",
    'api_key': "4d56c81d0d6b14f43e28a0d7fb0caf35"
};
let t1connection = new t1.T1Connection(t1config);
let req = {
    user: {
        t1conn: t1connection
    }
}
module.exports = {
    settings: {
        name: "report_type",
        version: 1,
        namespace: "report_type",
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
                /**
                List the types of available reports 
                TODO : custom report types should be retrieved from db
                **/

                return meta_report.findAll({
                    include: [meta_subreport]
                }).then((meta_report) => {
                    return meta_report
                }).catch((err) => {
                    console.log(err)
                })


            }
        },
        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                if (ctx.params.categories) {

                    return new Promise((resolve, reject) => {
                        resolve(global_data.top10Categories())
                    }).then((results) => {
                        return results
                    }).catch((e) => {
                        console.log('error', e)
                    })
                }
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