import { apiurl } from "../applicationURL"
import axios from "axios"
import { useState,useEffect } from "react";
import Card from 'react-bootstrap/Card'

export function Mybookings() {

    const authtoken = sessionStorage.getItem("token");
    const authemail = sessionStorage.getItem("emailid");

    const[bookings,setbookings]=useState([]);
    console.log(bookings)

    const myBookings = () => {
        const auth = {
            token: authtoken,
            emailid: authemail
        }
        axios({ url: `${apiurl}/mybookings`, method: "POST", headers: auth, })
            .then((response) => {
                if(response.status===200){
                    setbookings(response.data.bookingdetails);
                }
            })
    }

    useEffect(myBookings,[]);
    return (
        <div>
                {bookings.map(
                    ({_id,vehiclename}) => (
            
                        <div className="mybooking-content-div">
                            <Card classNam="mybookinge-content-div-card">
                                <div className="mybooking-content-sub-div">
                                <div className="mybooking-content-sub-div-1">
                                    <img className="mybooking-vehicles-images" src={vehiclename.image} alt="vehicles" />
                                </div>

                                <div className="mybooking-content-sub-div-2">
                                    <h4 className="mybooking-content-sub-div-2-text">Vehicle name: {vehiclename.vehiclename}</h4>
                                    <p className="mybooking-content-sub-div-2-text">catagory: {vehiclename.catagory}</p>
                                    <p className="mybooking-content-sub-div-2-text">No of seats: {vehiclename.oofseats}</p>
                                    <p className="mybooking-content-sub-div-2-text">No of passengers allowed: {vehiclename.noofpassengers}</p>
                                    <p className="mybooking-content-sub-div-2-text">Price: {vehiclename.price}</p>
                                </div>
                                </div>
                            </Card>
                        </div>
                       
                    )

                )}
            </div>
    )
}