export default {
  host: {
    // inTime: /www\.dovepay\.com/.test(window.location.hostname)? 'https://www.dovepay.com': 'https://test.dovepay.com',
    inTime: /www\.dovepay\.com/.test(window.location.hostname)? 'https://www.dovepay.com': 'http://localhost:3013',
  },
  uikit: {
    v2: {
      css: {
        index: '/doveuikit/v2/css/uikit.dovepay.min.css',
        patch: '/doveutils/plugin/css/uikit.v2.patch.css'
      },
      js: '/doveuikit/v2/js/uikit.min.js',
      accordion: {
        css: '/doveuikit/v2/css/components/accordion.min.css',
        js: '/doveuikit/v2/js/components/accordion.min.js'
      },
    },
    v3: {
      css: '/doveuikit/dist/css/uikit.dove-theme.min.css',
      js: '/doveuikit/dist/js/uikit.min.js',
      icon: '/doveuikit/dist/js/uikit-icons.min.js',
    }
  },
  jquery: {
    v2: '/doveutils/plugin/jquery/jquery-2.2.4.min.js',
    v3: '/doveutils/plugin/jquery/jquery-3.6.0.min.js'
  },
  plugin: {
    css: {
      dovepay: '/doveutils/plugin/css/dovepay.css',
      'dovepay-iframe': '/doveutils/plugin/css/dovepay-iframe.css',
      dovemgr: '/doveutils/plugin/css/dovemgr.css'
    },
    js: {
      showModalDialog: '/doveutils/plugin/showModalDialog.js'
    },
    file: {
      logo: '/doveutils/plugin/svg/dovepay.svg'
    }
  }
}