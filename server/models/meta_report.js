'use strict';

module.exports = function(sequelize, Sequelize) {
	const meta_report = sequelize.define('meta_report', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.INTEGER
		},
		namespace: {
			type: Sequelize.STRING
		}


	},{
		timestamps:false,
		classMethods:{
			associate(models){
				meta_report.hasMany(models.meta_subreport,{foreignKey: 'report_id'})
			}
		}
	})

	return meta_report
}