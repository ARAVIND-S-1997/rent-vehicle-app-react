import { Switch, Route } from "react-router-dom"
import { HomePage } from "./components/homePage"

 export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    )
}

