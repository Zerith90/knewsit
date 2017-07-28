"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");
let _ = require("lodash");
let AWS = config.aws;
let zlib = require('zlib')
let zip = zlib.createUnzip();
let s3 = new AWS.S3()
let jobs = require("../../../models").jobs;
let report_requests = require("../../../models").report_requests;
let moment = require('moment');
let CSV = require('csv-string');

module.exports = {
    settings: {
        name: "jobs",
        version: 1,
        namespace: "jobs",
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
                ctx.params.limit = 20;
                ctx.params.order = [
                    ['submitted_at', 'DESC']
                ];
                ctx.params.include = [{
                    model: report_requests,
                    attributes: ['request_details', 'diy']
                }];
                return jobs.findAll(ctx.params).then(reports => {
                    return reports
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                if (ctx.params.data) {
                    let report = ctx.params.report;
                    return new Promise((resolve, reject) => {
                        s3.getObject({
                            Bucket: report.s3_bucket,
                            Key: report.s3_location
                        }, function(err, data) {
                            zlib.unzip(data.Body, (err, results) => {
                                let data = CSV.parse(results.toString('utf8'));
                                resolve(data)
                            })
                        });
                    })

                } else {
                    ctx.params.include = [{
                        model: report_requests,
                        attributes: ['request_details', 'diy']
                    }];

                    return jobs.findOne(ctx.params).then(reports => {
                        return reports
                    }).catch((err) => {
                        console.log(err)
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