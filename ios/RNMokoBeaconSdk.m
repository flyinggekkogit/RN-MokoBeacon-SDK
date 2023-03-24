
#import "RNMokoBeaconSdk.h"
#import "HCKBeaconCentralManager.h"


NSString *const centralManagerStateChangedNotification = @"centralManagerStateChangedNotification";
NSString *const peripheralConnectStateChangedNotification = @"peripheralConnectStateChangedNotification";

NSString *const centralManagerScanNewDeviceModelNotification =
    @"centralManagerScanNewDeviceModelNotification";
NSString *const centralManagerStartScanNotification =
    @"centralManagerStartScanNotification";
NSString *const centralManagerStopScanNotification =
    @"centralManagerStopScanNotification";

NSString *const centralManagerDidDiscoverPeripheralNotification =
    @"centralManagerDidDiscoverPeripheralNotification";


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
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startBeaconSdk)
{
    NSLog(@"startBeaconSDK...");
    
    NSLog(@"appDelegate >>>>> %@", self.appDelegate);
    
    [HCKBeaconCentralManager sharedInstance].stateDelegate = (id<HCKCentralStatesChangedDelegate>) self.appDelegate;
    
    [HCKBeaconCentralManager sharedInstance].scanDelegate = (id<HCKCentralScanDelegate>) self.appDelegate;
    
    [[NSNotificationCenter defaultCenter]
     addObserver: _appDelegate
     selector: @selector(listenStartScan:)
     name:centralManagerStartScanNotification
     object:nil
    ];
    
    [[NSNotificationCenter defaultCenter]
     addObserver: _appDelegate
     selector: @selector(listenStopScan:)
     name:centralManagerStopScanNotification
     object:nil
    ];
    
      [[NSNotificationCenter defaultCenter]
        addObserver: self
        selector: @selector(listenDidDiscoverPeripheral:)
        name:centralManagerStateChangedNotification
        object:nil
      ];
      
      [[NSNotificationCenter defaultCenter]
        addObserver: self
        selector: @selector(listenCentralManager:)
        name:centralManagerStateChangedNotification
        object:nil
      ];
    
      [[NSNotificationCenter defaultCenter]
        addObserver: self
        selector: @selector(listenConnectionStatus:)
        name:peripheralConnectStateChangedNotification
        object:nil
      ];
      
      [[NSNotificationCenter defaultCenter]
        addObserver: self
        selector: @selector(listenScanNewDevice:)
        name:centralManagerScanNewDeviceModelNotification
        object:nil
      ];
    
}


#pragma mark - listeners
- (void)listenCentralManager:(NSNotification *)notification{
  NSLog(@"listenCentralManager > %@", notification);
}
- (void)listenConnectionStatus:(NSNotification *)notification{
  NSLog(@"listenConnectionStatus >  %@", notification);
}

- (void)listenScanNewDevice:(NSNotification *)notification{
  NSLog(@"listenScanNewDevice >  %@", notification);
}
- (void)listenStartScan:(NSNotification *)notification{
  NSLog(@"listenStartScan >  %@", notification);
}
- (void)listenStopScan:(NSNotification *)notification{
  NSLog(@"listenStopScan >  %@", notification);
}

- (void)listenDidDiscoverPeripheral:(NSNotification *)notification{
  NSLog(@"listenDidDiscoverPeripheral >  %@", notification);
}


#pragma mark - CBCentralManagerDelegate
- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary<NSString *, id> *)advertisementData RSSI:(NSNumber *)RSSI
{
  NSLog(@"didDiscoverPeripheral > %@", peripheral.name);

  [[NSNotificationCenter defaultCenter]
   postNotificationName:centralManagerDidDiscoverPeripheralNotification
   object:nil
  ];
}

- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  NSLog(@"didUpdate > %ld", (long)central.state);
    if (central.state == CBManagerStatePoweredOn) {
        [central scanForPeripheralsWithServices:nil options:nil];
    }
}

#pragma mark - HCKCentralStatesChangedDelegate
- (void)centralManagerStateChanged:(HCKBeaconCentralManagerState)managerState
manager:(HCKBeaconCentralManager *)manager
{
  NSLog(@"centralManagerStateChanged > %ld", (long)managerState);

    [[NSNotificationCenter defaultCenter]
     postNotificationName:centralManagerStateChangedNotification
     object:nil
    ];
}

- (void)peripheralConnectStateChanged:(HCKBeaconConnectStatus)connectState manager:(HCKBeaconCentralManager *)manager
{
  NSLog(@"peripheralConnectStateChanged > %@", manager.description);

    [[NSNotificationCenter defaultCenter] postNotificationName:peripheralConnectStateChangedNotification object:nil];
}

#pragma mark - HCKCentralScanDelegate
- (void)centralManagerScanNewDeviceModel:(HCKBeaconBaseModel *)beaconModel manager:(HCKBeaconCentralManager *)manager
{
  NSLog(@"scanNewDevice >");

  [[NSNotificationCenter defaultCenter]
   postNotificationName:centralManagerScanNewDeviceModelNotification
   object:nil
  ];
}
- (void)centralManagerStartScan:(HCKBeaconCentralManager *)manager
{
  
  NSLog(@"startScan > %ld", (long)manager.centralManager.state);

  [[NSNotificationCenter defaultCenter]
   postNotificationName:centralManagerStartScanNotification
   object:nil
  ];
}
- (void)centralManagerStopScan:(HCKBeaconCentralManager *)manager
{
  NSLog(@"stopScan > %ld",  (long)manager.centralManager.state);

  [[NSNotificationCenter defaultCenter]
   postNotificationName:centralManagerStopScanNotification
   object:nil
  ];
}


RCT_EXPORT_METHOD(startScaniBeacons:
                  (RCTResponseSenderBlock)successCallback
                  errorCallback: (RCTResponseErrorBlock)errorCallback
                  )
{
    @try {
        NSLog(@"startScaniBeacons...");
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


@end
  
