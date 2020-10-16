import React, {useState, useEffect} from 'react';

const GetData = async page =>{

    const userData = await (
        await fetch(`https://randomuser.me/api/?page=${page}&results=30`)
    ).json()
   

    return userData.results
}

export default GetData;