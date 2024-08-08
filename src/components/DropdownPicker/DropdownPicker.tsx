import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';
import {Control, Controller, FieldErrors} from 'react-hook-form';

interface IDropdownPickerProps {
  label: string;
  dataItems: any[];
  control: Control<any>;
  errors: FieldErrors;
  controllerName: string;
}

const DropdownPicker: React.FC<IDropdownPickerProps> = ({
  label,
  dataItems,
  control,
  errors,
  controllerName,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={{color: COLORS.WARNING, fontSize: scale(20)}}>*</Text>
      </View>
      <Controller
        name={controllerName}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownBox}
            data={dataItems}
            labelField="label"
            valueField="value"
            placeholder="Select an Index"
            value={value}
            onChange={item => onChange(item.value)}
            selectedTextStyle={styles.selectedItemLabel}
            itemTextStyle={styles.optionItemLabel} // Add this line
          />
        )}
      />
      {errors[controllerName] && (
        <Text style={styles.errorText}>
          {errors[controllerName]?.message as string}
        </Text>
      )}
    </View>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: verticalScale(16),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: scale(16),
    color: COLORS.PRIMARY_TEXT,
  },
  dropdown: {
    width: '100%',
    height: moderateScale(45),
    borderColor: COLORS.INPUT_BORDER,
    borderWidth: 1.5,
    borderRadius: moderateScale(5),
    paddingHorizontal: 8,
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  dropdownBox: {
    width: '100%',
  },
  selectedItemLabel: {
    fontSize: scale(14),
    color: COLORS.PRIMARY_TEXT, // Color of the selected item
  },
  optionItemLabel: {
    fontSize: scale(14),
    color: COLORS.PLACEHOLDER, // Color of the dropdown options
  },
  errorText: {
    color: COLORS.WARNING,
  },
});
