import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DialerScreen from './screens/DialerScreen';
import HistoryScreen from './screens/HistoryScreen';
import ContactsScreen from './screens/ContactsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dialer') {
              iconName = focused ? 'call' : 'call-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Contacts') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Dialer" component={DialerScreen}/>
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Contacts" component={ContactsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
