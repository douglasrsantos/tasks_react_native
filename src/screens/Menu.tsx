import React from 'react'
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerItemList, DrawerNavigationOptions, DrawerContentScrollView } from '@react-navigation/drawer'
import { Gravatar } from 'react-native-gravatar'

import commonStyles from '../CommonStyles'
import TaskList from './TaskList'

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'


const Drawer = createDrawerNavigator()

export default (props: any) => {
    return (
        <Drawer.Navigator
            initialRouteName='Today'
            screenOptions={screenOptions}
            drawerContent={(drawerProps) => CustomDrawerContent({ ...props, ...drawerProps })}
        >
            <Drawer.Screen
                name='Today'
                component={(props: any) => <TaskList title='Hoje' daysAhead={0} {...props} />}
                options={{ title: 'Hoje' }}
            />
            <Drawer.Screen
                name='Tomorrow'
                component={(props: any) => <TaskList title='Amanhã' daysAhead={1} {...props} />}
                options={{ title: 'Amanhã' }}
            />
            <Drawer.Screen
                name='Week'
                component={(props: any) => <TaskList title='Semana' daysAhead={7} {...props} />}
                options={{ title: 'Semana' }}
            />
            <Drawer.Screen
                name='Month'
                component={(props: any) => <TaskList title='Mês' daysAhead={30} {...props} />}
                options={{ title: 'Mês' }}
            />
        </Drawer.Navigator>
    )

}



const CustomDrawerContent = (props: any) => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <Gravatar
                    style={styles.avatar}
                    options={{
                        email: props.route.params.email,
                        secure: true,
                    }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.name} >{props.route.params.name}</Text>
                    <Text style={styles.email} >{props.route.params.email}</Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon
                            name='sign-out'
                            size={30}
                            color='#800'
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const screenOptions: DrawerNavigationOptions = {
    drawerLabelStyle: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: 'bold',
        fontSize: 20
    },
    drawerActiveBackgroundColor: '#080',
    drawerActiveTintColor: 'white',
    headerShown: false
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        paddingTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText,
        marginBottom: 5,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 10
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
})
