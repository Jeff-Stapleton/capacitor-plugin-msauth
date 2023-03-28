import type {
  AccountInfo,
  AuthenticationResult,
  Configuration,
  EndSessionPopupRequest,
  PopupRequest,
  SilentRequest,
} from '@azure/msal-browser';
import { PublicClientApplication } from '@azure/msal-browser';
import { WebPlugin } from '@capacitor/core';

import type { MsAuthPlugin } from './definitions';

export class MsAuth extends WebPlugin implements MsAuthPlugin {
  private msalInstance: PublicClientApplication | undefined;

  async initialize(config: Configuration): Promise<void> {
    console.log("calling initialize v1.0");
    this.msalInstance = new PublicClientApplication(config);
  }

  async loginPopup(popupRequest: PopupRequest): Promise<AuthenticationResult> {
    console.log("calling loginPopup v1.0");
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance?.loginPopup(popupRequest);
  }

  async logoutPopup(endSessionPopupRequest: EndSessionPopupRequest): Promise<void> {
    console.log("calling logoutPopup v1.0");
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.logoutPopup(endSessionPopupRequest);
  }

  async acquireTokenSilent(silentRequest: SilentRequest): Promise<AuthenticationResult> {
    console.log("calling acquireTokenSilent v1.0");
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.acquireTokenSilent(silentRequest);
  }

  async setActiveAccount(accountInfo: AccountInfo): Promise<void> {
    console.log("calling setActiveAccount v1.0");
    if (!this.msalInstance) {
      throw new Error('Msal client is not initialized, please call initialise(config) first');
    }

    return await this.msalInstance.setActiveAccount(accountInfo);
  }
}
