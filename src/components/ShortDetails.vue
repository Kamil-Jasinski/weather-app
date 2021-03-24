<template>
  <div class="shortDetails">
      <div class="details">
        <div class="days">
           <ul>
             <li class="day">
              sunday
             </li>
             <li class="day">
              monday
             </li>
              <li class="day">
              Tuesday
             </li>
             <li class="day">
              wednesday
             </li>
             <li class="day">
              thursday
             </li>
             <li class="day">
              friday
             </li>
             <li class="day">
              saturday
             </li>
           </ul>
        </div>
        <div class="raining-chance">
          <ul>
             <li class="rChance">
               32%
             </li>
             <li class="rChance">
               12%
             </li>
             <li class="rChance">
               12%
             </li>
             <li class="rChance">
               22%
             </li>
             <li class="rChance">
               55%
             </li>
             <li class="rChance">
               21%
             </li>
             <li class="rChance">
                12%
             </li>
           </ul>
        </div>
        <div class="weather-icons">
          <ul>
             <li class="weatcherIcon">
               ICO
             </li>
             <li class="weatcherIcon">
               ICO
             </li>
             <li class="weatcherIcon">
               ICO
             </li>
              <li class="weatcherIcon">
               ICO
             </li>
             <li class="weatcherIcon">
               ICO
             </li>
             <li class="weatcherIcon">
               ICO
             </li>
             <li class="weatcherIcon">
               ICO
             </li>
           </ul>
        </div>
         <div class="temperatures">
          <ul>
            <li class="temperature">
               12&deg;C
            </li>
            <li class="temperature">
                12&deg;C
            </li>
            <li class="temperature">
                12&deg;C
            </li>
            <li class="temperature">
               12&deg;C
            </li>
            <li class="temperature">
               12&deg;C
            </li>
            <li class="temperature">
               12&deg;C
            </li>
            <li class="temperature">
               12&deg;C
            </li>
           </ul>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  props: ['data']
})
export default class ShortDetails extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin columnCell() {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
}
@mixin rowCell() {
  padding: 10px 0;
}

.shortDetails{
  grid-area: shortDetails;
  background-color: rgba(255, 255, 255, 0.3);
  height: 100%;

    .details {
      height: 100%;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      // grid-template-rows: 1fr;
      grid-template-areas:
        'days rainCh wIcons temp'
       ;

          .days{
            grid-area: days;

            @include columnCell();

                .day{
                  @include rowCell();
                }
          }

          .raining-chance {
            grid-area: rainCh;
            @include columnCell();
              .rChance {
                @include rowCell();
              }
          }

          .weather-icons {
            grid-area: wIcons;
            @include columnCell();
              .weatcherIcon{
                @include rowCell();
              }
          
          }

          .temperatures {
            grid-area: temp;
            @include columnCell();
              .temperature{
                @include rowCell()
              }
          }

    }
}
</style>
