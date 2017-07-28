<template lang="html">
  <div class="md-chips md-chips-autocomplete"
    :class="[classes]"
    md-input-placeholder="+harlow"
    @focus="onFocus"
    @blur="onBlur">
    <md-chip
      v-for="chip in selectedChips"
      :md-deletable="!mdStatic"
      :disabled="disabled"
      @delete="deleteChip(chip)">
      <span v-text="chip[printAttribute]"></span>
      <!-- <slot :value="chip"></slot> -->
    </md-chip>

    <md-autocomplete
      v-model="currentChip"
      ref="autocomplete"
      :debounce="debounce"
      :disabled="disabled"
      :required="required"
      :list="list"
      :multiSelect="multiSelect"
      :filterList="filterList"
      :placeholder="mdInputPlaceholder"
      :id="inputId"
      :prepareResponseData="prepareResponseData"
      :printAttribute="printAttribute"
      :queryParam="queryParam"
      :deletedChip="deletedChip"
      @keydown.enter.stop="addChip"
      @keydown.native.prevent.enter="addChip"
      @keydown.native.prevent.186="addChip"
      @selected="addChip"
      @groupSelect="addGroup"/>
  </div>
</template>

<script>
  import autocompleteCommon from '../utils/autocomplete-common';
  import getClosestVueParent from '../utils/getClosestVueParent';
  import mdAutocomplete from '../mdAutocomplete/mdAutocomplete.vue';
  import uniqueId from '../utils/uniqueId';

  export default {
    components:{
      mdAutocomplete
    },
    props: {
      mdInputId: String,
      mdInputName: String,
      mdInputPlaceholder: String,
      mdInputType: {
        type: String,
        default: 'text'
      },
      mdMax: {
        type: Number,
        default: Infinity
      },
      mdStatic: Boolean,
      value: Array,
      items:Array,
      multiSelect:Boolean
    },
    mixins: [autocompleteCommon],
    data() {
      return {
        currentChip: '',
        deletedChip:null,
        inputId: this.mdInputId || `chips-${uniqueId()}`,
        selectedChips: this.value,
        parentContainer: null,
      };
    },
    computed: {
      classes() {
        return {
          'md-static': this.mdStatic,
          'md-disabled': this.disabled
        };
      },
      hasReachedMaxSize() {
        return this.selectedChips && this.selectedChips.length === this.mdMax;
      }
    },
    methods: {
      addGroup(a){
        this.selectedChips = this.list.filter(v=>{
            return a.indexOf(v.namespace)>-1
        })
      },
      addChip(selected = null) {
        if (!this.hasReachedMaxSize) {
          const value = selected ||
            { [this.printAttribute]: this.currentChip.trim() };
          if (this.selectedChips.indexOf(value) < 0) {
            this.selectedChips.push(value);
            this.currentChip = null;
            this.$emit('input', this.selectedChips);
            this.$emit('change', this.selectedChips);
            this.applyAutocompleteFocus();
          }
        }
      },
      applyAutocompleteFocus() {
        this.$nextTick(() => {
          this.$refs.autocomplete.onFocus();
        });
      },
      deleteChip(chip) {
        let index = this.selectedChips.indexOf(chip);

        if (index >= 0) {
          this.selectedChips.splice(index, 1);
        }
        this.deletedChip = chip
        this.$emit('change', this.selectedChips);
        this.applyAutocompleteFocus();
      },
      deleteLastChip() {
        if (!this.currentChip) {
          this.selectedChips.pop();
          this.$emit('change', this.selectedChips);
          this.applyAutocompleteFocus();
        }
      },
      onFocus() {
        if (this.parentContainer) {
          this.parentContainer.isFocused = true;
        }
        this.$refs.autocomplete.onFocus();
      },
      onInput() {
        this.updateValues();
        // this.$emit('change', this.$refs.input.value);
        // this.$emit('input', this.$refs.input.value);
        // this.$emit('selected', this.selected, this.$refs.input.value);
      },
      onBlur() {
        this.parentContainer.isFocused = false;
        // this.setParentValue();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.parentContainer = getClosestVueParent(this.$parent, 'md-input-container');

        // this.query = this.value;

        // this.verifyProps();

        // this.setParentDisabled();
        // this.setParentRequired();
        // this.setParentPlaceholder();
        // this.handleMaxLength();
        // this.updateValues();
      });
    }
  };
</script>

<style lang="sass">
  .md-chips-autocomplete{
    width:inherit
  }
</style>
