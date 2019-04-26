<template>
       <ul v-if="total === -1 || total > 0" class="pagination">
            <li class="page-item">
                <span class="page-link" @click="onClickFirstPage">FIRST</span>
            </li>
            <li class="page-item prev">
                <span class="page-link" @click="onClickPreviousPage"><i class="fas fa-arrow-left"></i></span>
            </li>
            <li v-if="total > 0" v-for="page in pages" class="page-item" :key="page.name" :class="{ active: isPageActive(page.name) }">
                <span class="page-link" @click="onClickPage(page.name)">{{ page.name }}</span>
            </li>
            <li class="page-item next">
                <span class="page-link" @click="onClickNextPage"><i class="fas fa-arrow-right"></i></span>
            </li>
            <li v-if="total > 0" class="page-item">
                <span class="page-link" @click="onClickLastPage">Last</span>
            </li>
        </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      if (this.currentPage - 1 >= 1) {
        this.$emit('pagechanged', this.currentPage - 1);
      }
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      if (this.currentPage + 1 <= this.totalPages || this.totalPages === -1) {
        this.$emit('pagechanged', this.currentPage + 1);
      }
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style scoped lang="scss">
@import './../assets/settings';

.next, .prev {
    background-color: $pasc-color-misc;
    margin-left: 10px;
    margin-right: 10px;
    i {
        color: white !important;
    }
}

.pagination {
    z-index: 9999;
    background-color: white;
    padding: 16px;
    justify-content: center;
    &.blocks {
        .page-item.active > a,
        .page-item.active > a:focus,
        .page-item.active > a:hover,
        .page-item.active > span,
        .page-item.active > span:focus,
        .page-item.active > span:hover {
            background-color: $pasc-color-block;
            border-color: $pasc-color-block;
            box-shadow: none;

        }
        .next, .prev {
            background-color: $pasc-color-block;
        }
    }

    &.operations {
        .page-item.active > a,
        .page-item.active > a:focus,
        .page-item.active > a:hover,
        .page-item.active > span,
        .page-item.active > span:focus,
        .page-item.active > span:hover {
            background-color: $pasc-color-operations;
            border-color: $pasc-color-operations;
            box-shadow: none;

        }
        .next, .prev {
            background-color: $pasc-color-operations;
        }
    }

    &.accounts {
        .page-item.active > a,
        .page-item.active > a:focus,
        .page-item.active > a:hover,
        .page-item.active > span,
        .page-item.active > span:focus,
        .page-item.active > span:hover {
            background-color: $pasc-color-account;
            border-color: $pasc-color-account;
            box-shadow: none;
        }
        .next, .prev {
            background-color: $pasc-color-account;
        }
    }
}

</style>
