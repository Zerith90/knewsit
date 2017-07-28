<template>
    <div class="datepicker-container">
        <!-- <label>Date Range</label> -->
        <!-- <md-input type="text"
               :class="classDesign"
               :value="date_formatted()"
               @focus="showDatepicker"
               @click.native="showDatepicker"> -->
        <!-- <input type="hidden"
               :id="id"
               :name="name"
               :value="date_raw"> -->

        <datepicker-agenda :disable-passed-days="disablePassedDays"
                           :doubled="doubled"
                           :disabled-days="disabledDays"
                           :lang="lang"
                           :orientation="orientation"
                           :show="isVisible"
                           :dateObj="dateObj"
                           :disableFrom="disableFrom"
                           @change="selectDate"
                           @hide="hideDatePicker"
                           @cancel="cancelDateSelection">
        </datepicker-agenda>
    </div>
</template>

<script>
    import moment from 'moment';
    import DatepickerAgenda from './components/DatepickerAgenda.vue';
    export default {
        components: {
            'datepicker-agenda': DatepickerAgenda
        },
        props: {
            classDesign: { type: String, default: '' },
            disablePassedDays: { type: Boolean, default: false },
            disabledDays: { type: Array, default() { return [] } },
            doubled: { type: Boolean, default: false },
            format: { type: String, default: 'YYYY-MM-DD' },
            id: { type: String, default: 'vue-datepicker' },
            lang: { type: String, default: 'en' },
            name: { type: String, default: 'datepicker' },
            orientation: { type: String, default: 'portrait' },
            open:{type:Boolean},
            dateObj:{type:Object},
            range:{type:Boolean, default:false},
            disableFrom:{type:String}
        },
        data() {
            return {
                isVisible: false
            };
        },
        computed: {

            date_raw() {
                if (this.date) return this.date.format('YYYY-MM-DD');
                return '';
            }
        },
        watch:{
            open(){
                this.showDatepicker()
            }
        },
        mounted() {
            moment.locale(this.lang);
            
        },
        methods: {
            date_formatted() {
                if(this.dateObj.startDate && this.dateObj.endDate){
                    return this.dateObj.startDate.format("ddd, DD MMM YYYY") + " - " + this.dateObj.endDate.format("ddd, DD MMM YYYY")
                }else if(this.dateObj.startDate){
                    return this.dateObj.startDate.format("ddd, DD MMM YYYY")
                }else{
                    return moment().format("ddd, DD MMM YYYY")
                }
                console.log(this.dateObj,"<------")
                return '';
            },
            selectDate(newDate) {
                this.dateObj.readable = this.date_formatted()
            },
            showDatepicker() {
                this.isVisible = true;
                setTimeout( () => document.addEventListener('click', this.hideDatePicker), 0);
            },
            hideDatePicker() {
                this.isVisible = false;
                document.removeEventListener('click', this.hideDatePicker);
            },
            cancelDateSelection() {
                this.hideDatePicker();
            }
        }
    };
</script>
<style lang="sass">
    .datepicker-container {
        position: relative;
    }

</style>