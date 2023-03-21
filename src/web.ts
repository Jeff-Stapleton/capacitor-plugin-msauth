import type { AccountInfo, AuthenticationResult, Configuration, EndSessionPopupRequest, PopupRequest, SilentRequest } from '@azure/msal-browser';
import { PublicClientApplication } from '@azure/msal-browser';
import { WebPlugin } from '@capacitor/core';

import type { MsAuthPlugin } from './definitions';

export class MsAuth extends WebPlugin implements MsAuthPlugin {

  private msalInstance: PublicClientApplication | undefined;

  async initialize(config: Configuration): Promise<void> {
    this.msalInstance = new PublicClientApplication(config);
  }

  async loginPopup(popupRequest: PopupRequest): Promise<AuthenticationResult> {
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance?.loginPopup(popupRequest);
  }
  
  async logoutPopup(endSessionPopupRequest: EndSessionPopupRequest): Promise<void> {
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.logoutPopup(endSessionPopupRequest);
  }
  
  async acquireTokenSilent(silentRequest: SilentRequest): Promise<AuthenticationResult> {
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.acquireTokenSilent(silentRequest);
  }

  async setActiveAccount(accountInfo: AccountInfo): Promise<void> {
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.setActiveAccount(accountInfo);
  }
}
