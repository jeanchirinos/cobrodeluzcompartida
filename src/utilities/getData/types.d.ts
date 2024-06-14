type DefaultArgs = {
  url: string | URL
  config?: Parameters<typeof fetch>['1']
  /**
   * - auth-required: Requires a token
   * - auth-not-required: Doesn't require a token
   * - auth-no-auth: Petition can work with/without a token
   */
  authMode?: 'auth-required' | 'auth-not-required' | 'auth-no-auth'
}

type ArgsNewGetDataModeDefault = { mode?: 'default' }
type ArgsNewGetDataModeNull = { mode?: 'null' }
type ArgsNewGetDataModeErrorPage = { mode?: 'error-page' }

type ArgsNewGetData = DefaultArgs & (ArgsNewGetDataModeDefault | ArgsNewGetDataModeNull | ArgsNewGetDataModeErrorPage)
