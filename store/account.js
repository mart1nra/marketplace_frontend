import { makeClient } from '@spree/storefront-api-v2-sdk'

const client = makeClient({ host: 'http://localhost:3000' });

export const state = () => ({
  accountInfo: null,
  cartInfo: null
});

export const mutations = {
  setAccountInfo(state, payload) {
    state.accountInfo = payload;
  },
  setCartInfo(state, payload) {
    state.cartInfo = payload;
  }
}

export const actions = {
  async getAccountInfo({ commit }, payload) {
    const response = await client.authentication.getToken({
      username: payload.username,
      password: payload.password
    }).then(async response => {
        if (response.isSuccess()) {
          const bearerToken = response.success().access_token;
          const accountInfo = await client.account.accountInfo({ bearerToken })
            .then(response => {
              commit('setAccountInfo', { data: response.success().data.attributes });
              const cookieParams = {
                token: bearerToken,
                data: response.success().data.attributes
              };
              this.$cookies.set('account', cookieParams, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
              });
            })
            .catch(error => ({ error: JSON.stringify(error) }));
          return true;
        } else {
          return null
        }
      })
      .catch(error => ({ error: JSON.stringify(error) }));
    return response;
  }
}
