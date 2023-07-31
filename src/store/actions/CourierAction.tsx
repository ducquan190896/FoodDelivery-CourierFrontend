import { Dispatch } from "react";
import { ACTION } from "../../model/UserModel";
import { HOST_URL } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourierStatus, NavigationMode } from "../../model/CourierModel";

// Update the location of a courier
export const updateCourierLocation = (longitude: number, latitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/courier/authenticated/longitude/${longitude}/latitude/${latitude}`, {}, {
      headers: { Authorization: token }
    });
    dispatch(updateCourierLocationSuccess(response.data));
  } catch (error) {
    dispatch(updateCourierLocationFailure(error));
  }
};

const updateCourierLocationSuccess = (data: any) => ({
  type: "UPDATE_COURIER_LOCATION",
  payload: data,
});

const updateCourierLocationFailure = (error: unknown) => ({
  type: "COURIER_ERROR",
  payload: error,
});


// Update Couirer Status
export const updateCourierStatus = (status: CourierStatus) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/couriers/courier/authenticated/status/${status}`, {}, {
      headers: { Authorization: token }
    });
    dispatch(updateCourierStatusSuccess(response.data));
  } catch (error) {
    dispatch(updateCourierStatusFailure(error));
  }
}

export const updateCourierStatusSuccess = (data: any) => ({
  type: "UPDATE_COURIER_STATUS",
  payload: data,
});

const updateCourierStatusFailure = (error: unknown) => ({
  type: "COURIER_ERROR",
  payload: error,
});

// Update Couirer navigation mode
export const updateCourierMode = (mode: NavigationMode) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  
  try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${HOST_URL}/api/couriers/courier/authenticated/mode/${mode}`, {}, {
      headers: { Authorization: token }
    });
      dispatch(updateCourierModeSuccess(response.data));
     
    } catch (error) {
      dispatch(updateCourierModeFailure(error));
    }
}
  
const updateCourierModeSuccess = (data: any) => ({
    type: "UPDATE_COURIER_MODE",
    payload: data,
});

const updateCourierModeFailure = (error: unknown) => ({
    type: "COURIER_ERROR",
    payload: error,
});

//get authentificated courier
export const getAuthenticatedCourier = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${HOST_URL}/api/couriers/courier/authenticated` ,{
          headers: { Authorization: token },
        });
      console.log(response.data);
      dispatch(getAuthenticatedCourierSuccess(response.data));
    } catch (error) {
        dispatch(getAuthenticatedCourierFailure(error));
    }
}
    
const getAuthenticatedCourierSuccess = (data: any) => ({
    type: "GET_AUTHENTICATED_COURIER",
    payload: data,
});

const getAuthenticatedCourierFailure = (error: unknown) => ({
    type: "COURIER_ERROR",
    payload: error,
});


