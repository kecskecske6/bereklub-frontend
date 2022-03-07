<script setup lang="ts">
  import { useUsersStore } from "../store/usersStore";

  const usersStore = useUsersStore();

  const anyLoggedUser = computed(() => (usersStore.getLoggedUser ? true : false));
  const isLoading = computed(() => usersStore.getLoading);
  const errorMsg = computed(() => usersStore.getErrorMsg);
  const isErrorMsg = computed(() => usersStore.getErrorMsg != "");

  interface IReactiveData {
    email: string;
    password: string;
  }

  const r = reactive<IReactiveData>({
    email: "student001@jedlik.eu",
    password: "student001",
  });
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col md="4" sm="8" xs="12">
        <v-card class="elevation-12">
          <v-card-title v-if="!anyLoggedUser">
            Login form
            <v-icon>mdi-login</v-icon>
          </v-card-title>
          <v-card-title v-else>
            Logout form
            <v-icon>mdi-logout</v-icon>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="r.email"
                :disabled="anyLoggedUser"
                :label="anyLoggedUser ? 'Logged user´s email' : 'E-mail'"
                name="login"
                type="text"
              ></v-text-field>
              <v-text-field
                v-if="!anyLoggedUser"
                id="password"
                v-model="r.password"
                :disabled="anyLoggedUser"
                label="Password"
                name="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!anyLoggedUser"
              color="success"
              @click="
                usersStore.loginUser({
                  email: r.email,
                  password: r.password,
                })
              "
            >
              Login
            </v-btn>
            <v-btn v-else class="mt-3" color="warning" @click="usersStore.logOut()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Dialog1: Wait for login response -->
    <v-dialog v-model="isLoading" hide-overlay persistent>
      <v-card color="primary">
        <v-card-text>
          Please wait...
          <v-progress-linear class="mb-0" color="white" indeterminate></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialog 2: Show error messages -->
    <v-dialog v-model="isErrorMsg">
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>{{ errorMsg }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="usersStore.clearErrorMsg()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
  .v-card-title {
    background-color: lightgray;
  }
</style>
