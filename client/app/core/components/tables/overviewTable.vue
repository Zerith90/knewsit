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


	export default {

		props: [
			"schema"
		],

		computed: {

		},

		methods: {
		}

	};

</script>

<style lang="sass" scoped>

</style>