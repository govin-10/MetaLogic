import {check, request, RESULTS, Permission} from 'react-native-permissions';

const checkPermission = async (permission: Permission) => {
  try {
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const requestPermission = async (permission: Permission) => {
  console.log(permission);
  try {
    const result = await request(permission);
    console.log(result);
    return result === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
};

export {checkPermission, requestPermission};
