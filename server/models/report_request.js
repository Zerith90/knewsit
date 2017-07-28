'use strict';
const moment =require('moment')
module.exports = function(sequelize, Sequelize) {
	const report_requests = sequelize.define('report_requests', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		request_date:{
			type:Sequelize.DATE,
		},
		request_details: {
			type: Sequelize.JSON
		},
		username:{
			type:Sequelize.STRING
		},
		diy: {
			type: Sequelize.BOOLEAN
		}


	},{
		timestamps:false,
		classMethods: {
			associate(models){
				report_requests.hasMany(models.jobs,{foreignKey: 'request_id'})
			},
			get_top_5_generated(){
				return sequelize.query(`
					select 
						request_details->>'name' as name,
						count(request_details->'type') as total
					from
						report_requests
					where
						request_date > '${moment().subtract(30,'days').format('YYYY-MM-DD')}'
					group by 
						request_details->>'name' 
					order by total desc
					limit 5
					`)
			}
			
		}
	})

	return report_requests
}