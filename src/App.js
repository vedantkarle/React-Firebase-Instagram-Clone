import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/Signup"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
