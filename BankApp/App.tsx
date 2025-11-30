import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddBankScreen from './src/screens/AddBankScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddBank">
        <Stack.Screen 
          name="AddBank" 
          component={AddBankScreen} 
          options={{ title: 'My Bank App' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;