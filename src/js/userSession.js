const USERNAME = "username";
const TEAMS = "teams";
const LABS = "labs";

class UserSession {
  static exists() {
    return (
      sessionStorage.getItem(USERNAME) !== null &&
      sessionStorage.getItem(TEAMS) !== null &&
      sessionStorage.getItem(LABS) !== null
    );
  }

  static connectUser(username, teams, labs) {
    sessionStorage.setItem(USERNAME, username);
    sessionStorage.setItem(TEAMS, teams);
    sessionStorage.setItem(LABS, labs);
  }

  static clear() {
    sessionStorage.clear();
  }

  static getName() {
    if (this.exists()) return sessionStorage.getItem(USERNAME);
  }

  static getTeams() {
    if (this.exists()) return sessionStorage.getItem(TEAMS);
  }

  static getLabs() {
    if (this.exists()) return sessionStorage.getItem(LABS);
  }
}

export default UserSession;
