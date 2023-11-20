import { View, Text, SafeAreaView, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import axios from "axios";
import fetchFoodGroup from '../server/api';


const ListFoodScreen = ({ navigation }) => {

    // customize header home screen
    const goBack = () => {
        navigation.goBack()
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Food Group',
            headerLeft: () => (
                <Image source={{ uri: "../asstes/icon.png" }} />
            ),
            // headerRight: ({ color }) => (
            //     <Pressable style={{ flexDirection: 'column', marginTop: 10 }}>
            //         <MaterialCommunityIcons
            //             name='person-circle-outline'
            //             color={color}
            //             style={styles.headerHomeRight}
            //         />
            //         <Text style={{ textAlign: 'center', fontSize: 10, marginLeft: -50 }}>Login</Text>
            //     </Pressable>

            // )

        })
    });
    const data = fetchFoodGroup()
    const [isLoading, setIsLoading] = useState(true);
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')

    const [foods, setFood] = useState([])
    useEffect(() => {

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setFood(data);
            setMasterData(data);
        }, 2000);


        console.log(search)
    }, [])

    const handleFoodPress = (food) => {
        navigation.navigate('DetailsFoodGroup', { food });
    };

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.food_name.value ? item.food_name.value.toUpperCase() : ''.toUpperCase();

                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFood(newData);
            setSearch(text)
            console.log(search)
        } else {
            setFood(masterData);
            setSearch(text);
            console.log(search);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleFoodPress(item)}>

                <View style={styles.itemStyle}>
                    {/* <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 10 }} /> */}
                    <Text style={{ margin: 20, color: "#FF8F8F", textAlign: 'center' }}>{item.food_name.value.toUpperCase()}</Text>
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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.textInput}
                        value={search}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => searchFilter(text)}
                        placeholder='Search a food group'
                    />
                    <AntDesign name='search1' color='red' size={24} />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#FF8F8F" style={{ margin: '50%' }} />) :
                    (
                        <FlatList
                            data={foods}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ItemView}
                        />
                    )
                }

            </View>
        </SafeAreaView>
    )
}

export default ListFoodScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    itemStyle: {
        padding: 5,
        backgroundColor: '#f9c2ff',
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 50,
        alignItems: 'center'
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 10,
        borderColor: '#009688',
        backgroundColor: 'white',
    },
    containerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: '#C0C0C0',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
        backgroundColor: 'white',
    },
    textInput: {
        fontSize: 17,
    }
})

