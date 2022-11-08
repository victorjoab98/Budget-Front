import { api } from "../../api/axios";
import {  setBanks, setCurrencies } from "./appSlice";


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