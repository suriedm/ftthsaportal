"use client";
import Image from "next/image";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FibrePlan } from "../../src/components/FibrePlan";
import { fibrePlans } from "../../src/utils/constants";

const FibrePlans: NextPage = () => {
  useEffect(() => {
    const fetData = async () => {
      const request = await fetch(`/api/portal`);
      const res = await request.json();
      console.log("📢 [index.tsx:12]", res);
    };

    fetData();
  }, []);
  const { push } = useRouter();
  const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const [isClient, setIsClient] = useState(true);

    useEffect(() => {
      setIsClient(true);
    }, []);
  };
  function logout() {
    // localStorage.removeItem("accessToken");
    window.location.href = "/";
  }
  return (
    <main>
      <div className="full-width-block ">
        <p>
          <b>Super Fast Affordable Fibre to Your Home Is Here!.</b>
        </p>
      </div>
      <section style={{ backgroundColor: "#cccccc14", padding: "25px" }}>
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

      <section className="showcase">
        <Image
          width={925}
          height={151}
          alt=""
          src="/images/FTTH_SA-Banner-Image-Free-installation-1.png"
        />
      </section>
    </main>
  );
};
export default FibrePlans;
