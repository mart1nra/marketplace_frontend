<template>
  <v-container class="ml-md-16">
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12" xl="10">
        <h2 class="primary--text mb-6">My Invoices</h2>
        <v-simple-table v-if="orders">
          <template #default>
            <thead>
              <tr>
                <th class="font-weight-bold">Status</th>
                <th class="font-weight-bold">OrderID</th>
                <th class="font-weight-bold">Pending payment</th>
                <th class="font-weight-bold">Expires</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orders" :key="item.name">
                <td>
                  <v-chip
                    small
                    class="font-weight-bold"
                    :color="item.paid ? 'success' : 'warning'"
                  >
                    <div v-if="item.paid">
                      <v-icon left small>mdi-check-all</v-icon>
                      <span>Paid successfully</span>
                    </div>
                    <div v-else>
                      <v-icon left small>mdi-timelapse</v-icon>
                      <span>Pending payment</span>
                    </div>
                  </v-chip>
                </td>
                <td>{{ item.name }}</td>
                <td class="font-weight-bold">${{ item.price }}</td>
                <td>{{ randomDate() }}</td>
                <td>
                  <div
                    class="d-flex align-center justify-center justify-md-start"
                  >
                    <v-icon color="red">mdi-file-pdf-outline</v-icon>
                    <v-icon color="success" class="mx-2"
                      >mdi-file-excel-outline</v-icon
                    >
                    <v-icon color="primary">mdi-file-eye-outline</v-icon>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <h4 class="font-weight-black my-6 text-right">Total price: $1024.00</h4>

        <v-divider class="my-3"></v-divider>
        <h2 class="primary--text">FAQ</h2>

        <Expansion></Expansion>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          name: '89123891',
          price: 159.0,
          paid: false,
        },
        {
          name: '38945893',
          price: 237.0,
          paid: true,
        },
        {
          name: '52454589',
          price: 262.0,
          paid: true,
        },
      ],
    }
  },
  methods: {
    randomDate() {
      const date = new Date(
        +new Date() - Math.floor(Math.random() * 10000000000)
      )
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(date).toLocaleDateString('en-EN', options)
    },
  },
}
</script>

<style>
tr:hover td:first-child {
  border-left: 5px solid rgb(84, 96, 255);
  transition: border-left 0.2s !important;
}
</style>
