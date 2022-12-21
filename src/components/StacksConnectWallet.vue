<script setup>
import { showConnect } from "@stacks/connect"
import { userSession } from '../stacksUserSession'

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks Vue Starter",
      icon: window.location.origin + "/logo277.png",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  })
}

function disconnect() {
  userSession.signUserOut("/")
}
</script>

<template>
  <div v-if="userSession.isUserSignedIn()">
    <v-btn @click="disconnect">
      Disconnect Wallet
    </v-btn>
    <p>mainnet: {{  userSession.loadUserData().profile.stxAddress.mainnet  }}</p>
    <p>testnet: {{  userSession.loadUserData().profile.stxAddress.testnet  }}</p>
  </div>
  <div v-else>
    <v-btn @click="authenticate">
      Connect Wallet
    </v-btn>
  </div>
</template>

<style scoped>
div {
  margin-top: 8px;
}


</style>