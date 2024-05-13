"use client";
import Image from "next/image";
import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import router, { useRouter } from "next/router";
// import '../style/';
import login from "./api/auth";
import { hydrateRoot } from "react-dom/client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FormEvent, SetStateAction, useEffect, useState } from "react";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FaUserEdit } from "react-icons/fa";
import BannerImage from "../components/images/FTTH_SA-Banner-Image-1.png";
import map from "../components/images/ITWWW-Fibre-Coverage-Map.jpg";
import paygate from "../components/images/PayGate-Card-Brand-Logos-PayGate.png";
import banner from "../components/images/FTTH_SA-Banner-Image-Free-installation-1.png";
import { pages } from "next/dist/build/templates/app-page";
import { authStore } from "@/stores/profile";
import React from "react";
import { useParams } from "next/navigation";
import { url } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { subscriptionStore } from "@/stores/Subscription";
import { Header } from "@/components/Header";

interface PostObject {
  message: string;
  role: string;
  first_name: string;
  last_name: string;
  identification_reference: string;
  identification_type: string;
  passportNumber: string;
  complex_building: string;
  unit_number: string;
  street_address: string;
  province: string;
  postal_code: string;
  postal_address: string;
  email: string;
  landLine: string;
  mobile_number: string;
  alternate_contact_number: string;
  password: string;
  city: string;
  // ricaOne: File | null;
  //  ricaTwo: File | null;
}

