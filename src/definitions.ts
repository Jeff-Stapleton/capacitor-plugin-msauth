import type {
  AccountInfo,
  AuthenticationResult,
  Configuration,
  EndSessionPopupRequest,
  PopupRequest,
  SilentRequest,
} from '@azure/msal-browser';

export type { Configuration, SilentRequest, PopupRequest, EndSessionPopupRequest, AuthenticationResult, AccountInfo };

export interface MsAuthPlugin {
  initialize(options: Configuration): Promise<void>;
  loginPopup(popupRequest: PopupRequest): Promise<AuthenticationResult>;
  logoutPopup(endSessionPopupRequest: EndSessionPopupRequest): Promise<void>;
  acquireTokenSilent(silentRequest: SilentRequest): Promise<AuthenticationResult>;
  setActiveAccount(accountInfo: AccountInfo): Promise<void>;
}
