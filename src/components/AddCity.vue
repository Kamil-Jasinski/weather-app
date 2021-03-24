<template>
  <div class="addCity">
    <form class="add-city-form">
      <input  v-model="searchedPlace" placeholder="Search for places" type="text">
      <button>Add Fav</button>
    </form>

    <div class="saved-forecast">
      <h2 class="forecast">Weatcher Forecast </h2>
        
        <div class="cards">
          <carousel centerMode='true' perPage="2" loop="true" navigationEnabled="true" navigationNextLabel='>' navigationPrevLabel='<'>
             <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>

            <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>

            <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>

            <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>

            <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>

            <slide>
              <div class="city-card">
                <img src="@/assets/placeholder-img-150-200.jpg" alt="">
                <p>City, Country</p>
              </div>
            </slide>
          
         </carousel>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';


@Component({
  components: {
    Carousel,
    Slide
  }
})
export default class AddCity extends Vue {
  @Prop() private msg!: string;
    searchedPlace= '';

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .addCity{
    grid-area: addCity;
    background-color: rgba(255, 255, 255, 0.3);
    color: rgba(15,17,61,1);
    border-bottom: 1px solid rgba(15,17,61,1);

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-template-areas: 
    'AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm'
    'AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm AddCForm'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    'sForecast sForecast sForecast sForecast sForecast sForecast sForecast sForecast'
    ;

    .add-city-form{
      grid-area: AddCForm;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
        input, button {
          padding: 15px;
          background-color: #fff;
          border-radius: 25px;
          border: 1px solid rgba(15,17,61,1);
          outline: none;
        }
        input {
          margin-right: 10px;
        }
        button{
          background-color: rgba(15,17,61,1);
          color: #fff;
        }
        button:hover {
          background-color: rgb(26, 30, 105);
          cursor: pointer;
        }
    }

    .saved-forecast{
      grid-area: sForecast;



      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-areas: 
        'forecast-title'
        'cards'
        'cards'
        'cards'
      ;
        .forecast {
          grid-area: forecast-title;

          max-width: 100%;
        }
        .cards{
          grid-area: cards;

          max-width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 10px;
        .city-card {
          height: 100%;
          // background-color: #333;
          grid-area: city-card;
              img{
                max-height: 150px;
                max-width: 200px;

                border-radius: 25px;
              }
        }
        }
    }


  }
</style>
