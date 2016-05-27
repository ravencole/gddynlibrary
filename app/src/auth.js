const auth = () => {

    const loggedIn = () => {
        if (localStorage.token) {
            return true;
        } 
        return false;
    }

    const login = (token) => {
        localStorage.token = token;

        return false;
    }

    const logout = () => {
        delete localStorage.token;
        if (!localStorage.token) {
            return true;
        }

        return false;
    }

    return {
        loggedIn: loggedIn,
        login: login,
        logout: logout
    }

}

module.exports = auth;