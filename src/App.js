import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Canceled from "./pages/Canceled";
import Confirmed from "./pages/Confirmed";
import Pending from "./pages/Pending";


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Appointments/>
        </Route>
        <PrivateRoute path='/pending' component={Pending}/>
        <PrivateRoute path='/confirmed' component={Confirmed}/>
        <PrivateRoute path='/canceled' component={Canceled}/>
      </Switch>
    </Layout>
  );
}

export default App;