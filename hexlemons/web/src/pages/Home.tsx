import React from 'react';
import { useHelloQuery } from '../generated/graphql';


export const HomePage : React.FC = () => {

    const {loading, data} = useHelloQuery();

    if(loading) return <>loading...</>
    return(
        <>
            {data?.hello}
        </>
    );
}