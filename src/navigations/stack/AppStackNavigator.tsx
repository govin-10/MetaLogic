import {createStackNavigator} from '@react-navigation/stack';
import {StackParamList} from '../../types/StackParamsTypes';
import {DetailScreen, RegistrationScreen} from '../../screens';

const StackNavigator = createStackNavigator<StackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackNavigator.Screen
        name="PersonRegistration"
        component={RegistrationScreen}
      />
      <StackNavigator.Screen name="Detail" component={DetailScreen} />
    </StackNavigator.Navigator>
  );
};

export default AppStackNavigator;
