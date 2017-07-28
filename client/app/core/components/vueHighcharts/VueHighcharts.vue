<template>
  <div class="highcharts">
  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  // import {warn} from './debug'
  Highcharts.setOptions({
    colors:['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
             '#FF9655', '#FFF263', '#6AF9C4'],
  })
  export default {
    props: ['options'],
    name: 'VueHighcharts',
    data () {
      return {
        chart: null
      }
    },
    mounted(){
      if (!this.getChart() && this.options) {
        console.log("INIT")
        this._init();
      }
    },
    methods: {
      getChart(){
        return this.chart
      },
      addSeries(options){
        this.delegateMethod('addSeries', options);
      },
      removeSeries(){
        while(this.getChart().series.length !== 0) {
          this.getChart().series[0].remove();
        }
      },
      mergeOption(options){
        this.delegateMethod('update', options)
      },
      showLoading(txt){
        this.getChart().showLoading(txt);
      },
      hideLoading(){
        this.getChart().hideLoading();
      },
      delegateMethod(name, ...args){
        if (!this.getChart()) {
          console.log(`Cannot call [$name] before the chart is initialized. Set prop [options] first.`, this)
          return
        }
        return this.getChart()[name](...args)
      },
      _init(){
        if (!this.getChart() && this.options) {
          this.chart = new Highcharts.Chart(this.$el, this.options);
        }
      }
    },
    watch: {
      options() {
        if (!this.getChart() && this.options) {
          this._init()
        } else {
         this.chart=null;
         this._init()
        }
      }
    },
    beforeDestroy(){
      if (this.getChart()) {
        this.getChart().destroy();
      }
    }
  }
</script>