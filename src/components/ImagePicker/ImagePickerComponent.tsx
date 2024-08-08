import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import COLORS from '../../constants/colors/colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  checkPermission,
  requestPermission,
} from '../../utils/Permission/Permission';
import {PERMISSIONS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';

interface ImagePickerComponentProps {
  control: Control<any>;
  errors: FieldErrors;
  label: string;
  controllerName: string;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({
  control,
  errors,
  label,
  controllerName,
}) => {
  const [filename, setFilename] = useState<string | undefined>('');
  const [imageUri, setImageUri] = useState<string | undefined>('');

  const handleImageUpload = async (onChange: (value: string) => void) => {
    //checking for permission first
    await checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
      res => {
        if (!res) {
          requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(
            grantedResponse => {
              if (grantedResponse) {
                launchImageLibrary({mediaType: 'photo'}, response => {
                  if (response.didCancel) {
                    console.log('user canceled to upload new photo');
                  } else if (response.assets) {
                    const {uri, fileName} = response.assets[0];
                    setFilename(fileName);
                    setImageUri(uri);
                    onChange(String(uri) || '');
                  }
                });
              }
            },
          );
        } else {
          //if permission already set, photo directly upload garne feature dine
          launchImageLibrary({mediaType: 'photo'}, response => {
            if (response.didCancel) {
            } else if (response.assets) {
              const {uri, fileName} = response.assets[0];
              setFilename(fileName);
              setImageUri(uri);
              onChange(String(uri) || '');
            }
          });
        }
      },
    );
  };

  return (
    <View style={styles.imagePickerContainer}>
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
              styles.imagePickerBox,
              {
                borderColor: errors[controllerName]
                  ? COLORS.WARNING
                  : COLORS.INPUT_BORDER,
              },
            ]}>
            <Text
              ellipsizeMode="tail"
              style={[
                styles.filename,
                {color: imageUri ? COLORS.PRIMARY_TEXT : COLORS.PLACEHOLDER},
              ]}>
              {filename ? filename : 'eg: filename.jpg'}
            </Text>
            <TouchableOpacity onPress={() => handleImageUpload(onChange)}>
              <AntDesignIcon name="upload" size={25} color="black" />
            </TouchableOpacity>
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

export default ImagePickerComponent;

const styles = StyleSheet.create({
  imagePickerContainer: {
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
  imagePickerBox: {
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
  filename: {
    fontSize: scale(13),
    flexShrink: 1,
  },
  error: {
    color: COLORS.WARNING,
    fontSize: scale(12),
    marginTop: moderateScale(5),
  },
});
