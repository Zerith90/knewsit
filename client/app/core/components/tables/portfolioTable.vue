<template lang="pug">
	md-table(md-sort="name" md-sort-type="desc" @sort="onSort")
		md-table-header
			md-table-row
				md-table-head(:md-sort-by="col.field" v-for="col in schema.table.columns") {{col.title}}
		md-table-body
			md-table-row(v-for= "row in portfolio")
				md-table-cell(v-for="(item,key) in schema.table.columns" ) {{(item.formatter(row[item.field],row.quantity))}}


</template>

<script>
	import {each, isObject, isArray, isFunction, isNil,  isString, defaults, orderBy, includes, get} from "lodash";

	export default {

		props: [
			"schema",
			"portfolio"
		],

		computed: {

		},

		methods: {
			
			onSort(sort){
				this.portfolio = _.orderBy(this.portfolio, [item => item[sort.name]], sort.type);
			},
			/**
			 * Get the cell value from row. If the schema of column 
			 * has a get() method, it will call it, otherwise, get 
			 * the value from the row property
			 * 
			 * @param  {Object} row 	Row object
			 * @param  {Object} col 	Column definition
			 * @return {*}      		Cell value
			 */
			getCellValue(row, col) {
				let value;
				if (!col.field && isFunction(col.get))
					value = col.get(row);
				else 
					value = get(row, col.field);
				
				return this.tableFormatter(row, col, value);
			},

			/**
			 * Format the cell value by schema
			 *
			 * You can add custom formatter func in schema.table.columns. It can be also an array of functions.
			 * 
			 * @param  {Object} row 	Row object
			 * @param  {Object} col 	Column definition
			 * @param  {*} 		value Value of cell
			 * @return {String}       Formatted string
			 */
			tableFormatter(row, col, value) {
				if (isNil(value)) return;
				let formatter = col.formatter;
				if (formatter) {
					if (isArray(formatter)) {
						each(formatter, (fmt) => {
							value = fmt(value, row, col);
						});
					} else if (isFunction(formatter))
						value = formatter(value, row, col);
				}

				return value;
			},		

			/**
			 * Get classes for row. Handle the selected row.
			 * If has 'rowClasses' in schema, it will be called.
			 * 
			 * @param  {Object} row Row object
			 * @return {Object}     Object with classes
			 */
			getRowClasses(row) {
				// Default classes
				let res = {
					selected: this.isSelected(row)
				};

				// Classes from schema
				if (isFunction(this.schema.rowClasses))
					res = defaults(this.schema.rowClasses(row), res); 
				
				return res;
			},

			/**
			 * Get classes for cell. Handle the column.align property
			 * @param  {Object} row Row object
			 * @param  {Object} col Column schema
			 * @return {Object}     Object with classes
			 */
			getCellClasses(row, col) {
				if (!isNil(col.align))
					return {
						["align-" + col.align]: true
					};
			},

			/**
			 * Change the sort field and direction.
			 * If field is changed, the direction will be ascending.
			 * If field is not changed, toggle the direction
			 * 
			 * @param  {Object} col Column schema
			 * @return {[type]}     [description]
			 */
			changeSort(col) {
				if (col.field) {
					if (this.order.field == col.field) {
						this.order.direction *= -1;
					} else {
						this.order.field = col.field;
						this.order.direction = 1;
					}
				}
			},

			/**
			 * Get the row is selected
			 * @param  {Object}  row Row object
			 * @return {Boolean}     Is selected?
			 */
			isSelected(row) {
				return this.selected.indexOf(row) != -1;
			}

		}
		,created(){
		}

	};

</script>

<style lang="sass" scoped>

</style>