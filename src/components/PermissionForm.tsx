import {StyleSheet, View} from 'react-native';
import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {FontText} from './FontText';
// import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '@/screens';
import {data} from '@/assets/texts/TermsText';
interface PermissionFormProps {
  title: string;
  subtitle: string;
  iconName: string;
  detailInfo?: string;
}
export function PermissionForm({
  title,
  subtitle,
  iconName,
  detailInfo,
}: PermissionFormProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.iconForm}>
          <Icon style={styles.icon} name={iconName} size={25} color="gray" />
        </View>
        <View style={styles.textContainer}>
          <FontText style={styles.title}>{title}</FontText>
          <FontText style={styles.subtitle}>{subtitle}</FontText>
          <FontText
            onPress={() =>
              navigation.navigate('Terms', {
                title: data[0].title,
                text: data[0].text,
              })
            }
            style={styles.detailInfo}>
            {detailInfo}
          </FontText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  form: {
    flexDirection: 'row',
  },
  textContainer: {marginTop: 3, marginLeft: 15, flexShrink: 1},
  iconForm: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(210,225,255)',
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  icon: {
    color: 'black',
  },
  title: {fontSize: 15, marginBottom: 6, color: '#3A3D40', fontWeight: '500'},
  subtitle: {
    fontSize: 15,
    color: '#63666A',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  detailInfo: {
    fontSize: 15,
    color: '#63666A',
    textDecorationLine: 'underline',
    flexWrap: 'wrap',
  },
});
