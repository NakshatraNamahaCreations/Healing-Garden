import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Component/Layout/Header";
import Home from "./Component/Layout/Home";
import Footer from "./Component/Layout/Footer";
import Layout from "./Component/Layout/Layout";

import CategoryWiev from "./Component/Layout/CategoryWiev";
import Categorylist from "./Component/Layout/Categorylist";
import Workshopdetails from "./Component/Workshopdetails";
import About from "./Component/About";
import ForIndividual from "./Component/ForIndividual";

import View from "./Component/View";
import Cart from "./Component/Cart";
import ClientServed from "./Component/ClientServed";
import Testimonials from "./Component/Testimonials";
import Approach from "./Component/FooterPages/Aproach";
import Blog from "./Component/FooterPages/Blog";
import Careers from "./Component/FooterPages/Careers";
import ContactUs from "./Component/FooterPages/ContactUs";
import FAQ from "./Component/FooterPages/FAQ";
import Gallary from "./Component/FooterPages/Gallary";
import PrivateParties from "./Component/FooterPages/PrivateParties";
import Volunteer from "./Component/FooterPages/Volunteer";
import Login from "./Component/FooterPages/Login";

import Signup from "./Component/FooterPages/SignUp";
import RazoPay from "./Component/Razopya";
import RequestProposal from "./Component/Request";
// import Category from "./Component/Layout/Category";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Header />
              <Home />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="/workshop"
          element={
            <Layout>
              <Header />
              <CategoryWiev />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="categorylist"
          element={
            <Layout>
              <Header />
              <Categorylist />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="Workshopdetails"
          element={
            <Layout>
              <Header />
              <Workshopdetails />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="about"
          element={
            <Layout>
              <Header />
              <About />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="individual"
          element={
            <Layout>
              <Header />
              <ForIndividual />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="view"
          element={
            <Layout>
              <Header />
              <View />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="client-served"
          element={
            <Layout>
              <Header />
              <ClientServed />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="testimonials"
          element={
            <Layout>
              <Header />
              <Testimonials />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="cart"
          element={
            <Layout>
              <Header />
              <Cart />
              <Footer />
            </Layout>
          }
        />

        <Route
          path="approach"
          element={
            <Layout>
              <Header />
              <Approach />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="blog"
          element={
            <Layout>
              <Header />
              <Blog />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="careers"
          element={
            <Layout>
              <Header />
              <Careers />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="contact-us"
          element={
            <Layout>
              <Header />
              <ContactUs />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="faq"
          element={
            <Layout>
              <Header />
              <FAQ />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="gallery"
          element={
            <Layout>
              <Header />
              <Gallary />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="private-parties"
          element={
            <Layout>
              <Header />
              <PrivateParties />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="volunteer"
          element={
            <Layout>
              <Header />
              <Volunteer />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="volunteer"
          element={
            <Layout>
              <Header />
              <Volunteer />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="login"
          element={
            <Layout>
              <Header />
              <Login />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="register"
          element={
            <Layout>
              <Header />
              <Signup />
              <Footer />
            </Layout>
          }
        />
        <Route
          path="rezopay"
          element={
            <Layout>
              <Header />
              <RazoPay />
              <Footer />
            </Layout>
          }
        />
          <Route
          path="request"
          element={
            <Layout>
              <Header />
              <RequestProposal />
              <Footer />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
