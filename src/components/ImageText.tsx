import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

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
        <Text style={[style, styles.title]}>{text}</Text>
      </View>
      <View>{image && <Image style={styles.image} source={image} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    top: 30,
  },
  form: {
    alignItems: 'center',
  },
});
