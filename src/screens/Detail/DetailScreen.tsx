import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../types/StackParamsTypes';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';

type DetailScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {PersonData} = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.headerText}>Person Details</Text>
      <View style={styles.headerContent}>
        <Image source={{uri: PersonData.photo}} style={styles.image} />
        <View>
          <Text style={styles.name}>{PersonData.full_name}</Text>
          <Text style={styles.email}>{PersonData.email}</Text>
        </View>
      </View>
      <View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Birth Place: </Text>
          <Text style={styles.value}>{PersonData.birth_place}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Profession: </Text>
          <Text style={styles.value}>{PersonData.profession}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Origin Place: </Text>
          <Text style={styles.value}>{PersonData.origin_place}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Index: </Text>
          <Text style={styles.value}>{PersonData.index}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Contact: </Text>
          <Text style={styles.value}>{PersonData.contact_number}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Life Status: </Text>
          <Text style={styles.value}>{PersonData.status}</Text>
        </View>
        <Text style={[styles.headerText, {alignSelf: 'flex-start'}]}>
          Current Address
        </Text>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Province: </Text>
          <Text style={styles.value}>{PersonData.province}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>District: </Text>
          <Text style={styles.value}>{PersonData.district}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Municipality: </Text>
          <Text>{PersonData.local_municipality}</Text>
        </View>
        <View style={styles.displayFlex}>
          <Text style={styles.key}>Ward No: </Text>
          <Text style={styles.value}>{PersonData.ward_no}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: moderateScale(10),
  },
  headerText: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
    marginVertical: verticalScale(10),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
    marginVertical: verticalScale(5),
  },
  image: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
  },
  name: {
    fontSize: scale(16),
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  email: {
    fontSize: scale(14),
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  displayFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  key: {
    fontSize: scale(14),
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  value: {
    fontSize: scale(14),
    color: COLORS.PRIMARY_TEXT,
  },
});
