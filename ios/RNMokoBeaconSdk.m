
#import "RNMokoBeaconSdk.h"

@implementation RNMokoBeaconSdk

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startBeaconSdk:(NSString *)appId appKey:(NSString *)appKey)
{
    NSLog(@"startBeaconSdk: %@, %@", appId, appKey);
}

@end
  