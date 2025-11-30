import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddBankScreen from './src/screens/AddBankScreen';
import BankListScreen from './src/screens/BankListScreen'; 
import EditBankScreen from './src/screens/EditBankScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BankList"> 
        <Stack.Screen 
          name="BankList" 
          component={BankListScreen} 
          options={{ title: 'My Accounts' }}
        />
        <Stack.Screen 
          name="AddBank" 
          component={AddBankScreen} 
          options={{ title: 'Add New Account' }}
        />
        <Stack.Screen name="EditBank" 
        component={EditBankScreen}
         options={{ title: 'Edit Account' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;