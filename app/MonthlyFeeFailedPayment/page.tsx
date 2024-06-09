 "use client"
// import React, { useRef, useState, useEffect  } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fibrePlans, rowItems } from "../../src/utils/constants";
import { FibrePlan } from "../../src/components/FibrePlan";
import SuccessModal from "../../src/components/SuccessModal";
import RowItem from "../../src/components/RowItem";
import FailedMonthlyPayment from "../../src/components/FailedMonthlyPayment ";

const OTPModal = () => {
    function push(arg0: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        
        <main>
     <FailedMonthlyPayment/>
       
          <div className="full-width-block ">
            <p>
              <b>Super Fast Affordable Fibre to Your Home Is Here!.</b>
            </p>
          </div>
          <Image
            src="/images/FTTH_SA-Banner-Image.jpeg"
            alt="Banner Image"
            width={2122}
              height={121}
            layout="responsive"
            //  objectFit="cover"
            className=""
          />
          
      
          {/* <SuccessModal/> */}
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
              <div className="content1">
                {Object.values(fibrePlans).map((plan) => (
                  <FibrePlan key={plan.size} {...plan} />
                ))}
              </div>
            </div>
          </section>
          <br />
          <br />
          <br />
          <br />
        
  
          <section
            className="service container mx-auto py-8 px-6 h-auto"
            id="service"
          >
            <div>
              <h2 className="text-blue-950 font-bold text-4xl lowecase relative h-auto w-full pb-1 text-center">
                WHY CHOOSE US
                {/* See why now is the best time to super boost your home <br /> */}
                {/* entertainment or business Internet */}
                <span className="text-red-600"></span>
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
          <section
            style={{
              backgroundColor: "#cccccc4",
              padding: "25px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2 / 3,
                padding: "4px",
              }}
            >
    
    <div>
            </div>
              <h2 className="font-bold text-2xl leading-8 text-blue-950 ">
                Coverage
              </h2>
              <p className="custom-text-copy" style={{ fontSize: "19px" }}>
                We currently have a large fibre footprint but only offer cost
                effective services in specific areas.<br/> If we are not able to offer
                you services in your area or location <br/>we will refer you to a host of
                our partner ISPâ€™s company
              </p>
              <br/>
              <button
                className="button5"
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
              width={525} height={1}
            />
          </section>
          <div >
        
          </div>
          <section>
            <Image
              alt=""
              className="showcase"
              src="/images/FTTH_SA-Banner-Image-Free-installation-1.png"
              width={825} height={151}
            />
          </section>
        </main>
      );
    };

   
export default OTPModal;
