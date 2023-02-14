import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {COLOR, TYPOGRAPHY} from '@/constants';

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
    color: COLOR['GC-50'],
    ...TYPOGRAPHY.HT2,
  },
  image: {
    resizeMode: 'contain',
  },
  form: {
    alignItems: 'center',
    height: heightPercentageToDP('40%'),
  },
});
