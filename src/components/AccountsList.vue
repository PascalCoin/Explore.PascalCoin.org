<template>
    <div class="table-responsive">
        <table class="table table-striped" style="width: 100%;">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Balance</th>
                <th># Operations</th>
                <th>Type</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="account in accounts" :key="account.account.account">
                <td>
                    <i v-if="account.isForSale()" class="fa fa-shopping-cart"></i>
                    <router-link
                            :to="{name: 'account', params: { account: account.account.account }}">
                        <account-number :account="account.account"></account-number>
                    </router-link>
                </td>
                <td>{{account.name}}</td>
                <td><pascal :amount="account.balance"></pascal></td>
                <td>{{account.nOperation}}</td>
                <td>{{account.type}}</td>
                <td><pascal v-if="isListed(account)" :amount="account.price"></pascal></td>
            </tr>
            </tbody>
        </table>
        <div v-if="accounts.length === 0" class="alert bg-light">
            <div class="container">
                <div class="alert-icon">
                    <i class="material-icons">info_outline</i>
                </div>
                <b>Info:</b> No accounts found.
            </div>
        </div>
    </div>
</template>

<script>

import Account from 'pascalcoin/src/Types/Account';
import AccountNumber from './AccountNumber.vue';
import Pascal from './Pascal.vue';

export default {
  name: 'accounts-list',
  props: ['accounts'],
  components: {
    AccountNumber,
    Pascal,
  },
  methods: {
    isListed(account) {
      return account.state === Account.STATE_LISTED;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
