"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { verifyToken } from "@/actions/verifyToken";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { removeToken, updateStatus } from "@/actions/updateVerifyStatus";
import { useRouter } from "next/navigation";

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isOtpValid, setIsOtpValid] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [error,setError] = useState<string | undefined>("");
  const [success,setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  let localEmail = "";
  useEffect(() => {
    localEmail = localStorage.getItem("email") || "";
    setEmail(localEmail ?? "");
  },[])
  const [email,setEmail] = useState(localEmail ?? "");
  // Handle input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric values and limit to 6 digits
    if (/^[0-9]{0,6}$/.test(value)) {
      setOtp(value);
    }
  };
  // Handle OTP submission
  const handleSubmit = async() => {
    if (otp.length !== 6) {
      setIsOtpValid(false);
      return;
    }
    setIsOtpValid(true);
    // Submit OTP logic here
    startTransition(() => {
      verifyToken(otp,email).then((res) => {
        if(res.error){
          setError(res.error);
        }
        if(res.success){
          setSuccess(res.success);
          updateStatus(email);
          removeToken(email).then((res) => {
            if(res.success && !res.error){
              router.push("/books")  
            }
          })
        }
      })
    })
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>
      <div className="flex justify-center mb-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md mx-1 focus:outline-none focus:border-blue-500"
            ref={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            value={otp[index] || ""}
            onChange={(e) => {
              const newOtp = otp.split("");
              newOtp[index] = e.target.value;
              setOtp(newOtp.join(""));
            }}
          />
        ))}
      </div>
      {!isOtpValid && <p className="text-red-500 text-sm text-center">OTP must be 6 digits.</p>}
      <FormError message={error}/>
      <FormSuccess message={success}/>
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        disabled={isPending}
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OtpInput;



