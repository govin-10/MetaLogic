import {
  ImageProps,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';
import {Controller, Control, FieldErrors} from 'react-hook-form';

interface ITextInputProps extends TextInputProps {
  control: Control<any>;
  errors: FieldErrors;
  controllerName: string;
  label: string;
  required: boolean;
  editable?: boolean;
  icon?: ImageProps;
  numeric?: boolean;
}

const TextInputComponent: React.FC<ITextInputProps> = ({
  control,
  errors,
  controllerName,
  label,
  required,
  placeholder,
  numeric,
  ...props
}) => {
  return (
    <View style={styles.inputCompContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.required}>{required && '*'}</Text>
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: errors[controllerName]
              ? COLORS.WARNING
              : COLORS.INPUT_BORDER,
          },
        ]}>
        <Controller
          control={control}
          name={controllerName}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={COLORS.PLACEHOLDER}
              value={value}
              onChangeText={value =>
                numeric ? onChange(Number(value)) : onChange(String(value))
              }
              onBlur={onBlur}
              style={styles.inputField}
              {...props}
            />
          )}
        />
      </View>
      {errors[controllerName] && (
        <Text style={styles.errorText}>
          {errors[controllerName]?.message as string}
        </Text>
      )}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  inputCompContainer: {
    marginBottom: verticalScale(16),
  },
  labelContainer: {flexDirection: 'row'},
  label: {
    fontSize: scale(16),
    color: COLORS.PRIMARY_TEXT,
  },
  required: {
    color: COLORS.WARNING,
    fontSize: scale(20),
    alignSelf: 'center',
  },
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.INPUT_BACKGROUND,
  },
  inputField: {
    fontSize: scale(13),
    padding: moderateScale(10),
  },
  errorText: {
    color: COLORS.WARNING,
    fontSize: scale(12),
    marginTop: moderateScale(5),
  },
});
