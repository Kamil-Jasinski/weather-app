<template>
  <div class="home">
    <AddCity />
    <ShortDetails
      :isDataReady="isDataReady"
      :weekResponse="selectedCityWeekInfo"
    />
    <Widget
      :currCity="widgetSelectedCityData"
      :weeklyData="selectedCityWeekInfo"
      :cityTimeZone="selectedCityName"
      :isDataReady="isDataReady"
    />
    <Loader v-if="showLoader"/>
    <div v-if="showLoader" class="overlay"></div>
    <!-- <button @click="log">LOG HOME</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddCity from "@/components/AddCity.vue"; // @ is an alias to /src
import ShortDetails from "@/components/ShortDetails.vue"; // @ is an alias to /src
import Widget from "@/components/Widget.vue"; // @ is an alias to /src
import Loader from "@/components/Loader.vue"; // @ is an alias to /src

@Component({
  components: {
    AddCity,
    ShortDetails,
    Widget,
    Loader
  },
})
export default class Home extends Vue {
  get response() {
    return this.$store.getters.currentData;
  }
  get isDataReady() {
    return this.$store.getters.isDataReady;
  }

  //For widget & widget
  get selectedCityName() {
    return this.response.timezone;
  }
  get widgetSelectedCityData() {
    return this.response.current;
  }

  get selectedCityWeekInfo(): Array<any> {
    let response: any = [];

    if (this.response?.daily) {
      response = [...this.response?.daily];
      response.shift();
    }

    return response;
  }

  log(): void {
    console.log(this.isDataReady);
  }

  get showLoader() {
    return this.$store.getters.showLoader;
  }
}
</script>

<style lang="scss">
.home {
  position: relative;
  height: auto;
  width: 1400px;
  background-color: #fff;
  border-radius: 25px;
  -webkit-box-shadow: 0px 6px 15px -5px #000000;
  box-shadow: 0px 6px 15px -5px #000000;

  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  padding: 0 0 0 10px;

  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(12, 1fr);

  .overlay{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(237, 61%, 15%, 0.4);
    z-index: 15;
    border-radius: 25px;
  }
}
</style>
