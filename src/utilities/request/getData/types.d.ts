type DefaultArgs = {
  url: string | URL
  config?: Parameters<typeof fetch>['1']
  /**
   * Determines the authentication mode of the petition.
   *
   * - `'auth-required'`: Requires a token.
   * - `'auth-not-required'`: Doesn't require a token.
   * - `'auth-no-auth'`: Petition can work with/without a token.
   *
   * @default 'auth-required'
   *
   */
  authMode?: 'auth-required' | 'auth-not-required' | 'auth-no-auth'
  /**
   * Determines the return type of the function.
   *
   * - `'default'`: Infer return type to be as Response. **(Default)**
   * - `'null'`: Infer return type to be as Response or null.
   * - `'error-page'`: Infer return type to be as Response, because if it fails i will throw error page.
   *
   * @default 'default'
   *
   */
  mode?: 'default' | 'null' | 'error-page'
}
