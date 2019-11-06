
<template>
  <Game />
</template>

<script>
import Game from "./components/Game.vue";
import { METHODS } from "http";

export default {
  name: "App",
  components: {
    Game,
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
