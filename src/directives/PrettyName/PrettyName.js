/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

const lastIndexOf = require('lodash/lastIndexOf');
import Helper from "../../services/helper";

export default {
  name: 'pretty-name',
  template: require('./PrettyName.html'),
  props: ['name'],
  created() {

  },
  watch: {},
  methods: {},
  computed: {
    prettyName() {
      if (!this.name) {
        return '';
      }
      let dotIndex = lastIndexOf(this.name, '.');
      let cutContentLength = 10;
      let endChars = 4;

      if(this.name.length > cutContentLength && dotIndex === -1) {
        dotIndex = this.name.length - 4;
      }
      if (dotIndex <= cutContentLength) {
        return this.name;
      }
      if (this.name.length < cutContentLength + endChars) {
        cutContentLength = cutContentLength - endChars;
      }
      return this.name.slice(0, cutContentLength) + "..." + this.name.slice(dotIndex - endChars);
    },
    copyToClipboard() {
      Helper.copyToClipboard(this.name);

      this.$notify({
        type: 'success',
        title: 'Copied to clipboard'
      });
    }
  },
  data() {
    return {}
  }
}
