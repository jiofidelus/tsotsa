import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FoodGroupDetailScreen from '../screen/FoodGroupDetailScreen'
import BottomTab from './BottomTab'
import FoodDetailScreen from '../screen/FoodDetailScreen'

const Stack = createNativeStackNavigator()

const StackScreen = () => {
    return (
        <Stack.Navigator

        >
            {/* <Stack.Screen name='Twinkeu' component={HomeScreen} /> */}
            < Stack.Screen name='ListFoo' component={BottomTab} options={{ headerShown: false }} />
            {/* <Stack.Screen name='ListFoodstack' component={ListFoodScreen} /> */}
            <Stack.Screen name='DetailsFoodGroup' options={{ title: 'Food Group' }} component={FoodGroupDetailScreen} />
            <Stack.Screen name='DetailsFood' component={FoodDetailScreen} />
            <Stack.Group
                screenOptions={({ navigation }) => ({
                    presentation: 'modal',
                    headerLeft: () => <CancelButton onPress={navigation.goBack} />,
                })}
            >
            </Stack.Group>
        </Stack.Navigator >
    )
}

export default StackScreen