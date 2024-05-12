"use client";
import "../src/style/globals.css";
import { Header } from "../src/components/Header";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="footer ">
          <div className="row">
            <div className="columns">
              <h3>PRIVACY POLICY</h3>
              <p style={{ color: "#131D72" }}>Policy</p>
            </div>
            <div className="columns">
              <h3>TERMS OF USE</h3>
              <p style={{ color: "#131D72" }}>Ts & Cs</p>
            </div>
            <div className="columns">
              <h3>FOLLOW</h3>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Link href="https://www.facebook.com/profile.php?id=100077963720140&mibextid=LQQJ4d">
                  {/* < FontAwesomeIcon icon={faFacebook} style={{ paddingTop: '9px', color:'white',paddingRight:'209%' }}/> */}
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    style={{ color: "#131D72", marginRight: "16px" }}
                  />
                </Link>
                <Link href="#">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    size="2x"
                    style={{
                      color: "#131D72",
                      marginRight: "16px",
                    }}
                  />
                </Link>
                <Link href="https://instagram.com/ftthsa?igshid=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    style={{ color: "#131D72", marginRight: "16px" }}
                  />
                </Link>
              </div>
            </div>
            <div className="columns">
              <h3>CONTACT US</h3>

              <h5 style={{ color: "#131D72" }}>Sales</h5>
              <p style={{ color: "#131D72" }}>sales@ftthsa.co.za</p>

              <h5 style={{ color: "#131D72" }}>Support</h5>
              <p style={{ color: "#131D72" }}>support@gplat.co.za</p>
              <h5 style={{ color: "#131D72" }}>Call Center</h5>
              <p style={{ color: "#131D72" }}>0861 777 889</p>
            </div>
          </div>

          <div className="copy-right-sec">
            <i className="fa-solid fa-copyright"></i>
            FTTHSA, a product of Global Platinum Solutions.{" "}
            <a href="#">Designed by DM333</a>
            <Image
              style={{ paddingLeft: "36%", width: "58%" }}
              src="/images/PayGate-Card-Brand-Logos-PayGate.png"
              width={150}
              height={150}
              alt={"payGate logo"}
            />
          </div>
        </footer>
      </body>
    </html>
  );
}
