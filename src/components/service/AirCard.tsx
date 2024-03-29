import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FontText} from '../FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import {AirCardProps} from '@/screens';

export default function AirCard({data}: {data: AirCardProps | undefined}) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.textContainer}>
        <View style={styles.title}>
          <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 5}}>
            {data?.logoImageUrl && (
              <View style={styles.circle}>
                <Image
                  source={{
                    uri: data?.logoImageUrl,
                  }}
                  style={styles.image}
                />
              </View>
            )}
            <FontText style={styles.name}>{data?.name}</FontText>
            <Icon name="star" size={13} color="#0066FF" style={styles.star} />
            <FontText style={styles.avgReview}>{data?.avgReview}</FontText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`tel:${data?.customerServiceNumber}`);
              }}
              style={styles.phone}>
              <Image
                style={{width: 16, height: 21}}
                source={require('@/assets/images/callIcon.png')}
              />
              {/* <IconFt name="phone" size={20} color="#0066FF" /> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${data?.website}`);
              }}
              style={styles.link}>
              {/* <IconFt name="external-link" size={22} color="#0066FF" /> */}
              <Image
                style={{width: 17, height: 16}}
                source={require('@/assets/images/linkIcon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={
            data?.logoImageUrl
              ? [styles.phNumContainer, {marginLeft: 53}]
              : styles.phNumContainer
          }>
          <FontText style={styles.phNum}>
            {data?.customerServiceNumber}
          </FontText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    elevation: 5,

    borderRadius: 12,

    height: 115,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {fontWeight: '700', fontSize: 20},
  circle: {
    width: 33,
    height: 33,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 10,
    marginRight: 20,
  },
  star: {
    marginLeft: 10,
  },
  avgReview: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0066FF',
    marginLeft: 4,
  },
  phone: {
    // transform: [{rotate: '15deg'}],
  },
  link: {
    marginLeft: 18,
  },
  phNumContainer: {
    width: 100,
    height: 26,
    borderRadius: 29,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
    marginBottom: 32,
  },
  phNum: {
    fontSize: 12,
    fontWeight: '500',
  },
});
