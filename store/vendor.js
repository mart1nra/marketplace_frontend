import repository from '~/store/repository';
import { baseUrl, apiEndpoint } from '~/store/repository';
import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: baseUrl });

export const state = () => ({
  vendor: {}
});

export const mutations = {
  setVendor(state, payload) {
    state.vendor.id = payload.id;
    state.vendor.name = payload.attributes.name;
    state.vendor.aboutUs = payload.attributes.about_us;
  }
}

export const actions = {
  async getVendorInfo({ commit }, payload) {
    const response = await repository.get(`${apiEndpoint}/vendors/${payload}`)
      .then(response => {
        commit('setVendor', response.data.data);
        console.log('hola');
        return response.data.data;
      })
      .catch(error => ({ error: JSON.stringify(error) }));
    return response;
  }
}
