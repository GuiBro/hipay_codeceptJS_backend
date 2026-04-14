exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://hipay.com/en/',
      show: true,
    },
    REST: {
        endpoint: 'https://cloudrun-api-yugcnet4yq-ew.a.run.app',
        prettyPrintJson: true,
        timeout: 10000,
        defaultHeaders: {
          'Authorization': 'Basic ' + Buffer.from('login:password').toString('base64'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      },
      JSONResponse: {}
  },
  include: {
    I: './steps_file.js',
    orderApiPage: "./pages/OrderApi.js"
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    htmlReporter: {
      enabled: true
    },
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      outputDir: 'output/allure-results'
    },
    retryFailedStep: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {}
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './*_test.js',
  name: 'test backend JS'
}