import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from "./components/App";
import RedirectComponent from "./components/Redirect";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/glamurlshortenerapplication" />
      </Route>
      <Route path="/glamurlshortenerapplication" component={App} />
      <Route path="/:shortUrl" component={RedirectComponent} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
