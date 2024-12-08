import { StrictMode } from "react";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Layout from "./components/home components/Layout.jsx";
import About from "./components/home components/About.jsx";
import ZigZag from "./components/home components/ZigZag.jsx";
import HeroPage from "./components/home components/HeroPage.jsx";
import { RouterProvider } from "react-router-dom";
import Public_Layout from "./components/home components/Public_Layout.jsx";
import BetterTomorrow from "./components/home components/BetterTommorow.jsx";
import Footer from "./components/home components/Footer.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhedLayout from "./components/PHED Components/PhedLayout.jsx";
import Dashboard_PHED from "./components/PHED Components/Dashboard_PHED.jsx";
import ManageGpsPage from "./components/PHED Components/ManageGpsPage.jsx";
import UpdateGps from "./components/PHED Components/UpdateGps.jsx";
import AssestInventory from "./components/PHED Components/AssestInventory.jsx";
import GpAnnouncement from "./components/PHED Components/GpAnnouncement.jsx";
import ProfilePage_PHED from "./components/ProfilePage_PHED.jsx";
import AlertPage from "./components/PHED Components/AleartPage.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import GPLayout from "./components/GPS Components/GPLayout.jsx";
import Dashboard_Gps from "./components/GPS Components/Dashboard_Gps.jsx";
import ManageConsumer from "./components/GPS Components/MangeConsumerPage.jsx";
import PushNotificationPage from "./components/GPS Components/PushNotificationPage.jsx";
import ReceiptsPage from "./components/GPS Components/ReceiptsPage.jsx";
import GPAlertPage from "./components/GPS Components/GPAlertPage.jsx";
import RqstFundPage from "./components/GPS Components/RqstFundPage.jsx";
import Assest_GP from "./components/GPS Components/Assest_GP.jsx";
import Complaint_PHED from "./components/GPS Components/Complaint_PHED";
import "./App.css";
import RequestFundPage from "./components/PHED Components/RequestedFundPage";
import AssestOverview from "./components/PHED Components/AsseetInvenotryOverview";
import { PersistGate } from "redux-persist/integration/react";
import UserLayout from "./components/Users Component/UserLayout";
import UserDeshboard from "./components/Users Component/UserDeshboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<App />} /> */}
      {/* Profile Route */}
      <Route path="/profile" element={<ProfilePage_PHED />} />
      {/* Public Layout Route */}
      <Route path="/" element={<Public_Layout />} />
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="vision" element={<ZigZag />} />
        <Route path="contact" element={<BetterTomorrow />} />
      </Route>
      {/* PHED Layout Route */}
      <Route path="/phed" element={<PhedLayout />}>
        <Route index element={<Dashboard_PHED />} />
        <Route path="/phed/managegp" element={<ManageGpsPage />} />
        <Route path="/phed/managegp/:id" element={<UpdateGps />} />
        <Route path="/phed/assestinventory" element={<AssestInventory />} />
        <Route
          path="/phed/assestinventoryoverview"
          element={<AssestOverview />}
        />
        <Route path="/phed/alerts" element={<AlertPage />} />
        <Route path="/phed/gpannouncement" element={<GpAnnouncement />} />
        <Route path="/phed/requestedfund" element={<RequestFundPage />} />
      </Route>

      {/* GP Layout Route */}
      <Route path="/gp" element={<GPLayout />}>
        <Route index element={<Dashboard_Gps />} />
        <Route path="/gp/manageconsumer" element={<ManageConsumer />} />
        <Route path="/gp/assest" element={<Assest_GP />} />
        <Route path="/gp/notification" element={<PushNotificationPage />} />
        <Route path="/gp/receipt" element={<ReceiptsPage />} />
        <Route path="/gp/aleart" element={<GPAlertPage />} />
        <Route path="/gp/requestfund" element={<RqstFundPage />} />
        <Route path="/gp/complaint" element={<Complaint_PHED />} />
      </Route>








      {/* //user */}
      <Route path="/user" element={<UserLayout/>} >
      
      <Route index element={<UserDeshboard />} />
      </Route>


      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster
        className="toaster"
        successClassName="toaster-success"
        errorClassName="toaster-error"
      />
    </Provider>
  </StrictMode>
);
