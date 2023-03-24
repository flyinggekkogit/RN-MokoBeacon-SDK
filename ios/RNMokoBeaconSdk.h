
#if __has_include("RCTBridgeModule.h")
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNMokoBeaconSdk : NSObject <RCTBridgeModule>

@property (nonatomic, weak) id<UIApplicationDelegate> appDelegate;

+ (instancetype)sharedInstance;


@end
   
