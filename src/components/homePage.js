import axios from "axios"
import { useEffect, useState } from "react"

import { url } from "../applicationURL"


export function HomePage() {

    const [vehicles, setvehicles] = useState([]);
    console.log("Vehicles are:", vehicles);


    const getVehicles = () => {
        axios({ url: `${url}/allvehicles`, method: "GET", })
            .then((response) => {
                if (response.status === 200) {
                    setvehicles(response.data);
                }
            })
    }

    useEffect(getVehicles, [vehicles])

    return <h1>Hai aravind</h1>
}