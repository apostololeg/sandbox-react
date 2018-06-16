import { bind } from 'decko'

export default {
    name: null,
    email: null,
    isLogged: false,

    @bind
    setUserData({ name, email }) {
        this.name = name;
        this.email = email;
        this.isLogged = true;
    },

    @bind
    unsetUserData() {
        this.name = null;
        this.email = null;
        this.isLogged = false;
    }
}
