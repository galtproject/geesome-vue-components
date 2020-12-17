/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

const startsWith = require('lodash/startsWith');

import Helper from "../../services/helper";

export default {
    name: 'pretty-doc',
    template: require('./PrettyDoc.html'),
    props: ['doc', 'disableLink'],
    created() {
        this.prettify();
    },
    watch: {
        async doc() {
            this.prettify();
        }
    },
    methods: {
        prettify(){
            this.linkToDoc = "";

            if(!this.doc) {
                this.showDoc = "";
                this.stringDoc = "";
                this.type = null;
                return;
            }

            if(startsWith(this.doc, '0x')) {
                this.stringDoc = Helper.hexToString(this.doc);
            } else {
                this.stringDoc = this.doc;
            }

            if(startsWith(this.stringDoc, 'Qm')) {
                this.type = 'ipfs';
                this.showDoc = Helper.cutHex(this.stringDoc);
            } else {
                this.type = 'url';
                this.showDoc = this.stringDoc;
            }

            let ipfsResource = this.$store && this.$store.state && this.$store.state.ipfs_resource;
            if(!ipfsResource) {
              ipfsResource = 'https://cloudflare-ipfs.com/ipfs/';
            }

            if(this.type === 'ipfs') {
                this.linkToDoc = ipfsResource + this.stringDoc;
            } else if(this.type === 'url') {
                this.linkToDoc = this.stringDoc;
            }
            if(this.disableLink) {
                this.linkToDoc = '';
            }
        },
        copyToClipboard() {
            Helper.copyToClipboard(this.stringDoc);

            this.$notify({
                type: 'success',
                title: this.$locale.get('hex_cut.address_copied_to_clipboard')
            });
        }
    },
    data() {
        return {
            showDoc: null,
            stringDoc: null,
            linkToDoc: null,
            type: null
        }
    }
}
