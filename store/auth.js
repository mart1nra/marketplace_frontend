export const state = () => ({
    signedIn: false
});

export const mutations = {
    setSignedIn(state, payload) {
        state.signedIn = payload;
    }
};

export const actions = {
    setAuthStatus({ commit, state }, payload) {
        commit('setSignedIn', payload);
        const cookieParams = {
            signedIn: state.signedIn
        };

        this.$cookies.set('auth', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }
};
