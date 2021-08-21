
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


    getTokenPayloadData(token) {

        const base64PayloadData = token.split('.')[1].split('.')[0];
        const payload = Buffer.from(base64PayloadData, 'base64');
        const data = JSON.parse(payload.toString()).data;
        return (data);
    }

};

export default new Token();
