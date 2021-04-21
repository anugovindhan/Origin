import * as types from '../statusTypes';

export function loggedIn() {
    return {type: types.LOGGED_IN};
}
export function registerUserAction () {
    return {
        type: types.REGISTER_USER
    }
};