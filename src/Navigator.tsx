import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthOrApp from './screens/AuthOrApp'
import Auth from './screens/Auth'
import Menu from './screens/Menu'


const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='AuthOrApp' screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='AuthOrApp'
                    component={AuthOrApp}
                />
                <Stack.Screen
                    name='Auth'
                    component={Auth}
                />
                <Stack.Screen
                    name='Home'
                    component={Menu}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App