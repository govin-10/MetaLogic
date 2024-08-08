import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStackNavigator from './stack/AppStackNavigator';

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
