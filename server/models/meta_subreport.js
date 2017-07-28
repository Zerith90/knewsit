'use strict';

module.exports = function(sequelize, Sequelize) {
	const meta_subreport = sequelize.define('meta_subreport', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		report_id: {
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.INTEGER
		},
		namespace: {
			type: Sequelize.STRING
		},
		meta: {
			type: Sequelize.JSON
		}

	}, {
		timestamps:false,
		classMethods:{
			associate(models){
				meta_subreport.belongsTo(models.meta_report,{foreignKey: 'report_id'})
			}
		}

	})

	return meta_subreport
}