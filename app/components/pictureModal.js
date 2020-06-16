import React, { useState } from 'react';
import {
    View,
    StyleSheet, 
    Image, 
    TouchableOpacity,  
    Dimensions, 
    Animated, 
    Modal
} from 'react-native';
import CrossIconiOS from '../../assets/crossiOS.png';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

export default function PictureModal(props) {

    //Storing visibility of the modal in state
    const [isModalVisible, setIsModalVisible] = useState(props.modalVisible);
    const { width } = Dimensions.get('window');

    //Initial scaling of image set to 1, provided no change in scaling 
    const scale = new Animated.Value(1)

    //Function to handle zoom on pinch and according change the scale variable
    const onZoomEvent = Animated.event(
        [{nativeEvent: { scale }}],
        { useNativeDriver: true}
    )

    //Function to handle event on pinch after state is changed when gesture is over
    //and set to 1 i.e. bac to its original state
    //ACTIVE: to check whether the event is still active or not
    const onZoomStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true
          }).start()
        }
      }

    //Function to set the visibility of the Modal
    const onCloseDialog = () => {
        setIsModalVisible(false);
        props.handleVisibility();   
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isModalVisible}
                onRequestClose={() => { onCloseDialog() }}
            >
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { onCloseDialog() }}>
                    <Image source={CrossIconiOS} />
                </TouchableOpacity>
                
                <View style={styles.pinchContainer}>
                    <PinchGestureHandler
                        onGestureEvent={onZoomEvent}
                        onHandlerStateChange={onZoomStateChange}>
                        <Animated.Image
                            style={[styles.zoomedImage, { width }, { transform: [{ scale }] }]}
                            source={{ uri: `${props.selectedItem.url}` }}
                        />
                    </PinchGestureHandler>
                </View>


            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    pinchContainer: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        paddingVertical: '10%',
        marginLeft: '5%',
        width: '20%'
    },
    zoomedImage: {
        height: "50%",
        resizeMode: 'cover'
    }
});