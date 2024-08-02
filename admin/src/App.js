import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Component/Layout";
import Dashboard from "./Component/Dashboard";
import Header from "./Component/Header";
import Category from "./Component/category";
import OrderList from "./Component/OrderList";
import Login from "./Component/Login";
import Banners from "./Component/Banner";
import Signup from "./Component/Signup";
import OrderDetails from "./Component/OrderDetails";
import Workshop from "./Component/Workshop";
import WorkShopList from "./Component/WorkShopList";
import Blog from "./Component/Blog";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Layout>
              <Header />
              <Dashboard />
            </Layout>
          }
        />
        <Route
          exact
          path="/category"
          element={
            <Layout>
              <Header />
              <Category />
            </Layout>
          }
        />
        <Route
          exact
          path="/workshop"
          element={
            <Layout>
              <Header />
              <WorkShopList />
            </Layout>
          }
        />

        <Route
          exact
          path="/workshopadd"
          element={
            <Layout>
              <Header />
              <Workshop />
            </Layout>
          }
        />
        <Route
          exact
          path="/OrderList"
          element={
            <Layout>
              <Header />
              <OrderList />
            </Layout>
          }
        />

        <Route
          exact
          path="/banners"
          element={
            <Layout>
              <Header />
              <Banners />
            </Layout>
          }
        />

        <Route
          exact
          path="/orderdetails"
          element={
            <Layout>
              <Header />
              <OrderDetails />
            </Layout>
          }
        />
        <Route
          exact
          path="/blog"
          element={
            <Layout>
              <Header />
              <Blog />
            </Layout>
          }
        />

        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/demo" element={<DateTimePickerValue />} /> */}
        <Route exact path="/register" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
