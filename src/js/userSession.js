const USERNAME = "username";
const LABS = "labs";

class UserSession {
  static exists() {
    return (
      sessionStorage.getItem(USERNAME) !== null &&
      sessionStorage.getItem(LABS) !== null
    );
  }

  static connectUser(username, labs) {
    sessionStorage.setItem(USERNAME, username);
    sessionStorage.setItem(LABS, labs);
  }

  static clear() {
    sessionStorage.clear();
  }

  static updateUser(username, labs) {
    sessionStorage.setItem(USERNAME, username);
    sessionStorage.setItem(LABS, labs);
  }

  static getName() {
    if (this.exists()) return sessionStorage.getItem(USERNAME);
  }

  static getLabs() {
    if (this.exists()) return sessionStorage.getItem(LABS);
  }
}

export default UserSession;
