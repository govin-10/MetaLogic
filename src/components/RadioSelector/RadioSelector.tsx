import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';

interface IRadioSelectorProps {
  options: any[];
  value: string;
  onValueChange: (value: string) => void;
}

const RadioSelector: React.FC<IRadioSelectorProps> = ({
  options,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => onValueChange(option.value)}>
          <View style={styles.circle}>
            {value === option.value && <View style={styles.filledCircle} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  label: {
    fontSize: moderateScale(14),
    color: COLORS.PRIMARY_TEXT,
  },
  circle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: COLORS.PRIMARY_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filledCircle: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.SECONDARY,
  },
});

export default RadioSelector;
