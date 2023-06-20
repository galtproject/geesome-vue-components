/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import Helper from "../../services/helper";

const startsWith = require('lodash/startsWith');
const isString = require('lodash/isString');

export default {
  name: 'pretty-hex',
  template: require('./PrettyHex.template'),
  props: ['hex', 'to', 'href', 'full', 'short', 'prefix', 'localePrefix', 'explorerAddressUrl', 'explorerTxUrl', 'highlightCurrentUser', 'hideExplorer'],
  created() {
  },
  watch: {
  },
  methods: {
    copyToClipboard() {
      Helper.copyToClipboard(this.hex);
      this.$notify({
        type: 'success',
        title: this.$locale ? this.$locale.get('pretty_hex.copied_to_clipboard') : "Copied to Clipboard"
      });
    },
    mouseOver() {
      this.$emit('mouseover');
    },
    mouseLeave() {
      this.$emit('mouseleave');
    },
    getExplorerAddressUrl() {
      return ((this.$store && this.$store.state && this.$store.state.explorer_address_url) || this.explorerAddressUrl) + this.hex;
    },
    getExplorerTxUrl() {
      return ((this.$store && this.$store.state && this.$store.state.explorer_tx_url) ||  this.explorerTxUrl) + this.hex;
    },
    isIpfsHash(value) {
      if (!value) {
        return false;
      }
      return (startsWith(value, 'Qm') || this.isCidHash(value)) && /^\w+$/.test(value);
    },
    isCidHash(value) {
      if (!value) {
        return false;
      }
      return startsWith(value.codec, 'dag-') || (isString(value) && value.length === 59 && /^\w+$/.test(value) && (startsWith(value, 'zd') || startsWith(value, 'ba')));
    },
  },
  computed: {
    hexUrl() {
      if (this.hideExplorer) {
        return null;
      }
      if (this.type === 'address') {
        return this.getExplorerAddressUrl();
      } else if (this.type === 'transaction') {
        return this.getExplorerTxUrl();
      } else if (this.type === 'ipfs') {
        return location.host.includes('localhost') ? 'http://localhost:2052/ipfs/' + this.hex : '/ipfs/' + this.hex;
      }
      return this.hex;
    },
    user_wallet() {
      return this.$store && this.$store.state && this.$store.state.user_wallet;
    },
    isCurrentUserWallet() {
      return this.user_wallet && this.hex && this.user_wallet.toLowerCase() === this.hex.toLowerCase();
    },
    type() {
      if (startsWith(this.hex, '0x') && this.hex.length === 42) {
        return 'address';
      } else if (startsWith(this.hex, '0x') && this.hex.length === 66) {
        return 'transaction';
      } else if (this.isIpfsHash(this.hex)) {
        return 'ipfs';
      }
    },
    showHex() {
      if (!this.hex) {
        return "...";
      }
      return this.full ? this.hex : Helper.cutHex(this.hex, this.short);
    }
  },
  data() {
    return {
    }
  }
}
