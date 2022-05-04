import { state } from './constants'

class CustomResponse {
    #successResponseCode = 200;
    #successResponseState = state;
    #authCode;

    constructor(responseCode, responseState) {
        this.responseCode = responseCode;
        this.responseState = responseState;
    }

    /**
     * @param {any} authCode
     */
    set authCode(authCode) {
        this.#authCode = authCode;
    }

    get authCode() {
        return this.#authCode;
    }


    checkIfSuccessCode() {
        return this.responseCode != null && this.responseCode === this.#successResponseCode
    }

    checkIfSuccessState() {
        return this.responseState != null && this.responseState === this.#successResponseState;
    }

}

export default CustomResponse;