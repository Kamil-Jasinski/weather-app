<template>
  <form class="add-city-form">
    <label class="__label">
      <font-awesome-icon class="search-ico" icon="search-location" />
      <v-select
        placeholder="Search for your city"
        :options="cityNames"
        v-model="selectedCityInput"
        @input="updateValue"
      ></v-select>
    </label>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import cityJson from "@/assets/json/city.list.json";

@Component({})
export default class SearchBar extends Vue {
  @Prop() clearInput!: boolean;
  selectedCityInput = "";

  @Watch("clearInput")
  shouldClearInput(): void {
    if (this.clearInput === true) {
      this.selectedCityInput = "";
    } else if (this.clearInput === false) {
      //nothing
    }
    this.$emit("clear-input", false);
  }

  @Watch("selectedCityInput", { immediate: false, deep: true })
  updateValue(): void {
    //     console.log("Update - child");
    this.$emit("change-input", this.selectedCityInput);
  }

  get cityNames(): string[] {
    let cityNamesArr: Array<string> = [];

    //Get names from json
    cityJson.forEach((el) => {
      const cityName = el.name;
      cityNamesArr.push(cityName);
    });

    return cityNamesArr;
  }
}
</script>
