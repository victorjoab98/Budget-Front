import { api } from "../../api/axios";
import { setAccounts, setUserFetched, setUserId } from "./userAccountSlice";

export const loginUserThunk = ({ username, password }) =>  dispatch => {
    return new Promise ( (resolve, reject)  => {
        api.post( '/auth/login', { username, password })
        .then( res => {
            const { token } = res.data;
            const { user } = res.data;
            resolve(res);
            localStorage.setItem( 'user_token', token );
            dispatch( setUserId( user.customer.id ));
            dispatch( getUserContentThunk( user.customer.id ) );
        })
        .catch( err=> reject(err) )
    })
}

export const logoutThunk = () => dispatch => {
  localStorage.setItem('user_token', '');
  dispatch( clearState );
} 

export const getUserContentThunk = ( userId ) => {
    return async ( dispatch ) => {
        try {
            console.log(' called: getUserContentThunk');

            const res = await api(`/customer/get/all/${ userId }`);
            const {data} = res;
            const { accounts } = data;

            dispatch( setAccounts( accounts ) );
            dispatch( setUserFetched( true ) );

        } catch (error) {
            console.log(error);
        }
    }   
};

export const getAccountsThunk = ( userId ) => {
    return async ( dispatch ) => {
        try {
            console.log(' called: getAccountsThunk');
            const res = await api(`/account/myaccounts/${userId}`);
            const {data} = res;
            dispatch( setAccounts( data ) );
        } catch (error) {
            console.log(error);
        }
    }   
}

export const updateAccountThunk = ( accountId, newBalance, customerId ) => dispatch => {
    return new Promise ( (resolve, reject)  => {
        
        api.patch(`/account/update-balance/${accountId}`, { newBalance })
        .then( res => {
            dispatch( getAccountsThunk( customerId ) );
            resolve(res);
        })
        .catch( err => {
            reject(err);
        })
    })   
};

export const createAccountThunk = ( account ) => dispatch => {
    return new Promise ( (resolve, reject)  => {
        
        api.post(`/account`, account)
        .then( res => {
            dispatch( getAccountsThunk( account.customerId ) );
            resolve(res);
        })
        .catch( err => {
            reject(err);
        })
    })   
};

export const newTransfer = ( transferBody, userId ) => dispatch => {
    return new Promise ( (resolve, reject)  => {
        
        api.post(`/records/transfer/`, transferBody)
        .then( res => {
            resolve(res);
            dispatch( getAccountsThunk( userId ));
        })
        .catch( err => {
            reject(err);
        })
    })   
};

export const addRecordThunk = ( record, userId ) => dispatch => {
    return new Promise ( (resolve, reject)  => {
        
        api.post(`/records`, record)
        .then( res => {
            resolve(res);
            dispatch( getAccountsThunk( userId ));
        })
        .catch( err => {
            reject(err);
        })
    })   
};

export const getRecordsByUserId = ( userId, limit = 10, offset = 0  ) => {
    return new Promise ( (resolve, reject)  => {
        
        api.get(`/records/user/${ userId }`, { params: { limit, offset } })
        .then( res => {
            resolve(res);
        })
        .catch( err => {
            reject(err);
        })
    }) 
};

export const getRecordsByAccounId = ( accountId, limit = 10, offset = 0  ) => {
    return new Promise ( (resolve, reject)  => {
        
        api.get(`/records/account/${ accountId }`, { params: { limit, offset } })
        .then( res => {
            resolve(res);
        })
        .catch( err => {
            reject(err);
        })
    }) 
};

export const getRecordsByBank = ( userId, bankId, limit = 10, offset = 0  ) => {
    return new Promise ( (resolve, reject)  => {
        
        api.get(`/records/bank/${ bankId }/user/${ userId }`, { params: { limit, offset } })
        .then( res => {
            resolve(res);
        })
        .catch( err => {
            reject(err);
        })
    }) 
};