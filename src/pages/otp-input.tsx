import React, { useRef, useState, useEffect } from 'react';
import { faBars,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../style/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import LOGO from '../components/images/LOGO.jpg';
  const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [message, setMessage] = useState('');
    const handleOtpChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);
      if (event.target.value.length === 1 && index !== 3) {
        inputRefs.current[index + 1];
      }
    };
    useEffect(() => {
      inputRefs.current[0];
    }, []);
    let confirmation_pin = '';
    let otpTimer: string | number | NodeJS.Timeout | undefined;
    function generateOTP() {
        let otp = Math.floor(1000 + Math.random() * 9000);
        let otpExpiryTime = new Date().getTime() + 15 * 60 * 1000;
        return { otp, otpExpiryTime };
    }
    function verifyOTP(otp: string, otpExpiryTime: number) {
        if (new Date().getTime() <= otpExpiryTime) { 
            return otp === confirmation_pin;
        }
        return false; 
    }
    async function confirmOTP() {
        const url = 'https://stm-dev.intentio.co.za/api/portal/user/confirmation';
        const data = {
            portal_end_customer_id:447,
            confirmation_mobile_number: '0837458939',
            confirmation_pin:'1615',
            new_password: '12345678'
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('OTP Confirmed successfully');
                alert('OTP Confirmed successfully');
                window.location.href = "./otpconfirmation";
                clearTimeout(otpTimer);
            } else {
                console.error('Error confirming OTP:', response.statusText);
            }
        } catch (error) {
            console.error('Error confirming OTP:', error);
        }
    }
    async function resendOTP() {
        const url = "https://stm-dev.intentio.co.za/api/portal/user/forgot-password?email=zee.dankile%40gmail.com&mobile_number=%2B27%2067%20183%205751";
        const data = {
            confirmation_email: '',
              confirmation_mobile_number: ''
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('resendOTP is sent  successfully');
                setMessage('resendOTP is sent  successfully');
                clearTimeout(otpTimer);     
            } else {
                console.error('Error confirming OTP:', response.statusText);
            }
        } catch (error) {
            console.error('Error confirming OTP:', error);
        }
      }
  const Home = () => {
      const [otp, setOTP] = useState(['', '', '', '']); 
      const [message, setMessage] = useState('');
  
      const handleOtpChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
          const newOTP = [...otp];
          newOTP[index] = event.target.value;
          setOTP(newOTP);
      };
    }
      const handleSubmit = (event: { preventDefault: () => void; }) => {
          event.preventDefault();
          confirmOTP();    
      };
  
      return (
          <main>
            <div className="navbar1">
            <Image src={LOGO} alt="Logo" className="logo" width={150} height={150}  />
    <div className="wrapper">
       <input type="checkbox" id="btn" hidden /> 
        <label className="menu-btn" htmlFor="btn">
            <div>
                <FontAwesomeIcon icon={faBars} style={{fontSize:'25px'}} />
            </div>
        </label>
        <nav id="sidebar">
         <ul className="list-items"> 
         <li> <Link href="/index"><i className="fas fa-home"></i>Home</Link></li> 
             <li> <Link href="/service"><i className="fas fa-sliders-h"></i> About us</Link></li> 
             <li> <Link href="/fibreplane"><i className="fas fa-address-book"></i>Fibre Plans</Link></li> 
                     <li className="nav-item dropdown">
                      <Link className="nav-link me-4 dropdown-toggle link-dark" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">My Account</Link>
                       <ul className="dropdown-menu"> 
                         <li><Link href="about.html" className="dropdown-item">Manage Subscription</Link></li> 
                     <li><Link href="blog.html" className="dropdown-item">Cancel Fibre Account</Link></li> 
                       </ul> 
                     </li> 
                    <li> <Link href="/profile"><i className="fas fa-stream"></i> My Profile</Link></li> 
                    
                    <li><Link href="#"><i className="fas fa-globe-asia"></i>Re-charge</Link></li> 
                     <li><Link href="#"><i className="fas fa-envelope"></i>Cancel & Upgrade</Link></li>
                     <li><Link href="#"><i className="fas fa-envelope"></i>Speed Test</Link></li> 
                     <li><Link href="#"><i className="fas fa-envelope"></i>Track Order</Link></li> 
                    <li><Link href="#"><i className="fas fa-envelope"></i>Sign Out</Link></li> 
                    </ul>  
        </nav>
    </div>
</div>
{/* <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1> */}
<section className='otp' aria-label="OTP Verification" style={{ backgroundColor: '#E2520F', width: '80%', maxWidth: '500px', margin: '13% auto', padding: '2%', borderRadius: '5px', }}>
    <h1 style={{ color: 'white', textAlign: 'center', fontSize: '2rem' }}>OTP Verification:</h1>
    <p style={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>Please enter your OTP sent to your mobile number</p>
    <br/>
    <form id="otp-form" onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
        {otp.map((data, index) => (
            <input  
                style={{
                    width: `${100 / otp.length}%`, 
                    margin: '0.5%',  
                    padding: '1%',
                    borderRadius: '3px',
                    boxSizing: 'border-box', 
                    textAlign: 'center',
                    fontSize: '1.5rem' 
                }}
                type="text"
                key={index}
                aria-label={`OTP digit ${index + 1}`}
                className="otp-input"
                onChange={(event) => handleOtpChange(index, event)}
                value={data}
                maxLength={1}
            />
        ))}
        <br /><br />
        <h2 style={{ textAlign: 'center' }}>{message}</h2>   
    </form>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="submit" onClick={confirmOTP} style={{ backgroundColor: '#222155', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 22px', margin: '15px 10px', cursor: 'pointer', fontSize: '1rem' }}> 
            <b>VERIFY OTP</b> 
        </button>
        <button type="submit" onClick={resendOTP} style={{ backgroundColor: '#222155', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 22px', margin: '15px 10px', cursor: 'pointer', fontSize: '1rem' }}> 
            <b>RESEND OTP</b> 
        </button>
    </div>
</section>

          </main>
      );
  }; 
//   export default dynamic (() => Promise.resolve(Otp), {ssr: true})
export default Otp;


  