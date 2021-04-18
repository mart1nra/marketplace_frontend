<template>
  <div class="my-6">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Lorem ipsum dolor sit.
          <template #actions>
            <v-icon color="primary"> $expand </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          Lorem ipsum dolor sit amet consectetur adipisicing.
          <template #actions>
            <v-icon color="error"> mdi-alert-circle </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          expand-icon="mdi-help-circle-outline"
          disable-icon-rotate
        >
          Lorem ipsum dolor sit amet consectetur.
        </v-expansion-panel-header>
        <v-expansion-panel-content
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.</v-expansion-panel-content
        >
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
