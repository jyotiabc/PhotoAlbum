import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

export default function Card(props) {

  const handlePress = () => {
    props.onPress();
  }

  const renderCard = (item, itemWidth) => {
    return (
      item ?
        <View>
          <TouchableOpacity
            onPress={handlePress}

            key={item.id}>
            <View style={styles.cardContainer}>
              <View>
                <Image
                  style={{ height: 150, justifyContent: 'space-around', width: itemWidth }}
                  source={{ uri: `${item.thumbnailUrl}` }}
                  resizeMode='cover'
                />
              </View>
              <View style={styles.contentCard}>
                <Text style={{ width: itemWidth, color: '#232323', fontSize: 12, padding: 5 }}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View> : null
    );
  }

  return (
    <View style={{ backgroundColor: '#F0F0F0)' }}>
      {renderCard(props.cardItem, props.itemWidth)}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2
  },
  contentCard: {
    borderWidth: 1,
    borderColor: '#dddddd'
  }
});

