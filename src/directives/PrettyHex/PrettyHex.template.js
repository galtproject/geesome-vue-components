module.exports = `
<span class="pretty-hex-container">
    <md-icon v-if="highlightCurrentUser && isCurrentUserWallet">person</md-icon>
    <span v-if="to" @mouseover="mouseOver()" @mouseleave="mouseLeave()">
        <router-link :to="to">
            <span v-if="prefix">{{prefix}}&nbsp;</span><span v-if="localePrefix" v-locale="localePrefix"></span>{{showHex}}
        </router-link>
    </span>
    <span v-else-if="href" @mouseover="mouseOver()" @mouseleave="mouseLeave()" class="current-user-address">
        <a :href="href" target="_blank">
          <span v-if="prefix">{{prefix}}&nbsp;</span><span v-if="localePrefix" v-locale="localePrefix"></span>{{showHex}}
        </a>
    </span>
    <span v-else-if="hexUrl" @mouseover="mouseOver()" @mouseleave="mouseLeave()" class="current-user-address">
        <a :href="hexUrl" target="_blank">
          <span v-if="prefix">{{prefix}}&nbsp;</span><span v-if="localePrefix" v-locale="localePrefix"></span>{{showHex}}
        </a>
    </span>
    <span v-else @mouseover="mouseOver()" @mouseleave="mouseLeave()" class="current-user-address"><span v-if="prefix">{{prefix}}&nbsp;</span><span v-if="localePrefix" v-locale="localePrefix"></span>{{showHex}}</span>
    <span class="separator">&nbsp;</span>
    <a href @click.prevent.stop="copyToClipboard()" class="icon-link"><md-icon class="small-icon fas fa-clipboard-check"></md-icon></a>
</span>
`;