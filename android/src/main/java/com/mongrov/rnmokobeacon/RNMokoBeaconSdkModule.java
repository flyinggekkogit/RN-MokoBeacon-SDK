
package com.mongrov.rnmokobeacon;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.moko.support.MokoSupport;


public class RNMokoBeaconSdkModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNMokoBeaconSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
            MokoSupport.getInstance().init(getApplicationContext());

  }

  @Override
  public String getName() {
    return "RNMokoBeaconSdk";
  }
}