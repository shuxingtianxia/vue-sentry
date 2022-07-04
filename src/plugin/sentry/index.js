import Vue from 'vue'
// sentry
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import router from '@/router'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    Vue,
    dsn: 'http://258adb86af5f456389848c3a841eb6aa@192.168.56.101:9000/6',
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
      })
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    release: process.env.VUE_APP_RELEASE
  })
}
