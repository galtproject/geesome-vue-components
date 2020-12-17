/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import axios from 'axios';

export default class Http {
    static get(uri, params = null) {
        return Http.request('get', uri, {params: params});
    }
    static post(uri, data) {
        return Http.request('post', uri, data);
    }
    static put(uri, data) {
        return Http.request('put', uri, data);
    }
    static remove(uri) {
        return Http.request('remove', uri);
    }

    static request(method, uri, data = null){
      return axios[method](uri, data).then((response) => {
        return response;
      });
    }
}
