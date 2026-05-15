export const getDestinationData = async()=>{
    const res = await fetch('http://localhost:8000/destination')
    const data = await res.json();
    return data;
}
export const getDesDetailsData = async(id)=>{
    const res = await fetch(`http://localhost:8000/destination/${id}`)
    const DetailsData = await res.json();
    return DetailsData;
}