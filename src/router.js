import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

import Home from './views/Home.vue';
import Account from './views/Account.vue';
import Accounts from './views/Accounts.vue';
import Block from './views/Block.vue';
import Operation from './views/Operation.vue';
import Blocks from './views/Blocks.vue';

import ChartsOperations from './views/Charts/Operations.vue';
import ChartsVolume from './views/Charts/Volume.vue';
import ChartsFees from './views/Charts/Fees.vue';
import ChartsBlockTime from './views/Charts/BlockTime.vue';

Vue.use(Router);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (from.name !== to.name) {
      return {
        x: 0,
        y: 0,
      };
    }
    return savedPosition;
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/accounts/:account',
      name: 'account',
      component: Account,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
    },
    {
      path: '/blocks/',
      name: 'blocks',
      component: Blocks,
    },
    {
      path: '/blocks/:block',
      name: 'block',
      component: Block,
    },
    {
      path: '/operations/:ophash',
      name: 'operation',
      component: Operation,
    },
    {
      path: '/charts/operations',
      name: 'charts-operations',
      component: ChartsOperations,
    },
    {
      path: '/charts/volume',
      name: 'charts-volume',
      component: ChartsVolume,
    },
    {
      path: '/charts/fees',
      name: 'charts-fees',
      component: ChartsFees,
    },
    {
      path: '/charts/blocktime',
      name: 'charts-blocktime',
      component: ChartsBlockTime,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
  gtag('config', 'UA-134085309-1', {'page_path': to.path});
});

export default router;
