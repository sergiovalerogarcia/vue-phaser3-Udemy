
<template>
<!-- <v-app>
    <v-navigation-drawer v-model="drawer" absolute>
      <v-list dense>
        <v-list-item>
          <v-toolbar-title class="headline text-uppercase">
            <span>No</span>
            <span class="font-weight-light">GAMES</span>
          </v-toolbar-title>
        </v-list-item>jjj
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-btn v-on:click="changeGame">Change game</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer></v-app>  -->
  <!-- <GameFarm /> -->
  <game-virtual-pet />
</template>

<script>
import GameFarm from "./components/GameFarm.vue";
import GameVirtualPet from "./components/GameVirtualPet.vue";
import { METHODS } from "http";

export default {
  name: "App",
  components: {
    GameFarm,
    GameVirtualPet
  },
  data: () => ({
    gameValue: true
  }),
  methods: {
    changeGame() {
      this.gameValue = !this.gameValue;
    }
  }
};
</script>
