import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createStackNavigator();  //criando as rotas que nem fazemos com react-router-dom

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes () {
  return (
    <NavigationContainer>
      
      <AppStack.Navigator screenOptions={{ headerShown: false }}> 
        <AppStack.Screen name="Incidents" component={Incidents} /> 
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
} //Criamos uma Screen para cada Componente separado.