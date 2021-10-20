import React,{ createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Receta from '../components/Receta';

//crear conext
export const ModalContext = createContext();

const ModalProvider = (props) => {


    //state del provider
    const [ idReceta, guardarIdReceta ] = useState(null);
    const [ info, guardarReceta ] = useState({});

    //una vez que tenemos una receta, llamar a la api
    useEffect(() => {

        const obtenerReceta = async () => {
            if(!idReceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const resultado = await axios(url);
            guardarReceta(resultado.data.drinks[0])
        }

        obtenerReceta();

    }, [idReceta]);

    return ( 
        <ModalContext.Provider
            value={{
                info,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
