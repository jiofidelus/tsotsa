import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import Button from '../components/Button';
import fetchCountry from '../server/country';
import fetchFoodGroup from '../server/api';




const HomeScreen = ({ navigation }) => {

    // const countryOptions = [
    //     { label: 'Cameroon', value: 'cameroon' },
    //     { label: 'Canada', value: 'canada' },
    //     // Ajoutez d'autres pays ici
    // ];

    const [countryOptions, setCountry] = useState([])
    const [foodGroupOptions, setFoodGroupOptions] = useState([])


    useEffect(() => {

        const country = fetchCountry()
        const foodgroup = fetchFoodGroup()

        const newDataFoodGroup = foodgroup.map(item => (
            {
                'label': item.food_name.value,
                'uri': item.id_food.value,
            }
        ))

        setFoodGroupOptions(newDataFoodGroup)

        const newDataCountry = country.map(item => (
            {
                'label': item.country.value,
                'uri': item.id_country.value,
            }
        ))


        setCountry(newDataCountry)


        foodGroupOptions.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            if (a.label > b.label) {
                return 1;
            }
            return 0;
        });

        countryOptions.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            if (a.label > b.label) {
                return 1;
            }
            return 0;
        });


    }, [])

    // Triez les éléments par ordre alphabétique

    const continentOptions = [
        { label: 'Africa', value: 'africa' },
        { label: 'Asia', value: 'asia' },
        { label: 'USA', value: 'usa' },
        { label: 'Europe', value: 'europe' },
        // Ajoutez d'autres continents ici
    ];
    // Triez les éléments par ordre alphabétique
    continentOptions.sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        if (a.label > b.label) {
            return 1;
        }
        return 0;
    });
    const foodOptions = [
        { label: 'Pizza', value: 'pizza' },
        { label: 'Sushi', value: 'sushi' },
        { label: 'Sushi', value: 'sushi' },
        // Ajoutez d'autres aliments ici
    ];




    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedFood, setSelectedFood] = useState('');
    const [selectedFoodFroup, setSelectedFoodGroup] = useState('');

    const handleFormSubmit = () => {
        // Utilisez les valeurs sélectionnées pour effectuer les actions souhaitées (par exemple, les envoyer à votre API, les stocker dans l'état global, etc.)
        console.log('Selected Country:', selectedCountry);
        console.log('Selected Continent:', selectedContinent);
        console.log('Selected Food:', selectedFood);
    };

    // navigate inside of the Food Detail
    const handleFoodPress = (food) => {
        navigation.navigate('DetailsFoodGroup', { food });
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Twinkeu',
            headerLeft: () => (
                <View style={{
                    shadowColor: '#000',
                    // shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    backgroundColor: 'white'
                }}>

                    <Image source={require("../assets/home.png")} style={{
                        height: 55,
                        width: 70
                    }} />
                </View>
            )

        })
    });

    const titleBaner = 'search of foods composition'

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',

        }}>
            {/* baner and test accroch */}
            <View style={styles.containerBaner}>
                <Image style={styles.imageBaner} source={require('../data/orkg_logo.png')} />
                <Text style={styles.textBaner}>{titleBaner.toUpperCase()}</Text>
            </View>

            <View style={styles.containerForm}>
                <RNPickerSelect
                    placeholder={{ label: 'Select a continent', value: null }}
                    onValueChange={(value) => setSelectedContinent(value)}
                    items={continentOptions}
                    value={selectedContinent}
                    style={{
                        inputAndroid: styles.inputPicker,
                        inputIOS: styles.inputPicker
                    }}
                />

                <RNPickerSelect
                    placeholder={{ label: 'Select a country', value: null }}
                    onValueChange={(value) => setSelectedCountry(value)}
                    items={countryOptions}
                    value={selectedCountry}
                    style={{
                        inputAndroid: styles.inputPicker,
                        inputIOS: styles.inputPicker
                    }}

                />
                <RNPickerSelect
                    placeholder={{ label: 'Select a food group', value: null }}
                    onValueChange={(value) => setSelectedFoodGroup(value)}
                    items={foodGroupOptions}
                    value={selectedFoodFroup}
                    style={{
                        inputAndroid: styles.inputPicker,
                        inputIOS: styles.inputPicker
                    }}
                />
                <RNPickerSelect
                    placeholder={{ label: 'Select a food', value: null }}
                    onValueChange={(value) => setSelectedFood(value)}
                    items={foodOptions}
                    value={selectedFood}
                    style={{
                        inputAndroid: styles.inputPicker,
                        inputIOS: styles.inputPicker
                    }}
                />
                <Button
                    color='blue'
                    title="Submit"
                    // icon='camera'
                    onPress={handleFormSubmit}
                />
            </View>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    containerBaner: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 1,
        margin: 10,
        padding: 10,
        borderColor: '#C0C0C0',
        borderRadius: 7,
        marginLeft: 20
    },

    imageBaner: {
        height: 50,
        width: 50
    },

    textBaner: {
        fontSize: 19,
        fontWeight: '500',
        color: '#0174BE',
        textAlign: 'center'
    },

    // form
    containerForm: {
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 0,
        backgroundColor: 'white',
        margin: 20,
        alignItems: 'center'
    },

    inputPicker: {
        borderWidth: 2,
        borderColor: '#333',
        fontSize: 30,
        marginBottom: 6
    },

    buttonSubmit: {
        borderRadius: 40,
        marginBottom: 50
    }
})