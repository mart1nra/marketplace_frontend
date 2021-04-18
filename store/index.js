export const actions = {
    async nuxtServerInit({ commit, dispatch }) {
        const auth = this.$cookies.get('auth', { parseJSON: true });
        const accountInfo = this.$cookies.get('account', { parseJSON: true });

        if (auth) {
            commit('auth/setSignedIn', Boolean(auth.signedIn));
        }
        if (accountInfo) {
            commit('account/setAccountInfo', accountInfo);
        }
    }
};
