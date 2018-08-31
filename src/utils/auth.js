const storage = window.localStorage;
export default {
  setUser(user) {
    storage.setItem("user", JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(storage.getItem("user"));
  },
  setAuthHeader(token) {
    storage.setItem('authorization', token)
  },
  getAuthHeader() {
    return storage.getItem('authorization');
  },
  signOut(redirectUrl) {
    storage.removeItem('authorization');
    storage.removeItem('user');
    window.location.href = redirectUrl ? redirectUrl : '/login';
  },
  isLoggedIn() {
    return storage.getItem('authorization') !== null;
  }
}
