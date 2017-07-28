<template lang="pug">
	div.md-autocomplete(
		@focus="onFocus"
		@blur="onBlur")
		md-menu(md-size="7" md-align-trigger
		:md-offset-y="35"
			ref="menu",v-if="!multiSelect")
			span(md-menu-trigger)
			input.md-input(
				ref="input",
				type="text",
				v-model="query",
				:disabled="disabled",
				:required="required",
				:placeholder="placeholder",
				:maxlength="maxlength",
				:name="name",
				@focus="onFocus",
				@blur="onBlur",
				@input="debounceUpdate")

			md-menu-content()
				md-menu-item.sleek(v-for="item in items",
					v-if="items.length",
					:disabled="item.disabled",
					@keyup.enter="hit(item)",
					@click.native="hit(item)") {{ item[printAttribute] }}
		md-input-container.no-input-bg(v-if="multiSelect")
			label(style="opacity:1") {{placeholder}}
			md-select.filter-select(multiple,name="haha",v-model="groupSelect",md-menu-class="filter-select-menu", @click.native="init")
				input.md-input(
				ref="input",
				type="text",
				v-model="query",
				:disabled="disabled",
				:required="required",
				:placeholder="placeholder",
				:maxlength="maxlength",
				:name="name",
				
				@blur="onBlur")
				md-option(v-for="item in items",v-if="item.show",:value="item.namespace") {{item[printAttribute]}}
</template>

<script>
	import autocompleteCommon from '../utils/autocomplete-common';
	import common from './common';
	import getClosestVueParent from '../utils/getClosestVueParent';

	export default {
		mixins: [common, autocompleteCommon],
		props:{
				placeholder:String,
				multiSelect:{
					type:Boolean
				},
				deletedChip:{
					type:Object
				}
		},
		data() {
			return {
				items:[],
				loading: false,
				query: '',
				selected: null,
				timeout: 0,
				parentContainer: null,
				groupSelect:[]
			};
		},
		computed: {
			listIsEmpty() {
				return this.list.length === 0;
			}
		},
		watch: {
			deletedChip(){
				let index = this.groupSelect.indexOf(this.deletedChip.namespace);

		        if (index >= 0) {
		          this.groupSelect.splice(index, 1);
		        }
			},
			list(value) {
				this.items = Object.assign([], value);
			},
			groupSelect(){
				this.$emit('groupSelect', this.groupSelect)
			},
			query(value) {
				this.$refs.input.value = value;
				this.setParentUpdateValue(value);
				this.renderFilteredList()
			},
			value(value) {
				this.query = value;
				this.setParentUpdateValue(value);
			}
		},
		methods: {
			init(){
				this.renderFilteredList();
			},
			debounceUpdate() {
				this.onInput();

				if (this.timeout) {
					window.clearTimeout(this.timeout);
				}

				this.timeout = window.setTimeout(() => {
					if (!this.listIsEmpty) {
						this.renderFilteredList();
						// this.onFocus() ;
						return;
					}
					this.update();
				}, this.debounce);
			},
			hit(item) {
				this.query = item[this.printAttribute];
				this.$refs.input.value = item[this.printAttribute];
				this.selected = item;
				this.onInput();
				this.$emit('selected', this.selected, this.$refs.input.value);
			},
			onFocus() {
				if (this.parentContainer) {
					this.parentContainer.isFocused = true;
				}
			 this.$refs.input.focus();
			 this.debounceUpdate()
			},
			onInput() {
				this.updateValues();
				this.$emit('change', this.$refs.input.value);
				this.$emit('input', this.$refs.input.value);
			},
			renderFilteredList() {
				this.items.splice(0);

				this.items = this.list.map((v)=>{
					v.name.toLowerCase().indexOf(this.query)> -1? v.show=true:v.show=false;
					if(this.query.length==0) v.show=true
					return v
				})
				// if(this.items.length == 0) this.items.push({name:"No matches for your query",disabled:true})
				// if(!this.$refs.menu.active) this.toggleMenu();
			},
			reset() {
				this.items = [];
				this.query = '';
				this.loading = false;
			},
			setParentValue(value) {
				this.parentContainer.setValue(value || this.$refs.input.value);
			},
			setParentDisabled() {
				this.parentContainer.isDisabled = this.disabled;
			},
			setParentRequired() {
				this.parentContainer.isRequired = this.required;
			},
			setParentPlaceholder() {
				this.parentContainer.hasPlaceholder = !!this.placeholder;
			},
			setParentUpdateValue(value) {
				this.setParentValue(value);
				this.updateValues(value);
			},
			update() {
				if (!this.query && !this.list.length) {
					return this.reset();
				}

				if (this.minChars && this.query.length < this.minChars) {
					return;
				}

				this.loading = true;

				const queryObject = { [this.queryParam]: this.query };

				this.fetch(queryObject)
					.then((response) => {
						if (this.query) {
							let data = response || response.data || response.body;

							data = this.prepareResponseData ?
								this.prepareResponseData(data) :
								data;
							this.items = this.limit ?
								data.slice(0, this.limit) :
								data;

							this.loading = false;

							this.toggleMenu();
						}
					});
			},
			toggleMenu() {
				if (this.items.length) {
					this.$refs.menu.toggle();
				}
			},
			updateValues(value) {
				const newValue = value || this.$refs.input.value || this.value;

				this.setParentValue(newValue);
				this.parentContainer.inputLength = newValue ? newValue.length : 0;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.parentContainer = getClosestVueParent(this.$parent, 'md-input-container');
				if (!this.listIsEmpty) {
					this.items = Object.assign([], this.list);
				}
				this.query = this.value;
				this.verifyProps();
				this.setParentDisabled();
				this.setParentRequired();
				this.setParentPlaceholder();
				this.handleMaxLength();
				this.updateValues();

			});
		}
	};
</script>
<style>
	.md-menu-content{
		max-height:300px;
	}
	.filter-select{
		opacity :0;
	}
	.filter-select-menu .md-input{
		height: 50px;
    outline: none;
    border: 0;
    text-indent: 15px;
    border-bottom: 1px solid #c2c0c0;
    z-index:5;
    width:100%;
	}

</style>