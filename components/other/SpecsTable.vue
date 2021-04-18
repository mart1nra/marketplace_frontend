<template>
  <div>
    <v-simple-table dense>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>{{ item.name }}</td>
            <td v-if="item.has">
              <v-icon color="green">mdi-check</v-icon>
            </td>
            <td v-else-if="item.name && item.info">{{ item.info }}</td>
            <td v-else>
              <v-icon color="red">mdi-close</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'Bluetooth',
          has: true,
        },
        {
          name: 'USB Connection',
          has: true,
        },
        {
          name: 'Battery',
          info: '24 hours',
        },
        {
          name: 'Memory card reader',
          has: false,
        },
        {
          name: 'Storage',
          info: '256 GB SSD',
        },
        {
          name: 'Headphone jack',
          has: false,
        },
        {
          name: 'Thunderbolt',
          has: true,
        },
      ],
    }
  },
}
</script>