const App: NextPage = () => {
  const { userId, setUserId } = authStore();
  const { setDeviceReference } = subscriptionStore();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formValues, setFormValues] = useState<PostObject>({
    role: "",
    first_name: "",
    last_name: "",
    identification_reference: "",
    identification_type: "",
    passportNumber: "",
    complex_building: "",
    unit_number: "",
    street_address: "",
    province: "",
    postal_code: "",
    postal_address: "",
    email: "",
    landLine: "",
    mobile_number: "",
    alternate_contact_number: "",
    password: "",
    message: "",
    city: "",
    //  ricaOne: null,
    //  ricaTwo: ull,
  });
  // localStorage.setItem('address', JSON.stringify(address));
  const handleLogout = () => {
    console.log("Searching for address:", address);
  };

  useEffect(() => {
    const device_reference = searchParams?.get("device_reference");

    if(device_reference){
      setDeviceReference(device_reference);
    }

  },[searchParams, setDeviceReference]);
  
  /*
  
  useEffect(() => {
    const device_reference = searchParams?.get("device_reference");

    const handleActivation = async (device: string) => {
      console.log({ device, userId, subscriptions });
      const subscriptionId = subscriptions[0].id;
  //     // console.log("in [handleActivation] device && subscriptionId ===> ", (subscriptionId));

      if (subscriptionId && device) {
        console.log("in [handleActivation] ");
        const SubscriptionsResponse = await fetch(
          `${url}/subscriptions/activate/${subscriptionId}`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              device_reference: device,
            }),
          }
        );
        console.log(
          "in [handleActivation] request===> ",
          SubscriptionsResponse
        );
        const res = await SubscriptionsResponse.json();
        console.log(" [handleActivation] ", res);
      }
    };

    console.log("in [] device_reference ===> ", device_reference);

    if (device_reference && subscriptions.length > 0)
      handleActivation(device_reference);
    // else {
    // alert(
    //  "No subscription found device info was found, please contact service provider for assistance"
    //  );
    // }
  }, []);
  */ 

 


 
  // function logout() {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("deviceReference");

  // }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("userid");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserId(foundUser);
    }
  }, []);


 
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  async function logout1() {
    localStorage.removeItem("accessToken");
    alert("successfully logged out");
    router.push("/");
  }
  return (
    <main>
      <Header/>
      <div className="full-width-block ">
        <p>
          <b>Super Fast Affordable Fibre to Your Home Is Here!.</b>
        </p>
      </div>
      <div className="hero-container">
        <Image
          src={BannerImage}
          alt="Banner Image"
          layout="responsive"
          //  objectFit="cover"
          width={2122}
          height={121}
        />
      </div>
      
      {/* <div className="custom-search"> */}
      {/* <button className="custom-search-botton" type="submit" style={{backgroundColor:'#E2520F',color:'white',borderRadius: '100px',width:'150px',height:'42px',marginLeft:'353%', position: 'absolute',top:'2px',fontSize:'15px'}} onClick={handleSearch}><b>Check my coverage</b></button>   */}
      {/* <input type="text" className="custom-search-input" placeholder="Enter your address" value={address}  */}
      {/* onChange={handleChange}/> */}
      {/* </div> */}
      <section>
        <div id="container2">
          <div className="row">
            <figure>
              <br />
              <div className="button2">
                <button onClick={() => push("/ten-megabytes")} type="submit">
                  <h4 style={{ fontSize: "18px" }}>Recharge</h4>
                  <Image
                    width={155}
                    height={121}
                    alt=""
                    src="/asset/Recharge-Blue-Icon.png"
                    style={{ paddingTop: "30px" }}
                  />
                </button>
              </div>
            </figure>

            <figure>
              <br />
              <div className="button2">
                <button onClick={() => push("/fibreplane")} type="submit">
                  <h4 style={{ fontSize: "18px" }}>Fibre Plans</h4>
                  <Image
                    width={123}
                    height={121}
                    alt=""
                    src="/asset/Fibre_Plans-Blue Icon.png"
                    style={{ paddingBottom: "-14px" }}
                  />
                </button>
              </div>
            </figure>

            <figure>
              <br />
              <div className="button2">
                <button
                  onClick={() => push("/hundred-megabytes")}
                  type="submit"
                >
                  <h4 style={{ fontSize: "18px" }}>Check Coverage</h4>
                  <br />
                  <Image
                    width={155}
                    height={1212}
                    alt=""
                    src="/asset/Check-coverage-Sign up -Blue Icon.png"
                    style={{ paddingTop: "16px" }}
                  />
                </button>
              </div>
            </figure>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <section style={{ backgroundColor: "#cccccc14" }}>
        <div>
          <h1
            style={{
              textAlign: "center",
              color: "#E2520F",
              fontSize: "39px",
              paddingTop: "30px",
            }}
          >
            <b>FIBRE PLANS </b>
            <span className="text-red-500"></span>
          </h1>
          <br />
          <div className="content1">
            <div className="basic box">
              <h1 className="title">
                <b>10 Mbp</b>
                <br />
              </h1>
              <div className="view">
                <div className="cost">
                  <p className="amount">R350</p>
                </div>
                <hr />
                <br />
                <br />
              </div>
              <div className="description">
                <ul>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Installation.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation Fee:
                    R399
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Monthly Payment
                    : R350
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Payment :
                    R749
                  </li>
                </ul>
              </div>
              <div className="button4">
                <button onClick={() => push("/ten-megabytes")} type="submit">
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    SIGN UP NOW
                  </h4>
                </button>
              </div>
            </div>
            <div className="standard box">
              <h2 className="title">
                <b>20 Mbp</b>
              </h2>
              <div className="view">
                <div className="cost">
                  <p className="amount">R599</p>
                </div>
                <hr />
                <br />
                <br />
              </div>
              <div className="description">
                <ul>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Installation.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Connection.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation Fee:
                    R399.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Monthly
                    Payment: R599.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Payment :
                    R898
                  </li>
                </ul>
              </div>

              <div className="button4">
                <button onClick={() => push("/twenty-megabytes")} type="submit">
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    SIGN UP NOW
                  </h4>
                </button>
              </div>
            </div>
            <div className="business box">
              <h2 className="title">
                <b>30 Mbps</b>
              </h2>
              <div className="view">
                <div className="cost">
                  <p className="amount">R899</p>
                </div>
                <hr />
                <br />
                <br />
              </div>
              <div className="description">
                <ul>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Installation.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Connection.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation Fee:
                    R399.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Monthly
                    Payment: R899.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Payment:
                    R1098.
                  </li>
                </ul>
              </div>

              <div className="button4">
                <button onClick={() => push("/thirty-megabytes")} type="submit">
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    SIGN UP NOW
                  </h4>
                </button>
              </div>
            </div>
            <div className="business box">
              <h2 className="title">
                <b>50 Mbps</b>
              </h2>
              <div className="view">
                <div className="cost">
                  <p className="amount">R999</p>
                </div>
                <hr />
                <br />
                <br />
              </div>
              <div className="description">
                <ul>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Installation.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Connection.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation Fee:
                    R399.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Monthly
                    Payment: R999
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Payment:
                    R1898.
                  </li>
                </ul>
              </div>
              <div className="button4">
                <button onClick={() => push("/fifty-megabytes")} type="submit">
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    SIGN UP NOW
                  </h4>
                </button>
              </div>
            </div>
            <div className="business box">
              <h2 className="title">
                <b>100 Mbp</b>
              </h2>
              <div className="view">
                <div className="cost">
                  <p className="amount">R1199</p>
                </div>
                <hr />
                <br />
                <br />
              </div>
              <div className="description">
                <ul>
                  <li>
                    {" "}
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Installation.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free Router.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Free
                    Connection.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation Fee:
                    R999.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Monthly Payment
                    : R1199.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Payment :
                    R2198.
                  </li>
                </ul>
              </div>

              <div className="button4">
                <button
                  onClick={() => push("/hundred-megabytes")}
                  type="submit"
                >
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    SIGN UP NOW
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <script src="https://cdn.tailwindcss.com" async />
      <br />
      <br />
      <section
        className="service container mx-auto py-8 px-6 h-auto"
        id="service"
      >
        <div>
          <h2 className="text-blue-950 font-bold text-4xl lowecase relative h-auto w-full pb-1 text-center">
            See why now is the best time to super boost your home <br />
            entertainment or business Internet
            <span className="text-red-500"></span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h6 className="font-bold text-2xl leading-8 text-blue-950 ">
                Fast and Reliable
              </h6>
              <p className="font-normal text-lg my-3">
                Whether you’re transferring a massive work project , streaming
                the latest entertainment, making a call or uploading selfies to
                the cloud, you can do it all without interruption
              </p>
            </div>
          </div>
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
                {" "}
                Best way to work and play
              </h3>
              <p className="font-normal text-lg my-3">
                Talk to your loved ones, or business colleagues, near and far
                for as long as you want to without calls dropping or loosing
                visual. Don’t miss out on those important calls!
              </p>
            </div>
          </div>
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
                Better Internet = better homes
              </h3>
              <p className="font-normal text-lg my-3">
                With a Fibre connection you can lead a fully connected life with
                access to better entertainment, education and security; not to
                mention adding to the resell value of your house!
              </p>
            </div>
          </div>
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
                The future of entertainment
              </h3>
              <p className="font-normal text-lg my-3">
                Nowadays streaming services are giving you more movies, series
                and music than ever before AND there’s also all that online
                gaming fun to be had. With Fibre you can enjoy it all.
              </p>
            </div>
          </div>
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
                Believe in life after ADSL
              </h3>
              <p className="font-normal text-lg my-3">
                It’s true – after decades of faithful service, ADSL is retiring.
                If you rely on Internet in your home it’s time to move. Our
                Fibre is fast, reliable and the most cost effective way to stay
                with the times
              </p>
            </div>
          </div>
          <div className=" bg-white-50 p-10 transition-all my-5 rounded flex flex-col justify-start items-start hover:shadow-xl">
            <div className="icon text-7xl pb-6 text-red-500"></div>
            <div className="desc ">
              <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
                Free Installation
              </h3>
              <p className="font-normal text-lg my-3">
                We offer free fibre installation into your home or apartment.
                Our trained and experienced fibre technicians will install your
                new fibre connection quickly and neatly.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#cccccc14", padding: "25px" }}>
        <div className="custom-container">
          <div className="custom-content1">
            <div className="custom-text--copy">
              <h3 className="custom-text--heading">
                <b></b>
              </h3>
              <h6 className="font-bold text-2xl leading-8 text-blue-950 ">
                Coverage
              </h6>
              <br />
              <p className="custom-text--copy" style={{ fontSize: "19px" }}>
                We currently have a large fibre footprint but only offer cost
                effective services in specific areas. If we are not able to
                offer you services in your area or location we will refer you to
                a host of our partner ISPâ€™s companyâ€™s
              </p>
              <br />
              <div className="button4">
                <button
                  onClick={() => push("/hundred-megabytes")}
                  type="submit"
                >
                  <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}>
                    <b>LEARN MORE</b>
                  </h4>
                </button>
              </div>
            </div>
          </div>
          <div className="custom-media">
            <Image width={525} height={1} alt="" src={map} />
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <section className="showcase">
        <Image width={825} height={151} alt="" src={banner} />
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer className="footer">
        <div className="columns" style={{ paddingLeft: "150px" }}>
          <b>
            <h3>PRIVACY POLICY</h3>
          </b>
          <p style={{ paddingRight: "86px", color: "#131D72" }}>Policy</p>
        </div>
        <div className="columns" style={{ paddingLeft: "150px" }}>
          <b>
            <h3>TERMS OF USE</h3>
          </b>
          <p style={{ paddingRight: "57px", color: "#131D72" }}>Ts & Cs</p>
        </div>
        <div className="columns" style={{ paddingLeft: "150px" }}>
          <b>
            <h3>FOLLOW</h3>
          </b>
          <Link href="https://www.facebook.com/profile.php?id=100077963720140&mibextid=LQQJ4d">
            {/* < FontAwesomeIcon icon={faFacebook} style={{ paddingTop: '9px', color:'white',paddingRight:'209%' }}/> */}
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              style={{ paddingTop: "12px", color: "#131D72" }}
            />
          </Link>
          <Link href="#">
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              style={{
                paddingTop: "12px",
                color: "#131D72",
                display: " flex",
                gap: "10px",
              }}
            />
          </Link>
          <Link href="https://instagram.com/ftthsa?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr">
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              style={{ paddingTop: "12px", color: "#131D72" }}
            />
          </Link>
        </div>
        <div className="columns" style={{ paddingLeft: "150px" }}>
          <b>
            <h3>CONTACT US</h3>
          </b>
          <b>
            <h6 style={{ paddingRight: "62px", color: "#131D72" }}>Sales</h6>
          </b>
          <p style={{ color: "#131D72" }}>sales@ftthsa.co.za</p>
          <br />
          <b>
            <h6 style={{ paddingRight: "47px", color: "#131D72" }}>Support</h6>
          </b>
          <p style={{ color: "#131D72" }}>support@gplat.co.za</p>
          <br />
          <b>
            <h6 style={{ paddingRight: "25px", color: "#131D72" }}>
              Call Center
            </h6>
          </b>
          <p style={{ paddingRight: "11px", color: "#131D72" }}>0861 777 889</p>
        </div>
        <br />
        {/* <div className="copyRightArea"> */}
        <div className="container">
          <div className="row1">
            <br />
            <br />
          </div>
        </div>
      </footer>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <br/><br/><br/><br/><br/><br/><br/> */}
      <div id="copy-right">
        <div className="copy-right-sec">
          <i className="fa-solid fa-copyright"></i>
          FTTHSA, a product of Global Platinum Solutions.{" "}
          <a href="#">Designed by DM333</a>
          <Image
            style={{ paddingLeft: "36%", width: "58%" }}
            src={paygate}
            width={150}
            height={150}
            alt={""}
          />
        </div>
      </div>
    </main>
  );
};
export default App;

function fetchUserData() {
  throw new Error("Function not implemented.");
}