module.exports = `
<div style="display: flex;" class="gafc-pagination">
    <md-button
            :class="{'md-icon-button': true, 'md-raised md-accent': page.number == currentPage && page.type === 'regular'}"
            v-for="page in pagesButtons"
            :page-number="page.number"
            @click="changePage(page.number)"
            :disabled="page.disabled">
        <span v-if="page.type === 'regular'">{{page.number}}</span>
        <span v-if="page.type === 'dots'">...</span>
        <span v-if="page.type === 'first'">＜＜</span>
        <span v-if="page.type === 'last'">＞＞</span>
    </md-button>
</div>
`;