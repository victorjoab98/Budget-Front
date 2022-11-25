import { api } from "../../api/axios";
import {  setBanks, setCategories, setCurrencies, setFetched, setRecordTypes } from "./appSlice";

export const getApiContentThunk = (  ) => {
    return async ( dispatch ) => {
        try {
            const res = await api(`/app/get/all`);
            const {data} = res;
            const { recordTypes , banks, currencies, categories } = data;
            dispatch( setRecordTypes( recordTypes ) );
            dispatch( setBanks( banks ) );
            dispatch( setCurrencies( currencies ) );
            dispatch( setCategories( categories ) );
            dispatch( setFetched( true ) );
        } catch (error) {
            console.log(error);
        }
    }   
}


export const getBanksThunk = (  ) => {
    return async ( dispatch ) => {
        try {
            const res = await api(`/bank/get/all`);
            const {data} = res;
            dispatch( setBanks( data ) );
        } catch (error) {
            console.log(error);
        }
    }   
}

export const getCurrencyThunk = (  ) => {
    return async ( dispatch ) => {
        try {
            const res = await api(`/currency/get/all`);
            const {data} = res;
            dispatch( setCurrencies( data ) );
        } catch (error) {
            console.log(error);
        }
    }   
}

export const getCategoriesThunk = (  ) => {
    return async ( dispatch ) => {
        try {
            const res = await api(`/currency/get/all`);
            const {data} = res;
            dispatch( setCategories( data ) );
        } catch (error) {
            console.log(error);
        }
    }   
}