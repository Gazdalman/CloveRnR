// import React, { useState, useEffect } from 'react';
// import "./LandingPage.css"

// const LandingPage = () => {
//   // const [quoteIndex, setQuoteIndex] = useState(0);

//   useEffect(() => {
//     // const interval = setInterval(() => {
//     //   setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//     // }, 3000);

//     // return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="landing-page">
//       <h1>Welcome to FundMyJunk™</h1>
//       <h3>Where misguided philanthropy meets awful...ly good ideas!</h3>
//       <div className="quotes">
//         <p>Thanks to FundMyJunk, I was able to quit being the head of a pyramid scheme and start my business where my employees are the ones who have to recruit their friends and family to make money!! <br/> - A Legitimate Business Man</p>
//         <p>I got my project fully funded before it ended and they STILL didn't give me my money! <br/> - A Total Loser</p>
//         <p>I, of my own free will and not under the threat of violence, retract my earlier statement... <br/> - Same Loser</p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React, { useState, useEffect } from 'react';
import './LandingPage.css'; // Import your CSS file

const quotes = [
  "Thanks to FundMyJunk, I was able to quit being the head of a pyramid scheme and start my business where my employees are the ones who have to recruit their friends and family to make money!!@ - A Legitimate Business Man",
  "I got my project fully funded before it ended and they STILL didn't give me my money!@ - A Total Loser",
  "I, of my own free will and not under the threat of violence, retract my earlier statement...@ - Same Loser"
];

const LandingPage = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Increased interval to allow time for fading in and out

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to <img id="landing-page-logo" src="https://fmjbucket.s3.us-east-2.amazonaws.com/79dd0d67ffc34097b913489257727a00.gif" />
        <span id="landing-logo-text">FundMyJunk™</span></h1>
      <h3>Where misguided philanthropy meets awful...ly good ideas!</h3>
      <div className="quote-container">
        <p className={'fade-in'}>{quotes[quoteIndex].split("@")[0]}</p>
        <p className={'fade-in'}>{quotes[quoteIndex].split("@")[1]}</p>
      </div>
    </div>
  );
};

export default LandingPage;
