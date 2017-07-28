module.exports = {
	chart_config: {
		chart: {
			// borderWidth: 0,
			type:null,
			style: {
				// overflow: 'visible',
				fontFamily: "\"Open sans\""
			},
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: true,
		},
		plotOptions: {
			series: {
				marker: {
					enabled: false,
					states: {
						hover: {
							radius: 2
						}
					}
				},
				// pointPadding: 0,
				// groupPadding: 0,
				// borderWidth: 0,
				shadow: false,
			},

		},
		title: {
			text: null
		},
		tooltip: {
			crosshairs: true,
			shared: true,
			enabled: true,
			backgroundColor: "#fff",
			borderWidth: 0,
			shadow: true,
			hideDelay: 0,
			followPointer: true,
			shadow: true,
			borderWidth: 0,
			backgroundColor: 'rgba(255,255,255,255)'
		},
		xAxis: null,
		yAxis: null
	},
	chart_types:[{
		name:"Area",
		id:"area",
		src:"https://png.icons8.com/collapse-arrow/nolan/64"
	},
	{
		name:"Area Spline",
		id:"areaspline",
		src:"https://png.icons8.com/collapse-arrow/nolan/64"
	},{
		name:"Bar",
		id:"bar",
		rotate:true,
		src:"https://png.icons8.com/bar-chart/nolan/64"
	},{
		name:"Column",
		id:"column",
		src:"https://png.icons8.com/bar-chart/nolan/64"
	},
	// {
	// 	name:"Doughnut",
	// 	id:"doughnut",
	// 	src:"https://png.icons8.com/doughnut-chart/nolan/64"
	// },
	{
		name:"Line",
		id:"line",
		src:'https://png.icons8.com/line-chart/nolan/64'
	},
	// {
	// 	name:"Pie",
	// 	id:"pie",
	// 	src:"https://png.icons8.com/pie-chart/nolan/64"
	// },
	{
		name:"Spline",
		id:"spline",
		src:"https://png.icons8.com/line-chart/nolan/64"
	}],
	x_axis_model: {
		// labels: {
		// 	enabled: true
		// },
		// title: {
		// 	text: null
		// },
		// gridLineWidth: 0,
		// startOnTick: false,
		// lineWidth: 0,
		// lineColor: 'transparent',
		// endOnTick: false
	},
	y_axis_model: {
		labels: {
			enabled: true
		},
		title: {
			text: null
		},
		gridLineWidth: 0,
		startOnTick: false,
		// lineWidth: 0,
		// lineColor: 'transparent',
		endOnTick: false,
		// tickPositions: []
	}
}