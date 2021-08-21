
import axios from "axios"
import { SettingsService } from '../settings/settings';


const getUsers = () => {
    return (axios.get(`${SettingsService.Settings}/users`));
}



module.exports = {
    getUsers,
}