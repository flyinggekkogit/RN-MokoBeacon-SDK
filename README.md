
# react-native-moko-beacon-sdk

## Getting started

`$ npm install react-native-moko-beacon-sdk --save`

### Mostly automatic installation

`$ react-native link react-native-moko-beacon-sdk`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-moko-beacon-sdk` and add `RNMokoBeaconSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNMokoBeaconSdk.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.mongrov.rnmokobeacon.RNMokoBeaconSdkPackage;` to the imports at the top of the file
  - Add `new RNMokoBeaconSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-moko-beacon-sdk'
  	project(':react-native-moko-beacon-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-moko-beacon-sdk/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-moko-beacon-sdk')
  	```


## Usage
```javascript
import RNMokoBeaconSdk from 'react-native-moko-beacon-sdk';

// TODO: What to do with the module?
RNMokoBeaconSdk;
```
  