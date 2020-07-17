import React from 'react'
import { ScrollView, Text, Image, View, Platform, Button, Linking } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LearnMoreLinks from './learn-more-links.component.js'
import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Metrics, ApplicationStyles, Colors } from '../../shared/themes/'

import ApplianceScreen from '../appliances/appliances-screen'
import LightScreen from '../lights/lights-screen'
import SocketScreen from '../sockets/sockets-screen'
import StatisticScreen from '../statistics/statistics-screen'

const Tab = createBottomTabNavigator();

export default function LaunchScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Appliances') {
              iconName = 'devices';
              color = focused ? Colors.fire : Colors.charcoal
            } else if (route.name === 'Lights') {
              iconName = 'home-lightbulb';
              color = focused ? Colors.fire : Colors.charcoal
            } else if (route.name === 'Sockets') {
              iconName = 'power-socket-uk';
              color = focused ? Colors.fire : Colors.charcoal
            } else if (route.name === 'Statistics') {
              iconName = 'chart-bar-stacked';
              color = focused ? Colors.fire : Colors.charcoal
            }

            // You can return any component that you like here!
            return (<Icon name={iconName} size={30} color={color} />);
          },
        })}
        tabBarPosition='bottom'
        initialRouteName='Statistics'
        swipeEnabled={true}
        animationEnabled={false}
        lazy={true}
        tabBarOptions={{
          showLabel: true,
          labelStyle: {
            fontSize: 14
          },
          tabStyle: {
            justifyContent: 'center',
          },
          backBehavior: 'none',
          style: {
            backgroundColor: Colors.snow,
            height: 65,
            shadowOpacity: 1.0,
            shadowOffset: { width: 0, height: 3 },
            shadowColor: '#e9e9e9',
            borderTopWidth: 1,
            borderTopColor: '#e9e9e9'
          },
          activeTintColor: Colors.fire
        }}
      >
        <Tab.Screen name="Appliances" component={ApplianceScreen} />
        <Tab.Screen name="Lights" component={LightScreen} />
        <Tab.Screen name="Sockets" component={SocketScreen} />
        <Tab.Screen name="Statistics" component={StatisticScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}