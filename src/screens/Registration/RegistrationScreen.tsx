import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors/colors';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {Controller, useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import userSchema from '../../utils/zodSchema/userSchema';
import {
  DatePickerComponent,
  DropdownComponent,
  ImagePickerComponent,
  RadioSelectorComponent,
  TextInputComponent,
} from '../../components';
import {
  districtData,
  indexData,
  provinceData,
  radioOptions,
} from '../../constants/dropdownData/dropdownData';
import {PersonData} from '../../types/StackParamsTypes';

const RegistrationScreen: React.FC = ({navigation}: any) => {
  StatusBar.setBackgroundColor(COLORS.PRIMARY);
  StatusBar.setBarStyle('dark-content');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonData>({
    resolver: zodResolver(userSchema),
  });

  const handleFormSubmit: SubmitHandler<PersonData> = data => {
    navigation.navigate('Detail', {PersonData: data});
  };

  return (
    <SafeAreaView style={styles.registrationScreenContainer}>
      <ScrollView style={styles.registrationContentContainer}>
        <Text style={styles.headerText}>Person Registration Form</Text>
        <View style={styles.registrationContainer}>
          {/* Full name */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="full_name"
            label="Full Name"
            required
            placeholder="eg: Ram Bahadur"
            numeric={false}
          />
          {/* Email address */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="email"
            label="Email"
            required
            placeholder="eg: rambahadur@gmail.com"
            numeric={false}
          />
          {/* Nickname */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="nickname"
            label="Nickname (Optional)"
            required={false}
            placeholder="eg: Ramu"
            numeric={false}
          />
          {/* Photo */}
          <ImagePickerComponent
            control={control}
            errors={errors}
            label="Your Photo"
            controllerName="photo"
          />

          {/* index dropdown */}
          <DropdownComponent
            label="Index"
            dataItems={indexData}
            control={control}
            errors={errors}
            controllerName="index"
          />
          {/* BIrth place */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="birth_place"
            label="Birth Place"
            required
            placeholder="eg: Kathmandu"
            numeric={false}
          />
          {/* Profession */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="profession"
            label="Profession"
            required={false}
            placeholder="eg: Teacher"
            numeric={false}
          />
          {/* Origin Place */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="origin_place"
            label="Origin Place"
            required={false}
            placeholder="eg: Kathmandu"
            numeric={false}
          />
          {/* MIgration */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="migration"
            label="Remarks(Migration)"
            required
            placeholder="eg: Bajhang to Dhangadhi to Kathmandu"
            numeric={false}
          />
          {/* radio for alive/dead/contactless */}
          {/* radio Selector */}
          <Controller
            control={control}
            name="status"
            defaultValue="Alive"
            render={({field: {onChange, value}}) => (
              <RadioSelectorComponent
                options={radioOptions}
                value={value}
                onValueChange={onChange}
              />
            )}
          />
          {errors.status && (
            <Text style={styles.errorText}>
              {errors.status.message as string}
            </Text>
          )}
          {/* contact number */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="contact_number"
            label="Contact"
            required
            placeholder="eg: 98XXXXXXXX"
            numeric={false}
          />
          {/* date of birth, date picker */}
          <DatePickerComponent
            label="Birth Date"
            control={control}
            errors={errors}
            controllerName="dateOfBirth"
          />
          {/* current address */}
          <Text style={styles.addressHeader}>Current Address</Text>
          {/* province */}
          <DropdownComponent
            label="Province"
            dataItems={provinceData}
            control={control}
            errors={errors}
            controllerName="province"
          />
          {/* district */}
          <DropdownComponent
            label="District"
            dataItems={districtData}
            control={control}
            errors={errors}
            controllerName="district"
          />
          {/* local/municipality */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="local_municipality"
            label="Local level/Municipality"
            required
            placeholder="eg: Kathmandu"
            numeric={false}
          />
          {/* ward no */}
          <TextInputComponent
            control={control}
            errors={errors}
            controllerName="ward_no"
            label="Ward"
            required
            placeholder="eg: 1"
            numeric
          />
        </View>
        {/* confirm button */}
        <TouchableOpacity
          onPress={handleSubmit(handleFormSubmit)}
          style={styles.button}>
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  registrationScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  registrationContentContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  headerText: {
    marginVertical: verticalScale(5),
    alignSelf: 'center',
    fontSize: scale(18),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  registrationContainer: {
    flex: 1,

    padding: moderateScale(10),
  },
  button: {
    marginBottom: verticalScale(20),
    backgroundColor: COLORS.SECONDARY,
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.SECONDARY_TEXT,
    fontSize: scale(16),
  },
  addressHeader: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  errorText: {
    color: COLORS.WARNING,
  },
});
