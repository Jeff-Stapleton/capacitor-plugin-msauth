#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(MsAuthPlugin, "MsAuthPlugin",
  CAP_PLUGIN_METHOD(initialize, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(loginPopup, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(logoutPopup, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(acquireTokenSilent, CAPPluginReturnPromise);
  CAP_PLUGIN_METHOD(setActiveAccount, CAPPluginReturnPromise);
)
