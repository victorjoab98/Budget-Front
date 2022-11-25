const { useEffect, useState } = require("react");
const { setCategories } = require("store/appSlice");
const { useAppSelector } = require("./reduxHooks");

export const useCategories = ( categoryType ) => {

    const [ categories, setCategories ] = useState([]);
    const categoriesFromRedux =  useAppSelector( state => state.app.categories );
    
    useEffect( () => {
        if( categoriesFromRedux ){

            const categroiesType = 
                categoriesFromRedux.filter( 
                    category => category.type === categoryType );
            setCategories( categroiesType );
        }
    }, [categoriesFromRedux, categoryType]);

    return [ categories ];
   
}