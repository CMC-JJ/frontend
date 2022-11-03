import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ComponentProps} from 'react';
import FontText from '../FontText';

interface AirportIconProps extends ComponentProps<typeof TouchableOpacity> {
  name: string;
  logoImageUrl?: string;
  onClick: Boolean;
}

export default function AirportIcon({
  name,
  logoImageUrl,
  onClick,
  style,
  ...rest
}: AirportIconProps) {
  return (
    <>
      <TouchableOpacity
        {...rest}
        // disabled={v.onClick}
        // onPress={() => onToggle(v)}
        style={[styles.circle, onClick && styles.activeIcon, style]}>
        <Image
          source={{
            uri: logoImageUrl,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <FontText style={[styles.name, onClick && styles.activeText]}>
        {name}
      </FontText>
    </>
  );
}

const styles = StyleSheet.create({
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
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  name: {marginTop: 13, fontWeight: '500', fontSize: 15, color: '#979797'},
  activeIcon: {
    shadowColor: '#0066FF',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
  },
  activeText: {fontWeight: '600', fontSize: 15, color: 'black'},
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
  },
});
