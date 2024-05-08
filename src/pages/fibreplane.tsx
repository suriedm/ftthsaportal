import Image from "next/image";
import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Style } from "util";
// '../style/globals.css';
import { useEffect, useState } from "react";
import LOGO from "../components/images/LOGO.jpg";
import paygate from "../components/images/PayGate-Card-Brand-Logos-PayGate.png";
import banner from "../components/images/FTTH_SA-Banner-Image-Free-installation-1.png";
import Link from "next/link";
import { Header } from "@/components/Header";
const Fibreplane = () => {
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
      <Header />
      <div className="full-width-block ">
        <p>
          <b>Super Fast Affordable Fibre to Your Home Is Here!.</b>
        </p>
      </div>
      <section style={{ backgroundColor: "#cccccc14", padding: "25px" }}>
        <div>
          <br />
          <br />
          <br />
          <br />
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
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Month 1:
                    R749
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> From Month 2:
                    R350
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
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Month 1:
                    R898.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> From Month 2:
                    R599
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
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Month 1:
                    R1098.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> From Month 2:
                    R899.
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
                    <b style={{ color: "#222155" }}>&#x2022;</b> Activation
                    Feee: R399.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Month 1:
                    R1898
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> From Month 2:
                    R999.
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
                    <b style={{ color: "#222155" }}>&#x2022;</b> Total Month 1:
                    R2198.
                  </li>
                  <li>
                    <b style={{ color: "#222155" }}>&#x2022;</b> From Month 2:
                    R1199.
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
      <br />
      <br /> <br />
      <br />
      <br />
      <br />
      <section className="showcase">
        <Image width={925} height={151} alt="" src={banner} />
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
    </main>
  );
};
export default Fibreplane;
