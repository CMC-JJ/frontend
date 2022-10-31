import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
interface IForm {
  title: string;
  subtitle: string;
  iconName: string;
  detailInfo?: string;
}
export default function PermissionForm({
  title,
  subtitle,
  iconName,
  detailInfo,
}: IForm) {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.iconForm}>
          <Icon style={styles.icon} name={iconName} size={25} color="gray" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.detailInfo}>{detailInfo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 10, display: 'flex', flexWrap: 'wrap'},
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
  title: {fontSize: 20, marginBottom: 6},
  subtitle: {
    fontSize: 15,
    color: 'rgba(80, 80, 80,0.7)',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  detailInfo: {
    fontSize: 15,
    color: 'rgba(80, 80, 80,0.7)',
    textDecorationLine: 'underline',
  },
});
