import { PublicClientApplication } from '@azure/msal-browser';
import { WebPlugin } from '@capacitor/core';

import type { BaseOptions, MsAuthPlugin } from './definitions';

interface WebBaseOptions extends BaseOptions {
  redirectUri?: string;
}

interface WebLoginOptions extends WebBaseOptions {
  scopes: string[];
}

type WebLogoutOptions = WebBaseOptions;

interface AuthResult {
  accessToken: string;
  idToken: string;
  scopes: string[];
}

export class MsAuth extends WebPlugin implements MsAuthPlugin {
  context: PublicClientApplication = new PublicClientApplication({ auth: { clientId: '' } });

  async initialize(options: WebLoginOptions): Promise<void> {
    console.log('initializing...');
    this.context = this.createContext(options);
    console.log('setup redirect promise...');
    await this.context
      .handleRedirectPromise()
      .then((response) => {
        console.trace('handling redirect promise');
        if (response) {
          console.trace('setting active account');
          this.context.setActiveAccount(response.account);
        }
      })
      .catch((error) => {
        console.error('Error handling redirect:', error);
      });
  }

  async login(options: WebLoginOptions): Promise<void> {
    console.trace('logging in...');
    this.context = this.createContext(options);

    try {
      this.acquireTokenSilently(this.context, options.scopes).catch(() => {
        if (options.loginMethod === 'Redirect') {
          console.trace('logging in with popup');
          this.acquireTokenPopup(this.context, options.scopes);
        } else {
          console.trace('logging in with redirect');
          this.acquireTokenRedirect(this.context, options.scopes);
        }
      });
    } catch (error) {
      console.error('MSAL: Error occurred while logging in', error);
      throw error;
    }
  }

  logout(options: WebLogoutOptions): Promise<void> {
    this.context = this.createContext(options);

    if (!this.context.getAllAccounts()[0]) {
      return Promise.reject(new Error('Nothing to sign out from.'));
    } else {
      return this.context.logoutPopup();
    }
  }

  async acquireTokenSilent(options: WebLoginOptions): Promise<AuthResult> {
    this.context = this.createContext(options);

    try {
      return await this.acquireTokenSilently(this.context, options.scopes).catch(() => {
        throw new Error('not signed in');
      });
    } catch (error) {
      console.error('MSAL: Error occurred while logging in', error);
      throw error;
    }
  }

  private createContext(options: WebBaseOptions) {
    const config = {
      auth: {
        clientId: options.clientId,
        domainHint: options.domainHint,
        authority: options.authorityUrl ?? `https://login.microsoftonline.com/${options.tenant ?? 'common'}`,
        knownAuthorities: options.knownAuthorities,
        redirectUri: options.redirectUri ?? this.getCurrentUrl(),
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    };

    return new PublicClientApplication(config);
  }

  private getCurrentUrl(): string {
    return window.location.href.split(/[?#]/)[0];
  }

  private acquireTokenRedirect(context: PublicClientApplication, scopes: string[]): void {
    context.acquireTokenRedirect({
      scopes,
      prompt: 'select_account',
    });
  }

  private async acquireTokenPopup(context: PublicClientApplication, scopes: string[]): Promise<void> {
    const authResult = await context.acquireTokenPopup({
      scopes,
      prompt: 'select_account',
    });

    context.setActiveAccount(authResult.account);
  }

  private async acquireTokenSilently(context: PublicClientApplication, scopes: string[]): Promise<AuthResult> {
    const { accessToken, idToken } = await context.acquireTokenSilent({
      scopes,
      account: context.getAllAccounts()[0],
    });

    return { accessToken, idToken, scopes };
  }
}
