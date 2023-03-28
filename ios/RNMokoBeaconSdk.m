
#import "RNMokoBeaconSdk.h"
#import "HCKBeaconCentralManager.h"
#import <objc/runtime.h>


NSString *const centralManagerStateChangedNotification = @"centralManagerStateChangedNotification";
NSString *const peripheralConnectStateChangedNotification = @"peripheralConnectStateChangedNotification";

NSString *const centralManagerScanNewDeviceModelNotification = @"centralManagerScanNewDeviceModelNotification";
NSString *const centralManagerStartScanNotification = @"centralManagerStartScanNotification";
NSString *const centralManagerStopScanNotification = @"centralManagerStopScanNotification";

NSString *const receiveThreeAxisAccelerationDataNotification = @"receiveThreeAxisAccelerationDataNotification";

NSString *const HCKBeaconRssiValueChangedNotification = @"HCKBeaconRssiValueChangedNotification";


@implementation RNMokoBeaconSdk

+ (instancetype)sharedInstance {
    static RNMokoBeaconSdk *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (void)runSDK{
    [HCKBeaconCentralManager sharedInstance].stateDelegate = (id<HCKCentralStatesChangedDelegate>) self;
    [HCKBeaconCentralManager sharedInstance].scanDelegate = (id<HCKCentralScanDelegate>) self;
    [HCKBeaconCentralManager sharedInstance].xyzDelegate = (id<HCKBeaconThreeAxisAccelerationDelegate>) self;
    [HCKBeaconCentralManager sharedInstance].rssiValueDelegate = (id<HCKBeaconRssiValueChangedDelegate>) self;
    
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(listenScanNewDevice:)
     name:centralManagerScanNewDeviceModelNotification
     object:nil
    ];
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(listenStartScan:)
     name:centralManagerStartScanNotification
     object:nil
    ];
    [[NSNotificationCenter defaultCenter]
     addObserver:self
     selector:@selector(listenStopScan:)
     name:centralManagerStopScanNotification
     object:nil
    ];
    
    [[NSNotificationCenter defaultCenter]
     addObserver: self
     selector: @selector(listenManagerState:)
     name:centralManagerStateChangedNotification
     object:nil
    ];
    [[NSNotificationCenter defaultCenter]
     addObserver: self
     selector: @selector(listenPeripheralConnectState:)
     name:peripheralConnectStateChangedNotification
     object:nil
    ];
    
    [[NSNotificationCenter defaultCenter]
     addObserver: self
     selector: @selector(listenReceiveXYZAccelerationData:)
     name:receiveThreeAxisAccelerationDataNotification
     object:nil
    ];
    [[NSNotificationCenter defaultCenter]
     addObserver: self
     selector: @selector(listenHCKBeaconRssiValue:)
     name:HCKBeaconRssiValueChangedNotification
     object:nil
    ];
}

#pragma mark - Export Methods

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startScaniBeacons:
                  (RCTResponseSenderBlock)successCallback
                  errorCallback: (RCTResponseErrorBlock)errorCallback
                  )
{
    @try {
        [[HCKBeaconCentralManager sharedInstance] startScaniBeacons];
        
    } @catch (NSException *exception) {
        NSString *domain = @"com.mongrov.rnmokobeacon.ErrorDomain";
        NSString *desc = NSLocalizedString(@"Unable to complete the process", @"startScaniBeacons");
        NSDictionary *userInfo = @{ NSLocalizedDescriptionKey : desc };
        errorCallback([NSError errorWithDomain:domain code:-101 userInfo:userInfo]);
    }
}

RCT_EXPORT_METHOD(stopScaniBeacons)
{
    [[HCKBeaconCentralManager sharedInstance] stopScaniBeacon];
}

RCT_EXPORT_METHOD(showPeripheral){}

#pragma mark - listeners
- (void)listenScanNewDevice:(NSNotification *)notification{
  NSLog(@"listenScanNewDevice >  %@", notification);
}
- (void)listenStartScan:(NSNotification *)notification{
  NSLog(@"listenStartScan >  %@", notification);
}
- (void)listenStopScan:(NSNotification *)notification{
  NSLog(@"listenStopScan >  %@", notification);
}
- (void)listenManagerState:(NSNotification *)notification{
  NSLog(@"listenManagerState > %@", notification);
}
- (void)listenPeripheralConnectState:(NSNotification *)notification{
    NSLog(@"listenPeripheralConnectState > %@", notification);
}
- (void)listenReceiveXYZAccelerationData:(NSNotification *)notification{
    NSLog(@"listenReceiveXYZAccelerationData > %@", notification);
}
- (void)listenHCKBeaconRssiValue:(NSNotification *)notification{
    NSLog(@"listenHCKBeaconRssiValue > %@", notification);
}


#pragma mark - Selectors Responders
- (void)centralManagerScanNewDeviceModel:(HCKBeaconBaseModel *)beaconModel manager:(HCKBeaconCentralManager *)manager {
    [[NSNotificationCenter defaultCenter]
     postNotificationName:centralManagerScanNewDeviceModelNotification
     object:nil
    ];
}
- (void)centralManagerStartScan:(HCKBeaconCentralManager *)manager{
  [[NSNotificationCenter defaultCenter]
   postNotificationName:centralManagerStartScanNotification
   object:nil
  ];
}
- (void)centralManagerStopScan:(HCKBeaconCentralManager *)manager{
    [[NSNotificationCenter defaultCenter]
     postNotificationName:centralManagerStopScanNotification
     object:nil
    ];
}
- (void)centralManagerStateChanged:(HCKBeaconCentralManagerState)managerState manager:(HCKBeaconCentralManager *)manager{
    [[NSNotificationCenter defaultCenter]
     postNotificationName:centralManagerStateChangedNotification
     object:nil
    ];
}
- (void)peripheralConnectStateChanged:(HCKBeaconConnectStatus)connectState manager:(HCKBeaconCentralManager *)manager{
    [[NSNotificationCenter defaultCenter]
     postNotificationName:peripheralConnectStateChangedNotification
     object:nil
    ];
}
- (void)receiveThreeAxisAccelerationData:(NSDictionary *)dic{
    [[NSNotificationCenter defaultCenter]
     postNotificationName:receiveThreeAxisAccelerationDataNotification
     object:nil
    ];
}
- (void)HCKBeaconRssiValueChanged:(NSNumber *)rssi{
    [[NSNotificationCenter defaultCenter]
     postNotificationName:HCKBeaconRssiValueChangedNotification
     object:nil
    ];
}

@end
