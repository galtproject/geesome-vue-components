/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import Helper from "../../services/helper";

export default {
  name: 'pretty-hex',
  template: require('./PrettyHex.template'),
  props: ['hex', 'to', 'href', 'full', 'short', 'prefix', 'localePrefix', 'explorerAddressUrl', 'explorerTxUrl', 'highlightCurrentUser', 'hideExplorer'],
  created() {
    this.cutHex();
  },
  watch: {
    async hex() {
      this.cutHex();
    }
  },
  methods: {
    cutHex() {
      if (!this.hex) {
        this.showHex = "...";
        this.type = null;
        return;
      }
      if (this.full) {
        this.showHex = this.hex;
      } else {
        this.showHex = Helper.cutHex(this.hex, this.short);
      }
      if (this.hex.length === 42) {
        this.type = 'address';
      } else if (this.hex.length === 66) {
        this.type = 'transaction';
      }
    },
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
    }
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
      }
      return null;
    },
    user_wallet() {
      return this.$store && this.$store.state && this.$store.state.user_wallet;
    },
    isCurrentUserWallet() {
      return this.user_wallet && this.hex && this.user_wallet.toLowerCase() === this.hex.toLowerCase();
    }
  },
  data() {
    return {
      showHex: null,
      type: null
    }
  }
}
