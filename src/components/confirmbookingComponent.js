import { Card } from "react-bootstrap";


export function Confirm() {
    return (
        <div className="finalpage-main-div">
            <Card className="finalpage-card">
                <img className="finalpage-img" src="https://icons.veryicon.com/png/o/miscellaneous/cloud-call-center/success-24.png" alt="confirmlogo" />
                <p className="finalpage-text">Thank you for choosing our service. Documents got received.
                    You will receive a call from our team shortly for further procedures.
                </p>
            </Card>
        </div>
    )
}