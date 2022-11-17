import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function ImageText({
  text,
  image,
  style,
}: {
  text: string;
  image?: string;
  style?: any;
}) {
  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View>
        {image && <Image style={[style, styles.image]} source={image} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  form: {
    alignItems: 'center',
    height: heightPercentageToDP('40%'),
  },
});
