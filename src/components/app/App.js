import React, { Fragment, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  // Route,
  Switch,
  Redirect
} from "react-router-dom";
import RouterWithLayout from "../../helper/routerWithLayout/routerWithLayout";
import PrivateRouter from "../../helper/privateRouter/privateRouter";
import Main from "../layouts/main/main";
import Minimal from "../layouts/minimal/minimal";
import Wishlist from "../dashboard/wishlist/wishlist";
import Cart from "../dashboard/cart/cart";
import ProductDetail from "../dashboard/productDeatilPage/productDetail";
import Myprofile from "../dashboard/myprofile/myprofile";
// import TodoApp from "../todo/TodoApp";
// import TodoList from "../todoList/TodoList";
// import Signup from "../signup/signup";
import "./App.css";

const Signup = lazy(() => import("../signup/signup"));
const Signin = lazy(() => import("../sign-in/signin"));
const Home = lazy(() => import("../dashboard/home/home"));

function App() {
  return (
    <Fragment>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/sign-in" />
            <RouterWithLayout
              layout={Minimal}
              exact
              component={Signin}
              path="/sign-in"
            />
            <RouterWithLayout
              layout={Minimal}
              exact
              component={Signup}
              path="/signup"
            />
            <PrivateRouter layout={Main} exact component={Home} path="/home" />
            <PrivateRouter
              layout={Main}
              exact
              component={Wishlist}
              path="/wishlist"
            />
            <PrivateRouter layout={Main} exact component={Cart} path="/cart" />
            <PrivateRouter
              layout={Main}
              exact
              component={ProductDetail}
              path="/product_detail/:id"
            />
            <PrivateRouter
              layout={Main}
              exact
              component={Myprofile}
              path="/my-profile"
            />
            {/* <Route exact path="/sign-in" component={Signin} />
            <Route exact path="/signup" component={Signup} /> */}
          </Switch>
        </Suspense>
      </Router>
    </Fragment>
  );
}

export default App;
