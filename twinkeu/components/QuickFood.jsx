import React from 'react'
import quickfood from '../data/quickfood'
import {
    Text,
    View,
    ImageBackground,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import fetchFoods from '../server/api';

const QuickFood = (props) => {
    const [foods, setfood] = useState([])
    const data = quickfood
    useEffect(() => {
        setfood(data)
        // console.log(foods)
        console.log(fetchFoods)
    }, [])

    const handleFoodPress = (food) => {
        props.navigation.navigate('Details', { food });
    };

    const ItemView = ({ item }) => {
        return (

            <TouchableOpacity style={{ margin: 10 }} onPress={() => handleFoodPress(item)}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={{ aspectRatio: 5 / 6, height: 170 }}
                    imageStyle={{ borderRadius: 6 }}
                >
                    {/* <Text style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 4,
                        fontSize: 25,
                        fontWeight: '700',
                        color: 'white'
                    }}>{item.offer}
                    </Text> */}
                </ImageBackground>
                <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '500' }}>{item.name}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                    <MaterialIcons name="stars" size={24} color="green" />
                    <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>{item.rating}</Text>
                    <Text style={{ marginLeft: 3 }}>•</Text>
                    <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>{item.time}mins</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
            />

        )
    }

    return (
        <View style={{ margin: 10 }}>
            {/* <Text style={{ fontSize: 17, fontWeight: '500' }}>Get it QUickly</Text> */}
            <FlatList
                data={foods}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                numColumns={2}

            />
        </View>
    )
}

export default QuickFood