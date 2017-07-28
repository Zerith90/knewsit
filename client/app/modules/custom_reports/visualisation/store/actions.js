import Vue from "vue";
import moment from "moment";
import {
    LOADING,
    UPDATE_CHART_META,
    UPDATE_OMEGA,
    UPDATE_REPORT_META
} from "./types";
import Service from "../../../../core/service";
let jobs_service = new Service("jobs");


export const initReport = function({
    commit,
    state,
    getters
}, id) {
    commit(LOADING)
    jobs_service.rest("get", {
        where: {
            id
        }
    }).then((data) => {
        commit(UPDATE_REPORT_META, {
            data,
            getters
        })
        getters.selected_metrics.splice(0);
        getters.selected_dimensions.splice(0)
        getRawData(data, commit)
    }).catch(err => {
        console.log(err)
    })
};

export const getRawData = function(report, commit) {
    jobs_service.rest("get", {
        data: true,
        report
    }).then((data) => {
        commit(LOADING)
        commit(UPDATE_OMEGA, {
            data
        })
    }).catch(err => {
        console.log(err)
    })
};
export const renderChart = function({
    commit,
    state,
    getters
}) {
    let chart_config = getters.schema.chart_config,
        dimensions = getters.selected_dimensions,
        metrics = getters.selected_metrics,
        yAxis = [];
    //set chart type
    getters.chart_type ? chart_config.chart.type = getters.chart_type : chart_config.chart.type = "column"
        //set title
        // chart_config.title.text = getters.report_meta.report_request.request_details.name;
        //set Y axis for multiple metrics
    for (let i in metrics) {
        let y_axis_model = JSON.parse(JSON.stringify(getters.schema.y_axis_model))
        y_axis_model.opposite = i % 2 == 0 ? false : true;
        y_axis_model.title.text = metrics[i].split('_').join(' ')
        yAxis.push(y_axis_model)
    }
    //set X Axis
    let xAxis = JSON.parse(JSON.stringify(getters.schema.x_axis_model))


    //set data
    let data = JSON.parse(JSON.stringify(getters.omega));
    let processedData = manipulateData({
            report_meta: getters.report_meta.report_request.request_details,
            data,
            dimensions,
            metrics
        })
        //handle timeseries when no dimension is not added
    console.log("Dimensions",dimensions,"metrics",metrics)
    try {
        if (dimensions.length == 0) {

            if (getters.report_meta.report_request.request_details.oneOff.timeRollup == 'by_day') {
                xAxis.type = 'datetime'
            }
        } else {
            xAxis.type = 'category'
            xAxis.categories = processedData.categories
        }
    } catch (e) {
        console.log(e)
    }
    //draw chart
    try {

        chart_config.series = processedData.data;
        chart_config.yAxis = yAxis;
        chart_config.xAxis = xAxis;
        console.log(chart_config)
        commit(UPDATE_CHART_META, {
            data: chart_config
        })
    } catch (e) {

    }
}

export const manipulateData = function(meta) {

    try {
        return handleStandardReport(meta)
    } catch (e) {
        return null
    }


    // else if(dimensions.length==0 && metrics.length>0){
    // 	return handleTimeSeries(meta)

    // }
    // return null
}



export const handleStandardReport = function(meta) {
    console.log(meta)
    let dimensions = meta.dimensions,
        report_meta = meta.report_meta,
        metrics = meta.metrics,
        data = meta.data,
        dimensionIndex = null,
        headers = data.shift(),
        categories = [],
        results = [],
        datetime = false;
    //check if dimension is chosen
    if (dimensions.length == 1) {
        dimensionIndex = headers.indexOf(dimensions[0])
    } else if (report_meta.oneOff) {
        if (report_meta.oneOff.timeRollup == 'by_day') {
            dimensionIndex = headers.indexOf('start_date')
        }
    }
    // console.log(dimensionIndex, headers, "dimension INdex")
    data = data.reduce((p, c) => {
        if (headers.some(v => {
                return metrics.indexOf(v) >= 0
            })) {
            let dimension_entity = c[dimensionIndex];

            try {
                for (let i in metrics) {
                    if (p.length <metrics.length) {
                        p.push({
                            name: metrics[i],
                            data: []
                        })
                    }

                    let metricIndex = headers.indexOf(metrics[i]);
                    if (c && metrics.length > 0 && dimensions.length == 1) {

                        if (categories.indexOf(dimension_entity) < 0 && dimension_entity) categories.push(dimension_entity)
                        
                        // if(!p[i].data[categories.indexOf(dimension_entity)]){
                        // 	p[i].data.push(+c[metricIndex])
                        // } else{
                        	p[i].data[categories.indexOf(dimension_entity)] =p[i].data[categories.indexOf(dimension_entity)] + +c[metricIndex]	||  +c[metricIndex]
                        // } 
                        

                    } else if (metrics.length > 0 && dimensions.length == 0 && report_meta.oneOff) {
                        if (dimension_entity && dimension_entity.length > 0) {
                            let element = p[i].data.findIndex(v => {
                                return v[0] == moment(dimension_entity).unix() * 1000
                                    // return v[0] == new Date(c[dimensionIndex])
                            })
                            if (element > -1) {
                                p[i].data[element][1] += +c[metricIndex]
                            } else {

                                p[i].data.push([moment(dimension_entity).unix() * 1000, +c[metricIndex]])
                                    // p[i].data.push([new Date(c[dimensionIndex]), +c[metricIndex]])	
                            }

                        }
                    }
                }
            } catch (e) {
                console.log(e)
            }
            //make date the metrics


        }
        return p;
    }, [])


    data = data.map((v, i) => {
        v.yAxis = i
        v.data.sort((a, b) => {
            return a[0] - b[0]
        })
        return v
    })
    console.log(data, categories);
    return {
        data,
        categories
    }
}