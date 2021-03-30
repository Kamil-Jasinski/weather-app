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
    <!-- <button @click="log">LOG HOME</button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddCity from "@/components/AddCity.vue"; // @ is an alias to /src
import ShortDetails from "@/components/ShortDetails.vue"; // @ is an alias to /src
import Widget from "@/components/Widget.vue"; // @ is an alias to /src

@Component({
  components: {
    AddCity,
    ShortDetails,
    Widget,
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

  mounted() {
    // //SAVE
    // const obj = JSON.stringify({ name: "siema", age: 23 });
    // localStorage.setItem(`something`, obj);
    // //GET
    // const getObj = JSON.parse(localStorage.getItem("something"));
    //REMOVE
    // localStorage.removeItem("name");
    // console.log(getObj);
  }
}
</script>

<style lang="scss">
.home {
  height: 90vh;
  width: 90vw;
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
}
</style>
