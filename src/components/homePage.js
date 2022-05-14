import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

import { apiurl } from "../applicationURL"

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


export function HomePage() {

    const history = useHistory();
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
    useEffect(getVehicles, [])
    return (
        <div className="Homepage-main-div">
            <div>
                <Card className="Homepage-instruction-card">
                    <h2 className="Homepage-instruction-title"> Instructions</h2>
                    <p className="Homepage-instruction-note">Read the instructions carefully before renting the vehicles.</p>
                    <ul>
                        <li className="Homepage-instruction-list">Check the vechicle before rent it.</li>
                        <li className="Homepage-instruction-list">Advance need to paid before renting vehicle.Without advance customer can't rent the vehicle</li>
                        <li className="Homepage-instruction-list">Person should pay the repair amount if any damage caused.</li>
                        <li className="Homepage-instruction-list">Swapping spares in the rented vehicle will leads to legal actions.</li>
                        <li className="Homepage-instruction-list">No extra passengers are allowed other than seat capacity</li>
                        <li className="Homepage-instruction-list">Legal actions will be taken if the customer is not attening the teams call frequently.</li>

                    </ul>
                </Card>
            </div>
            <div>
                {vehicles.map(
                    ({ _id, image, vehiclename, catagory, noofseats, noofpassengers, price }) => (
                        
                        <div className="Homepage-content-div" key={_id}>
                            <Card className="Homepage-content-div-card">
                                <div className="Homepage-content-sub-div-1">
                                    <img className="Homepage-vehicles-images" src={image} alt="vehicles" />
                                </div>

                                <div className="Homepage-content-sub-div-2">
                                    <h4>Vehicle name: {vehiclename}</h4>
                                    <p>catagory: {catagory}</p>
                                    <p>No of seats: {noofseats}</p>
                                    <p>No of passengers allowed: {noofpassengers}</p>
                                    <p>Price: {price}</p>
                                    <Button className="Homepage-content-sub-div-2-btn" onClick={() => history.push(`/bookvehicles/${_id}`)} variant="warning">Book now</Button>
                                </div>
                            </Card>
                        </div>
                       
                    )

                )}
            </div>

        </div>
    )
}