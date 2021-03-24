<template>
  <div class="widget">
    <div class="weather-today">
      <div class="__day">
        <span class="weather-day-icon">
          ICO
        </span>
        <span class="current-day"></span>
      </div>
      <div class="weather-details">
          <div class="__temperature">28&deg;C</div>
          <div class="__location">Berlin, Germany</div>
          <div class="__additiona-info">
            <span class="temperature-sensitive">Feels like 28&deg;C</span>
            <span class="sunset">Sunset 20:57</span>
          </div>
      </div>
    </div>
    <div class="weatcher-chart">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Widget extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.widget {
  grid-area: widget;
  background: rgb(15,17,61);
  background: linear-gradient(0deg, rgba(15,17,61,1) 0%, rgba(17,16,64,1) 35%);
  color: #fff;

  display: grid;
  grid-template-rows: 3fr 2fr;
  grid-template-areas:
    'wToday'
    'wChart'
   ;

      .weather-today {
        grid-area: wToday;

        
      }

      .weatcher-chart {
        grid-area: wChart;

        
      }
}
</style>
