import AuthDataService from "../services/auth";

const userStore = {
  state: () => ({
    isAuthentication: false,
    accessToken: null,
    userDetails: {
      email: '',
      password: ''
    },
  }),
  mutations: {
    setIsAuthentication(state, payload) {
      state.isAuthentication = payload.isAuthentication;
      state.accessToken = payload.accessToken;
    },
    setUsersDetails(state, payload) {
      state.userDetails.email = payload.email
      state.userDetails.password = payload.password
    }
  },
  actions: {
    async login(context, { email, password }) {

      const res = await AuthDataService.login(email, password);

      if (res) {
        let isAuthentication = true;
        let accessToken = res.data.accessToken;
        context.commit("setIsAuthentication", {
          isAuthentication,
          accessToken,
        });
      } else {
        context.commit("setIsAuthentication", false);
      }
    },
    async register(context, { email, password, name }) {

      const res = await AuthDataService.register(email, password, name);
      console.log(res);
      if (res) {
        context.commit("setUsersDetails", {email: res.data.email, password: res.data.password});
      }
    },
  },
  // getters: { ... }
};
export default userStore;
