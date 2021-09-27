/*
 * Copyright ©️ 2020 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

export default {
  name: 'pagination',
  template: require('./Pagination.template'),
  props: ['total', 'perPage', 'currentPage', 'displayPages', 'displayPagesBefore', 'displayPagesAfter', 'showEdges'],
  created() {
    if (!this.currentPage) {
      this.changePage(1);
    }
  },
  watch: {},
  methods: {
    changePage(pageNumber) {
      this.$emit('update:current-page', pageNumber);

      this.sendChangeEvent(pageNumber);
    },
    sendChangeEvent(pageNumber) {
      const endIndex = pageNumber * this.perPage;

      this.$emit('change', {
        pageNumber: pageNumber,
        startIndex: (pageNumber - 1) * this.perPage,
        endIndex: endIndex + 1 <= this.total ? endIndex : this.total - 1,
      });
    }
  },
  computed: {
    _displayPagesBefore() {
      return this.displayPagesBefore || Math.round(this.displayPages / 2);
    },
    _displayPagesAfter() {
      return this.displayPagesAfter || Math.round(this.displayPages / 2);
    },
    pagesButtons() {
      if (this.pagesCount > this._displayPagesAfter) {
        const pages = [];

        let groupSizeBefore = this._displayPagesBefore;
        let groupSizeAfter = this._displayPagesAfter;
        let currentGroup = Math.ceil(this.currentPage / groupSizeBefore);

        // let lastGroup = Math.ceil(this.pagesCount / groupSizeBefore);
        // if(currentGroup === lastGroup) {
        //     currentGroup--;
        // }

        let lastPage = currentGroup === 1 ? 1 : (currentGroup - 1) * groupSizeBefore;

        let currentPage = lastPage;

        if(this.showEdges) {
          pages.push({
            number: 1,
            type: 'first',
            disabled: this.currentPage == 1
          });
        }

        if (lastPage != 1) {
          pages.push({
            number: lastPage,
            type: 'dots'
          });
          currentPage++;
        }

        lastPage = currentPage;

        // console.log('currentPage', currentPage);
        // console.log('lastPage', lastPage);
        for (; currentPage - lastPage < groupSizeBefore && currentPage <= this.pagesCount; currentPage++) {
          pages.push({
            number: currentPage,
            type: 'regular'
          });
        }

        if (this.pagesCount > currentPage) {
          const restPagesCount = this.pagesCount - currentPage;

          if (restPagesCount > groupSizeAfter) {
            pages.push({
              number: currentPage,
              type: 'dots'
            });

            currentPage = this.pagesCount - groupSizeAfter + 1;
          }

          lastPage = currentPage;

          for (; currentPage - lastPage < groupSizeAfter; currentPage++) {
            pages.push({
              number: currentPage,
              type: 'regular'
            });
          }
        }

        if(this.showEdges) {
          pages.push({
            number: this.pagesCount,
            type: 'last',
            disabled: this.currentPage == this.pagesCount
          });
        }

        return pages;
      } else {
        return Array.from(Array(this.pagesCount).keys()).map(i => {
          return {
            number: i + 1,
            type: 'regular'
          }
        });
      }
    },
    pagesCount() {
      let changed = false;
      if (this.lastTotal != null && this.lastTotal != this.total) {
        this.changePage(1);
        changed = true;
      }
      if (this.lastPerPage != null && this.lastPerPage != this.perPage && !changed) {
        this.changePage(1);
      }
      return Math.ceil(this.total / this.perPage);
    }
  },
  data() {
    return {
      lastTotal: null,
      lastPerPage: null
    }
  }
}
