
#if __has_include("RCTBridgeModule.h")
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import "HCKBeaconProtocol.h"

@interface RNMokoBeaconSdk : NSObject <RCTBridgeModule, HCKCentralScanDelegate>


+ (instancetype)sharedInstance;

- (void)runSDK;

@end
   
