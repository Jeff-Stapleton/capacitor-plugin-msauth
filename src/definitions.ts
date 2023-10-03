export interface BaseOptions {
  clientId: string;
  tenant?: string;
  domainHint?: string;
  authorityType?: 'AAD' | 'B2C';
  loginMethod?: 'Popup' | 'Redirect';
  authorityUrl?: string;
  knownAuthorities?: string[];
  keyHash?: string;
}

export interface LoginOptions extends BaseOptions {
  scopes?: string[];
}

export type LogoutOptions = BaseOptions;

export interface MsAuthPlugin {
  initialize(options: LoginOptions): Promise<void>;
  login(options: LoginOptions): Promise<void>;
  logout(options: LogoutOptions): Promise<void>;
  acquireTokenSilent(options: LoginOptions): Promise<{ accessToken: string; idToken: string; scopes: string[] }>;
}
