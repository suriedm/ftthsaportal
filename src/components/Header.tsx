"use client";
import { faBars, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { authStore } from "../stores/profile";
import { useRouter } from "next/navigation";
import { transactionStore } from "../stores/Transaction";
import { subscriptionStore } from "../stores/Subscription";
import useMouseLeave from "use-mouse-leave";
import LoginModal from "./LoginModal";

export const Header = () => {
  const router = useRouter();
  const [mouseLeft, ref] = useMouseLeave();
  const { setTransaction } = transactionStore();
  const { setSubscription, setProductId } = subscriptionStore();
  const { userId, profile, setUserId, setProfile } = authStore();
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (mouseLeft) {
      // The mouse has just left our element, time to
      // run whatever it was we wanted to run on mouseleave:
      // ...
      setMenuOpen(false);
    }
  }, [mouseLeft]);

  useEffect(() => {
    console.log("📢 [Header.tsx:37] menuOpen ", menuOpen);
  }, [menuOpen]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    setProfile(null);
    setUserId(null);
    setProductId(null);
    setTransaction([]);
    setSubscription([]);
    router.replace("/");
  };

  return (
    <header className="header">
      {showModal && <LoginModal isOpen={showModal} onClose={()=>setShowModal(false)} />}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          width: "auto",
        }}
      >
        <Link className="logo" href="/">
          <Image
            src="/images/LOGO.jpg"
            alt="Logo"
            className="logo"
            width={120}
            height={110}
          />{" "}
        </Link>
        <div style={{ display: "flex", width: "75px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "8px",
            }}
          >
            {profile ? (
              <h6 style={{ marginRight: "4px" }}>{profile.first_name}</h6>
            ) : null}

            <FontAwesomeIcon
              icon={userId ? faUser : faLock}
              onClick={() => (userId ? null : toggleModal())}
              style={{ fontSize: "25px", color: userId ? "#222155" : "red" }}
            />
          </div>
          <label
            onClick={toggleModal}
            className="menu-btn"
            htmlFor="btn"
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: "25px" }} />
          </label>
          <div className="wrapper">
            <nav style={{ display: menuOpen ? "block" : "none" }} id="sidebar">
              <ul ref={ref} id="menuList" className="list-items">
                <li>
                  {" "}
                  <Link href="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/service">
                    <i className="fas fa-sliders-h"></i> About us
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/fibreplane">
                    <i className="fas fa-address-book"></i> Fibre Plans
                  </Link>
                </li>
                <li>
                  <Link href="/managesubscription" className="dropdown-item">
                    Manage Subscription
                  </Link>
                </li>
                <li>
                  <Link href="blog.html" className="dropdown-item">
                    Cancel Fibre Account
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link me-4 dropdown-toggle link-dark"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-expanded="false"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link href="/profile"> My Profile</Link>
                </li>

                <li>
                  <Link href="#">
                    <i className="fas fa-globe-asia"></i>Re-charge
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Cancel & Upgrade
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Speed Test
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <i className="fas fa-envelope"></i>Track Order
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={handleLogout}>
                    <i className="fas fa-envelope"></i>Sign Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
};
