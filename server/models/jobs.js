'use strict';

module.exports = function(sequelize, Sequelize) {
	const jobs = sequelize.define('jobs', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey:true,
			unique: true
		},
		request_id: {
			type: Sequelize.INTEGER
		},
		query_run: {
			type: Sequelize.STRING
		},
		job_id: {
			type: Sequelize.JSON
		},
		submitted_at: {
			type: Sequelize.DATE
		},
		username: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.STRING
		},
		done: {
			type: Sequelize.BOOLEAN
		},
		cancelled: {
			type: Sequelize.BOOLEAN
		},
		errored: {
			type: Sequelize.BOOLEAN
		},
		status_updated_at: {
			type: Sequelize.DATE
		},
		job_type: {
			type: Sequelize.STRING
		},
		gzipped_results: {
			type: Sequelize.BOOLEAN
		},
		results_size: {
			type: Sequelize.INTEGER
		},
		emailable_size: {
			type: Sequelize.BOOLEAN
		},
		downloadable_size: {
			type: Sequelize.BOOLEAN
		},
		runtime_seconds: {
			type: Sequelize.INTEGER
		},
		s3_location: {
			type: Sequelize.STRING
		},
		s3_bucket: {
			type: Sequelize.STRING
		}



	},		
	{
		timestamps:false,
		classMethods: {
			associate(models){
				jobs.belongsTo(models.report_requests,{foreignKey: 'request_id'})
			}
			
		}
	})

	return jobs
}

