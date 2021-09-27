module.exports = `
<span>
    <a v-if="linkToDoc" :href="linkToDoc" target="_blank">{{showDoc}}</a>
    <span v-else>{{showDoc}}</span>
    
    <a href @click.prevent.stop="copyToClipboard()" class="icon-link">
        <md-icon class="small-icon">assignment</md-icon>
    </a>
</span>
`;