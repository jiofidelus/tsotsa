import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ListFoodScreen from '../screen/ListFoodScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import HomeScreen from '../screen/HomeScreen'

const Tab = createBottomTabNavigator()

const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    size = 30
                    const iconColor = focused ? "#FF8F8F" : color;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    }
                    else if (route.name === 'ListFood') {
                        iconName = focused
                            ? 'layers-triple-outline'
                            : 'layers-triple-outline';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
                },
                tabBarShowLabel: false,
                headerShown: true,
                headerStyle: {
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    elevation: 4,
                    backgroundColor: 'white',


                },
                headerTitleStyle: {
                    color: "#FF8F8F",
                    fontWeight: '500',
                    fontSize: 25
                }

            })}

        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='ListFood' component={ListFoodScreen} />
        </Tab.Navigator>
    )
}

export default BottomTab