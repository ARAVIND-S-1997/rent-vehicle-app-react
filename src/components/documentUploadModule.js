
import axios from "axios";
import { useState } from "react"
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { apiurl } from "../applicationURL";





export function Document({ unique }) {

    const authtoken = sessionStorage.getItem("token");
    const authemail = sessionStorage.getItem("emailid");

    const history = useHistory();
    const [images, setimages] = useState([]);
    console.log("blob files:", images)

    const handleChange = (event) => {

        const imageFiles = Array.from(event.target.files).map((files) => (URL.createObjectURL(files)));
        setimages(imageFiles)
        Array.from(event.target.files).map((files) => (URL.revokeObjectURL(files)));
    }

    const updateDocument = () => {
        if (images.length === 3) {
            const auth = {
                token: authtoken,
                emailid: authemail,
                unique: unique
            }


            axios({ url: `${apiurl}/document`, method: "POST", headers: auth, data: { images } })
                .then((response) => {
                    if (response.status === 200) {
                        history.push("/finished")
                    }
                })

        }

    }

    return (
        <div className="document-main-div" >
            <Card className="document-card" >
                <div className="document-content-div">
                    <h4 className="document-content-titles">Upload the documents:</h4>
                    <p className="document-content-titles">Note: Select the Address proof,Driving licence proof,Aadhar proof  simultaniously</p>
                    <p className="document-content-titles">Note: Address proof,Driving licence proof,Aadhar proof should be an image </p>

                    <div className="document-sub-div-1">
                        {images.map((image) => { return <img className="document-images" src={image} key={image} alt="documents" /> })}
                    </div>

                    <div className="document-sub-div-2">
                        <input multiple onChange={handleChange} type="file" placeholder="Upload " />
                        <Button onClick={() => updateDocument()} className="document-submit-btn" variant="warning" >Submit</Button>
                    </div>

                </div>
            </Card>
        </div>

    )
}






  // const savedocuments = () => {
    //     const auth = {
    //         emailid: authemail,
    //         token: authtoken,
    //         additional: unique
    //     }

    //     axios({
    //         url: `${apiurl}/documents`, method: "post", headers: auth, data: {
    //             add: addressimg,
    //             driv: drivingLimg,
    //             aadh: aadharimg

    //         }
    //     })
    // }