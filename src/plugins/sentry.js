import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import router from '@/router'

Sentry.init({
  Vue,
  dsn: 'http://bbc3c2efdffc4f56a66fd97f1366376e@192.168.56.101:9000/5',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  tracesSampleRate: 1.0
})
