import { View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Baner = () => {
    const images = [
        "https://cdn.grabon.in/gograbon/images/web-images/uploads/1658919135375/swiggy-coupons.jpg",
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mfz2zorpe8in1noybhzo",
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/lhnwo9ezxo7mpkpvtdcy",
        "../data/food1.png"
    ];

    return (
        <View>

            <SliderBox
                images={images}
                autoPlay
                // circleLoop
                dotColor='#12374F'
                inactiveDotColor='#90A4AA'
                ImageComponentStyle={{
                    borderRadius: 6,
                    width: '94%',
                    marginTop: 10,
                    height: 150

                }}

            />
        </View>
    )
}

export default Baner