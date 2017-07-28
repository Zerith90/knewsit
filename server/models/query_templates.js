'use strict';

module.exports = function(sequelize, Sequelize) {
	const query_templates = sequelize.define('query_template', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey:true,
			unique: true
		},
		name: {
			type: Sequelize.STRING
		},
		name_space: {
			type: Sequelize.STRING
		},
		parameters: {
			type: Sequelize.JSON
		},
		query: {
			type: Sequelize.STRING
		}

	},		
	{
		timestamps:false,
		classMethods: {
	
			
		}
	})

	return query_templates
}

