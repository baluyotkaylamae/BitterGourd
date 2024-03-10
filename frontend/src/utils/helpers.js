import { toast } from 'react-toastify';


export const authenticate = (data, next) => {
    if (window !== 'undefined') {
        // console.log('authenticate', response)
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user', JSON.stringify(data.user));
    }
    next();
};

export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'));
        } else {
            return false;
        }
    }
};

// access user name from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        } else {
            return false;
        }
    }
};

export const isAdminUser  = () => {
    const user = getUser();
    return user && user.role === 'admin';
};

// remove token from session storage
export const logout = next => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    // next();
    window.location.reload();
};

export const errMsg = (message = '') => toast.error(message, {
    position: 'top-center'
});
export const successMsg = (message = '') => toast.success(message, {
    position: 'top-center'
});