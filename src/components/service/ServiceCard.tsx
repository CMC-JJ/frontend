import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontText from '../FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFt from 'react-native-vector-icons/Feather';

export interface AirlinesDetailProps {
  airportId: number;
  airportName: string;
  customerServiceNumber: string;
  website: string;
  avgReview: string;
  availdableAt: string;
  airportServices: {
    id: number;
    name: string;
  }[];
  image?: string;
}

export function ServiceCard({data}: {data: AirlinesDetailProps | undefined}) {
  useEffect(() => {
    console.log('ss', data);
  }, [data]);
  return (
    <View style={styles.container}>
      {/* title 부분 */}
      <View style={titleStyles.title}>
        {data?.image && (
          <View style={titleStyles.circle}>
            <Image
              source={{
                uri: data?.image,
              }}
              style={styles.image}
            />
          </View>
        )}
        <FontText style={titleStyles.name}>{data?.airportName}</FontText>
        <Icon name="star" size={13} color="#0066FF" style={titleStyles.star} />
        <FontText style={titleStyles.avgReview}>{data?.avgReview}</FontText>
        <IconFt
          name="phone"
          size={20}
          color="#0066FF"
          style={titleStyles.phone}
        />
        <IconFt
          name="external-link"
          size={22}
          color="#0066FF"
          style={titleStyles.link}
        />
      </View>

      <View />
      <View />
      <View />
    </View>
  );
}
const titleStyles = StyleSheet.create({
  title: {flexDirection: 'row', alignItems: 'center'},
  name: {fontWeight: '700', fontSize: 20},
  circle: {
    width: 33,
    height: 33,
    marginRight: 20,
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
    position: 'absolute',
    transform: [{rotate: '15deg'}],
    right: 50,
  },
  link: {position: 'absolute', right: 0},
});

const styles = StyleSheet.create({
  container: {
    height: 314,
    backgroundColor: '#FFFFFF',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 12,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 34,
  },

  info: {},
  availableAt: {},

  image: {
    width: 30,
    height: 30,
  },
});
