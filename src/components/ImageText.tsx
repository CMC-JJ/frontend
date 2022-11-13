import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function ImageText({
  text,
  image,
}: {
  text: string;
  image?: string;
}) {
  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.title}>{text}</Text>
      </View>
      {/* <Image
          style={styles.logo}
          resizeMode={'cover'}
          source={require('@/assets/images/permissionLogo.png')}
        /> */}
      {image && <Image style={styles.image} source={image} />}
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
    top: 20,
  },
  image: {
    top: 30,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    top: hp('0%'),
    width: '80%',
  },
});
