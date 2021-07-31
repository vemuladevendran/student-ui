
const { PureComponent } = require("react");

class Token extends PureComponent {
    tokenKey = 'STUDENT_AUTH_TOKEN';

    saveToken(data) {
        localStorage.setItem(this.tokenKey, data);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }


    isTokenExist() {
        return !!this.getToken();
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

};

export default new Token();
