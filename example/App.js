/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const {RNMokoBeaconSdk} = NativeModules;

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100%',
          }}>
          <TouchableOpacity
            style={styles.greyButton}
            onPress={() => {
              RNMokoBeaconSdk.showPeripheral();
            }}>
            <Text>SHOW PERIPHERAL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.greenButton}
            onPress={() => {
              RNMokoBeaconSdk.startScaniBeacons(
                () => {
                  console.log('startScaniBeacons success');
                },
                () => {
                  console.log('startScaniBeacons error');
                },
              );
            }}>
            <Text>START SCANING BEACONS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redButton}
            onPress={() => {
              RNMokoBeaconSdk.stopScaniBeacons();
            }}>
            <Text>STOP SCANING BEACONS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  redButton: {
    backgroundColor: '#f00',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  greenButton: {
    backgroundColor: '#0e0',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  greyButton: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default App;
