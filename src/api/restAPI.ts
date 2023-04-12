import axios, { AxiosInstance } from "axios";
import { Make, Model } from "../types/types";

interface Data {
  items: any[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

const instance: AxiosInstance = axios.create({
  baseURL: 'https://baseurlofmybackend.com/api/',
});


/*
  This could have been stored in .env but for this purposes this is ok
  If URL changes we need to change it only in one placeRest
*/
const VEHICLEMAKE_URL = "/vehicle-makes";
const VEHICLEMADE_URL = "/vehicle-mades";


export async function fetchMake(page : number, limit:number, filter:string, sortOrder:string) {
    try {
      const response = await instance.get<Data>(VEHICLEMAKE_URL, {
        params: { page, limit, filter, sortOrder },
      });
      return {items:response.data.items, totalPages: response.data.totalPages, currentPage:response.data.currentPage, totalItems: response.data.totalItems};
    } catch (error) {
      console.error(error);
      return { items: [], totalPages: 1, currentPage: 1, totalItems: 0 };
    }
}

export async function fetchMade(page : number, limit:number, filter:string, sortOrder:string) {
    try {
      const response = await instance.get<Data>(VEHICLEMADE_URL, {
        params: { page, limit, filter, sortOrder },
      });
      return {items:response.data.items, totalPages: response.data.totalPages, currentPage:response.data.currentPage, totalItems: response.data.totalItems};
    } catch (error) {
      console.error(error);
      return { items: [], totalPages: 1, currentPage: 1, totalItems: 0 };
    }
}


export async function addMakeRest(newMake: Make) {
  try {
    const response = await instance.post(VEHICLEMAKE_URL, newMake);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateMakeRest(makeId: string, updatedMake: Make) {
  try {
    const response = await instance.put(`${VEHICLEMAKE_URL}/${makeId}`, updatedMake);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteMakeRest(makeId: string) {
  try {
    const response = await instance.delete(`${VEHICLEMAKE_URL}/${makeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addMadeRest(newMade: Model) {
  try {
    const response = await instance.post(VEHICLEMADE_URL, newMade);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateMadeRest(madeId: string, updatedMade: Model) {
  try {
    const response = await instance.put(`${VEHICLEMADE_URL}/${madeId}`, updatedMade);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteMadeRest(madeId: string) {
  try {
    const response = await instance.delete(`${VEHICLEMADE_URL}/${madeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
