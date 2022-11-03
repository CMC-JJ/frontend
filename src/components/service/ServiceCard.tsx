import {View, StyleSheet, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import FontText from '../FontText';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFt from 'react-native-vector-icons/Feather';
import IconOct from 'react-native-vector-icons/Octicons';

export interface AirlinesDetailProps {
  airportId: number;
  airportName: string;
  customerServiceNumber: string;
  website: string;
  avgReview: string;
  availableAt: string;
  airportServices: {
    id: number;
    name: string;
  }[];
  image?: string;
}

export function ServiceCard({data}: {data: AirlinesDetailProps | undefined}) {
  useEffect(() => {
    console.log('ss', data?.availableAt);
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
      {/* 전화번호 */}
      <View
        style={
          data?.image
            ? [titleStyles.phNumContainer, {marginLeft: 53}]
            : titleStyles.phNumContainer
        }>
        <FontText style={titleStyles.phNum}>
          {data?.customerServiceNumber}
        </FontText>
      </View>
      <View>
        <FlatList
          data={data?.airportServices}
          style={infoStyles.info}
          ItemSeparatorComponent={() => <View style={infoStyles.separator} />}
          renderItem={({item}) => (
            <View style={infoStyles.infoContainer}>
              <IconOct
                style={infoStyles.dot}
                size={20}
                color="black"
                name="dot-fill"
              />
              <FontText style={infoStyles.text}>{item.name}</FontText>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={availableAt.container}>
        <FontText style={availableAt.title}>고객센터 이용 시간</FontText>
        <FontText style={availableAt.time}>{data?.availableAt}</FontText>
      </View>
    </View>
  );
}
const infoStyles = StyleSheet.create({
  info: {
    marginBottom: 32,
  },
  separator: {
    height: 10,
  },
  text: {fontWeight: '500', fontSize: 14},
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginLeft: 10,
    marginRight: 31,
  },
});
const availableAt = StyleSheet.create({
  container: {
    marginLeft: 51,
  },
  title: {fontSize: 15, fontWeight: '600', marginBottom: 11},
  time: {fontSize: 14, fontWeight: '500', color: '#7C7C7C'},
});
const titleStyles = StyleSheet.create({
  title: {flexDirection: 'row', alignItems: 'center'},
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
    position: 'absolute',
    transform: [{rotate: '15deg'}],
    right: 50,
  },
  link: {position: 'absolute', right: 0},
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

  image: {
    width: 30,
    height: 30,
  },
});
