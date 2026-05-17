
import { headers } from "next/headers";
import { auth } from "./auth";


export const getDestinationData = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`)
    const data = await res.json();
    console.log(data)
    return data;
}

// server component teke token pataice
export const getDesDetailsData = async(id)=>{
    const {token} = await auth.api.getToken({
   headers: await headers()
 })
//  console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
            
        } // akta word set kore dice j user log in takle eita server pabe and tokoni details dibe otherwise kichu dibe na
    })
    const DetailsData = await res.json();
    return DetailsData;
}