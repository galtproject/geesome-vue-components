/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import Vue from 'vue';
import Helper from "../services/helper";

Vue.filter('prettyDate', Helper.beautyDate);
Vue.filter('prettyPeriod', Helper.prettyPeriod);

const upperFirst = require('lodash/upperFirst');
const snakeCase = require('lodash/snakeCase');

Vue.filter('prettySize', function (bytesSize) {
    bytesSize = parseInt(bytesSize);

    function round(number) {
        return Math.round(number * 1000) / 1000;
    }

    if (bytesSize < 1024 * 100) {
        return round(bytesSize / 1024) + ' Kb';
    }
    if (bytesSize < 1024 ** 3 * 100) {
        return round(bytesSize / (1024 ** 2)) + ' Mb';
    }
    if (bytesSize < 1024 ** 4 * 100) {
        return round(bytesSize / (1024 ** 3)) + ' Gb';
    }
    return round(bytesSize / (1024 ** 4)) + ' Tb';
});

Vue.filter('prettyFileName', function (str) {
    if (str.length <= 20) {
        return str;
    }
    return str ? str.slice(0, 7) + "..." + str.slice(-6) : '';
});

Vue.filter('prettyName', function (str) {
    return upperFirst(snakeCase(str).replace(/_/g, " "));
});

Vue.filter('prettyNumber', function (str) {
    return Helper.prettyNumber(str);
});

export default {};
