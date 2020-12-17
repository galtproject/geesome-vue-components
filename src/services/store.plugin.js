/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import Vue from 'vue';
import * as Vuex from "vuex";
const forEach = require('lodash/forEach');

Vue.use(Vuex);

export default {
    install (Vue, options) {
        const mutations = {};
        forEach(options, (value, key) => {
            mutations[key] = (state, newValue) => {
                state[key] = newValue;
            };
        });
        Vue.prototype.$store = new Vuex.Store({
            state: options,
            mutations
        })
    }
}
