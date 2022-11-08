import { api } from "../../api/axios";
import { setAccounts } from "./userAccountSlice";

export const getAccountsThunk = ( userId ) => {
    return async ( dispatch ) => {
        try {
            const res = await api(`/account/myaccounts/${userId}`);
            const {data} = res;
            dispatch( setAccounts( data ) );
        } catch (error) {
            console.log(error);
        }
    }   
}
