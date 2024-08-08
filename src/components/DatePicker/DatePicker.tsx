import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface IDatePickerProps {
  label: string;
  control: Control<any>;
  errors: FieldErrors;
  controllerName: string;
}

const DatePickerComponent: React.FC<IDatePickerProps> = ({
  label,
  control,
  errors,
  controllerName,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleConfirm = (date: Date, onChange: (date: Date) => void) => {
    setSelectedDate(date);
    onChange(new Date(date.toString()));
  };

  return (
    <View style={styles.datePickerContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={{color: COLORS.WARNING, fontSize: scale(20)}}>*</Text>
      </View>
      <Controller
        control={control}
        name={controllerName}
        render={({field: {onChange}}) => (
          <View
            style={[
              styles.datePickerBox,
              {
                borderColor: errors[controllerName]
                  ? COLORS.WARNING
                  : COLORS.INPUT_BORDER,
              },
            ]}>
            <Text style={styles.placeholder}>
              {' '}
              {selectedDate ? selectedDate.toDateString() : 'Date of birth'}
            </Text>

            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <AntDesignIcon name="calendar" size={25} color="black" />
            </TouchableOpacity>
            <Modal
              transparent={false}
              visible={isDatePickerVisible}
              animationType="slide">
              <View style={styles.modalBackground}>
                <DatePicker
                  mode="date"
                  date={selectedDate || new Date()}
                  onDateChange={date => handleConfirm(date, onChange)}
                  maximumDate={new Date()} // Optional: Set a max date if needed
                />
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setIsDatePickerVisible(false)}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
      />
      {errors[controllerName] && (
        <Text style={styles.error}>
          {errors[controllerName].message as string}
        </Text>
      )}
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  datePickerContainer: {marginBottom: verticalScale(16)},

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: scale(16),
    color: COLORS.PRIMARY_TEXT,
  },
  datePickerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: moderateScale(5),
    backgroundColor: COLORS.INPUT_BACKGROUND,
    padding: moderateScale(10),
    height: moderateScale(45),
    marginTop: moderateScale(5),
  },
  placeholder: {
    fontSize: scale(13),
  },
  error: {
    color: COLORS.WARNING,
    fontSize: scale(12),
    marginTop: moderateScale(5),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  doneButton: {
    marginTop: verticalScale(20),
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  doneButtonText: {
    color: 'white',
    fontSize: scale(16),
  },
});
