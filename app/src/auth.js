const auth = () => {

    const loggedIn = () => {
        if (localStorage.token) {
            return true;
        } 
        return false;
    }

    const login = (token) => {
        localStorage.token = token;

        return true;
    }

    const logout = () => {
        delete localStorage.token;
        if (!localStorage.token) {
            return true;
        }

        return false;
    }

    return {
        loggedIn,
        login,
        logout
    }

}

module.exports = auth;