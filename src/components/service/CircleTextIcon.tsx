import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {ComponentProps} from 'react';
import {FontText} from '../FontText';

interface ServiceIconProps extends ComponentProps<typeof TouchableOpacity> {
  name: string;
  logoImageUrl?: string;
  region?: string;
  isActived?: boolean;
}

export default function AirportIcon({
  name,
  logoImageUrl,
  isActived,
  region,
  style,
  ...rest
}: ServiceIconProps) {
  return (
    <>
      <TouchableOpacity style={styles.iconContainer} {...rest}>
        <View style={[styles.circle, isActived && styles.activeIcon, style]}>
          {region ? (
            <FontText
              style={[styles.iconText, isActived && styles.activeIconText]}>
              {region}
            </FontText>
          ) : (
            <Image
              source={{
                uri: logoImageUrl,
              }}
              style={styles.image}
            />
          )}
        </View>
        <FontText style={[styles.name, isActived && styles.activeText]}>
          {name}
        </FontText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 5,
  },
  circle: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10,
    marginTop: 3,
  },
  name: {
    marginTop: 13,
    fontWeight: '500',
    fontSize: 15,
    color: '#979797',
    left: 1,
  },
  activeIcon: {
    shadowColor: '#0066FF',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10,
  },
  activeText: {fontWeight: '600', fontSize: 15, color: 'black'},
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
  },
  iconText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#BCBCBC',
  },
  activeIconText: {fontSize: 19, fontWeight: '700', color: '#0066FF'},
});
