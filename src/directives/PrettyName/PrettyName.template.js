module.exports = `
<span>
  <span>{{prettyName}}</span>

  <a href @click.prevent.stop="copyToClipboard()" class="icon-link">
      <md-icon class="small-icon">assignment</md-icon>
  </a>
</span>
`;