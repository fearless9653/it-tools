import { figue } from 'figue';

export const config = figue({
  app: {
    version: {
      doc: 'Application current version',
      format: 'string',
      default: '0.0.0',
      env: 'PACKAGE_VERSION',
    },
    lastCommitSha: {
      doc: 'Application last commit SHA version',
      format: 'string',
      default: '',
    },
    baseUrl: {
      doc: 'Application base url',
      format: 'string',
      default: '/',
      env: 'BASE_URL',
    },
    env: {
      doc: 'Application current env',
      format: 'enum',
      values: ['production', 'development', 'preview', 'test'],
      default: 'development',
    },
  },
  plausible: {
    isTrackerEnabled: {
      doc: 'Is the tracker enabled',
      format: 'boolean',
      default: false,
    },
    domain: {
      doc: 'Plausible current domain',
      format: 'string',
      default: '',
    },
    apiHost: {
      doc: 'Plausible remote api host',
      format: 'string',
      default: '',
    },
    trackLocalhost: {
      doc: 'Enable or disable localhost tracking by plausible',
      format: 'boolean',
      default: false,
    },
  },
  showBanner: {
    doc: 'Show the banner',
    format: 'boolean',
    default: false,
  },
  showSponsorBanner: {
    doc: 'Show the sponsor banner',
    format: 'boolean',
    default: false,
  },
})
  .loadEnv({
    ...import.meta.env,
    // Because the string 'import.meta.env.PACKAGE_VERSION' is statically replaced during build time (see 'define' in vite.config.ts)
    PACKAGE_VERSION: import.meta.env.PACKAGE_VERSION,
    // 添加其他环境变量的默认值
    GIT_SHORT_SHA: '',
    PROD: import.meta.env.PROD,
  })
  .validate()
  .getConfig();
