import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

function VerifyCode() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(50);
  const [error, setError] = useState("");

  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const fullCode = digits.join("");

    if (fullCode.length !== 6) {
      setError("Le code doit comporter 6 chiffres.");
      return;
    }

    localStorage.setItem("resetCode", fullCode);
    navigate("/reset-password");
  };

  return (
    <>
      <Header />

      <main className="auth-page-wrapper center-wrapper">
        <div className="reset-presentation-container">
          
          <h1 className="auth-main-title text-center">Mot de pass oublier</h1>
          <p className="auth-main-subtitle text-center">
            You received a code check you email ({email || "votre email"})
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="otp-form-layout">
            
            {/* 6 OTP Circle Input Boxes */}
            <div className="otp-inputs-row">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="otp-circle-box"
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                />
              ))}
            </div>

            {/* Timer & Resend */}
            <div className="timer-resend-row">
              <span>00:{timer < 10 ? `0${timer}` : timer}</span>
              <button 
                type="button" 
                className="btn-resend-link"
                onClick={() => setTimer(50)}
              >
                Resend?
              </button>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button type="submit" className="btn-teal-pill btn-medium-pill">
                Next
              </button>
            </div>

          </form>

        </div>
      </main>
    </>
  );
}

export default VerifyCode;