import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Redirect from "./components/Redirect";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:shortUrl" component={Redirect} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
