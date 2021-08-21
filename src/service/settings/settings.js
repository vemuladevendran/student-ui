import { environment } from '../../environments/environment';


const Settings = () => {
    const API_BASE_URL = `${environment.API_HOST}${environment.API_BASE}`
    return (API_BASE_URL);
}


module.exports = {
    Settings,
}
