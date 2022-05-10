import axios from "axios"
import { useEffect, useState } from "react"

import { apiurl } from "../applicationURL"


export function HomePage() {

    const [vehicles, setvehicles] = useState([]);
    console.log("Vehicles are:", vehicles);


    const getVehicles = () => {
        axios({ url: `${apiurl}/allvehicles`, method: "GET" })
            .then((response) => {
                if (response.status === 200) {
                    setvehicles(response.data);
                }
            })
    }
    useEffect(getVehicles, [vehicles])
    return <h1>Hai aravind</h1>
}