import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import React, { Suspense, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import codePush from 'react-native-code-push';
import DropdownAlert from 'react-native-dropdownalert';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { DropDownHolder, PushNotification } from './components';
import AppNavigator from './navigation/root-stack';
import { theme } from './theme';

enableScreens();

const App = () => {
  useEffect(() => {
    console.disableYellowBox = false;
    if (Platform.OS == 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Suspense fallback={null}>
      <Root>
        <SafeAreaView style={styles.container}>
          <PaperProvider>
            <NavigationContainer theme={theme}>
              <AppNavigator />
              <PushNotification />
              <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)} />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaView>
      </Root>
    </Suspense>
  );
};

const codePushOptions = {
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
};

// export default codePush(codePushOptions)(App);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
