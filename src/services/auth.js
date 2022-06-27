import axios from "axios";

class AuthDataService {
  login(email, password) {
    return axios.post(
      "http://localhost:5000/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }
  register(email, password, name) {
    return axios.post(
      "http://localhost:5000/auth/register",
      {
        email,
        password,
        name,
      },
      {
        withCredentials: true,
      }
    );
  }
  getMe() {
    return axios.get("http://localhost:5000/users/me");
  }
}

export default new AuthDataService();
