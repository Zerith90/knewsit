export function chart_meta(state) {
    return state.chart_meta
}
export function chart_type(state) {
    return state.schema.chart_config.chart.type
}
export function dimensions(state) {
    try {
        return state.report_meta.report_request.request_details.dimensionsKeysSorted
    } catch (e) {
        return []
    }
}
export function metrics(state) {
    try {
        return state.report_meta.report_request.request_details.metricsKeysSorted
    } catch (e) {
        return []
    }

}
export function loading(state) {
    return state.loading;
}
export function omega(state) {
    return state.omega;
}
export function report_meta(state) {
    return state.report_meta;
}
export function schema(state) {
    return state.schema;
}
export function selected_dimensions(state) {
    return state.selected_dimensions;
}
export function selected_metrics(state) {
    return state.selected_metrics;
}