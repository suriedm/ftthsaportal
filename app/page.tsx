"use client";
import Image from "next/image";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { authStore } from "../src/stores/profile";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { subscriptionStore } from "../src/stores/Subscription";
import { fibrePlans, rowItems } from "../src/utils/constants";
import RowItem  from "../src/components/RowItem";
import { FibrePlan } from "../src/components/FibrePlan";

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

    if (device_reference) {
      setDeviceReference(device_reference);
    }
  }, [searchParams, setDeviceReference]);

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
    push("/");
  }
  return (
    <main>
      <div className="full-width-block ">
        <p>
          <b>Super Fast Affordable Fibre to Your Home Is Here!.</b>
        </p>
      </div>
        <Image
          src="/images/FTTH_SA-Banner-Image-1.png"
          alt="Banner Image"
          layout="responsive"
          //  objectFit="cover"
          className=""
        />
      
      {/* <div className="custom-search"> */}
      {/* <button className="custom-search-botton" type="submit" style={{backgroundColor:'#E2520F',color:'white',borderRadius: '100px',width:'150px',height:'42px',marginLeft:'353%', position: 'absolute',top:'2px',fontSize:'15px'}} onClick={handleSearch}><b>Check my coverage</b></button>   */}
      {/* <input type="text" className="custom-search-input" placeholder="Enter your address" value={address}  */}
      {/* onChange={handleChange}/> */}
      {/* </div> */}
      <section>
        {/* <div className="container2"> 
          const roItems = [
            {
             link: "/ten-megabytes",
             image: "Recharge-Blue-Icon",
             title: "Recharge"
           },
            {
             link: "/fibreplane",
             image: "Fibre_Plans-Blue Icon",
             title: "Fibre Plans"
           },
            {
             link: "/hundred-megabytes",
             image: "Check-coverage-Sign up -Blue Icon",
             title: "Check Coverage"
           },

          ]
        */}
        <div className="row">
          {rowItems.map((item) => (
            <RowItem key={item.title} {...item} />
          ))}
        </div>
        {/* </div> */}
      </section>

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
          {/* 
            const fibrePlans = [
             
              {
                  size: "100 Mbp",
                  amount: "R1199",
                  link: "/twenty-megabytes",
                  list: [
                    "Free Installation.",
                    "Free Router.",
                    "Free Connection.",
                    "Activation Fee: R999",
                    "Monthly Payment: R1199",
                    "Total Payment: R2198"
                  ]
              },
            ]
          */}
          <div className="content1">
            {Object.values(fibrePlans).map((plan) => (
              <FibrePlan key={plan.size} {...plan} />
            ))}
          </div>
        </div>
      </section>
      <br />
      <br />
      {/* <script src="https://cdn.tailwindcss.com" async /> */}
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
      <section   style={{ backgroundColor: "#cccccc4", padding: "25px", display: "flex", flexDirection: "row" }}>
          <div style={{display: "flex", flexDirection:"column", flexGrow: 2/3, padding: "4px"}}>
            <h3 className="font-bold text-2xl leading-8 text-blue-950 ">
              Coverage
            </h3>
            <p className="custom-text-copy" style={{ fontSize: "19px" }}>
              We currently have a large fibre footprint but only offer cost
              effective services in specific areas. If we are not able to offer
              you services in your area or location we will refer you to a host
              of our partner ISPâ€™s companyâ€™s
            </p>
            <button
              className="button4"
              onClick={() => push("/hundred-megabytes")}
              type="submit"
            >
              {/* <h4 style={{ paddingLeft: "48px", paddingTop: "9px" }}> */}
              <b>LEARN MORE</b>
              {/* </h4> */}
            </button>
            {/* </div> */}
          </div>
            <Image
              className="custom-media-image "
              alt=""
              src="/images/ITWWW-Fibre-Coverage-Map.jpg"
            />
          
      </section>

      <section>
        <Image
          alt=""
          className="showcase"
          src="/images/FTTH_SA-Banner-Image-Free-installation-1.png"
        />
      </section>
    </main>
  );
};
export default App;
