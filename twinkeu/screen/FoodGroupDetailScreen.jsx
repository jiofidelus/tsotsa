import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native'
import React from 'react'

const FoodDetailScreen = ({ route }) => {
    const { id_food, food_name } = route.params.food;

    const handleLinkPress = () => {
        Linking.openURL(id_food.value);
    };

    return (
        <ScrollView >
            {/* imageFood */}
            <View style={styles.containerImage}>
                {/* <Image source={{ uri: image }} style={styles.imageItem} /> */}
            </View>
            {/* Details About Food Here */}

            <View style={styles.containerDetail}>
                <Text style={styles.nameFood}>{food_name.value.toUpperCase()}</Text>
                {/* description part */}
                <View>
                    <Text style={styles.descriptitle}>Description</Text>
                    <Text style={styles.descriptionBody}>Not yet description
                    </Text>
                </View>
                {/* composition */}

            </View>
            {/* Source Link */}
            <View style={styles.sourceLink}>
                <Text>
                    Source Link:
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={{ color: 'blue', marginLeft: 10, textDecorationLine: 'underline' }}>{id_food.value}
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ScrollView>
    )
}

export default FoodDetailScreen

const styles = StyleSheet.create({
    containerImage: {
        alignItems: 'center',
        margin: 20,
    },
    imageItem: {
        height: 200,
        width: 200,
        borderRadius: 40
    },
    containerDetail: {

    },
    nameFood: {
        fontSize: 27,
        fontWeight: '500',
        textAlign: 'center',
        color: "#FF8F8F"
    },
    descriptitle: {
        fontSize: 20,
        fontWeight: '400',
        margin: 20
    },
    descriptionBody: {
        fontSize: 17,
        fontWeight: '200',
        justifyContent: 'center',
        marginLeft: 20
    },
    compositionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    colunmNutrient: {
        flex: 1,
        paddingHorizontal: 5,
    },
    cell: {
        borderWidth: 2,
        borderColor: '#c8c8c8',
        padding: 10,
    },
    sourceLink: {
        fontSize: 16,
        fontWeight: '400',
        justifyContent: 'center',
        margin: 20
    }
})