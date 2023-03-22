
#import "RNMokoBeaconSdk.h"
#import "HCKBeaconCentralManager.h"

@implementation RNMokoBeaconSdk

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startBeaconSdk:(NSString *)appId appKey:(NSString *)appKey)
{
    NSLog(@"startBeaconSdk:");
    NSLog(@"connect status > %lid", (long)[[HCKBeaconCentralManager sharedInstance] connectStatus]);
}

RCT_EXPORT_METHOD(startScaniBeacons)
{
    NSLog(@"startScaniBeacons...");
    [[HCKBeaconCentralManager sharedInstance] startScaniBeacons];
}

RCT_EXPORT_METHOD(stopScaniBeacons)
{
    NSLog(@"stopScaniBeacons...");
    [[HCKBeaconCentralManager sharedInstance] stopScaniBeacon];
}

RCT_EXPORT_METHOD(showPeripheral){
    NSLog(@"connect status: %ld", (long)[HCKBeaconCentralManager sharedInstance].peripheral.services);
}

@end
  
