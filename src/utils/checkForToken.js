import jwtDecode from "jwt-decode";
import { store } from "store/store";
import { setUser, setUserLogged } from "store/userAccount";
import { logoutThunk } from "store/userAccount";

export const checkForToken = () => {
    
    console.log('called: checkForToken');
    if ( localStorage.getItem('user_token') ){
        console.log('token found');
        const token = localStorage.getItem('user_token');
        const token_decode =  jwtDecode(token);
        const { id, username, customerId, name, email } = token_decode;

        store.dispatch( setUser( { id, name, email, username, customerId } ) );
        store.dispatch( setUserLogged( true ) );

        const currenTime = Math.floor(Date.now() / 1000);
        if(token_decode.exp < currenTime){
            store.dispatch( logoutThunk() );
            window.location.href = "/login"
        }   

    }

}