/* Http codes taken from :
 * https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
 */

class HttpCodes {
  static get SUCCESS() {
    return 200;
  }
  static get CREATED() {
    return 201;
  }
  static get ACCEPTED() {
    return 202;
  }
  static get BAD_REQUEST() {
    return 400;
  }
  static get UNAUTHORIZED() {
    return 401;
  }
}

module.exports = HttpCodes;
