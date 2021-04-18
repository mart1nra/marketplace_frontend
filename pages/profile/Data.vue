<template>
  <v-container class="ml-md-16">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text">My Data</h2>
        <v-divider class="my-3"></v-divider>
        <v-row>
          <v-col cols="12" sm="4" md="2" lg="2" xl="2">
            <div class="d-flex flex-column align-center">
              <v-avatar size="120">
                <v-img :src="user.image" contain></v-img>
              </v-avatar>
              <v-btn color="primary" text class="my-2">Change Avatar</v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="8" md="10" lg="10" xl="10">
            <v-text-field
              v-model="user.name"
              label="Display name"
            ></v-text-field>
            <v-text-field v-model="user.email" label="Email"></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Password"
              type="password"
            ></v-text-field>

            <div class="align-md-center d-flex flex-column flex-md-row">
              <v-checkbox
                v-model="user.verified"
                :label="`Verified Email`"
              ></v-checkbox>
              <v-divider vertical class="mx-6"></v-divider>
              <v-btn outlined color="success">
                <v-icon left color="success">mdi-check-bold</v-icon> Save
                changes
              </v-btn>
              <v-btn outlined color="primary" class="mx-md-3 my-3 my-md-0 mx-0">
                <v-icon left>mdi-shield-account</v-icon> Export Data
              </v-btn>
              <v-btn outlined color="red">
                <v-icon left>mdi-account-remove</v-icon> Delete Account
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Data',
  middleware: 'authentication',
  data() {
    return {
      user: {
        name: 'Alex',
        password: 'coolpassword123',
        email: 'alex@vuetifyjs.com',
        verified: true,
        orders_placed: 12,
        image: require('~/assets/img/person_1.jpg'),
      },
    }
  },
}
</script>

<style></style>
