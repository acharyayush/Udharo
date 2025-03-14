import { useEffect, useState } from "react"
import Button from "../Shared/Button"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const Authentication = () => {
  const navigate = useNavigate()
  const {isLoggedIn} = useSelector((state)=>state.vendor)
  const [formType, setFormType] = useState("Login")
  useEffect(()=>{
    if(isLoggedIn){
      navigate("/")
    }
  }, [isLoggedIn])
  return (
    <div
      className="authentication grid min-h-screen place-content-center bg-secondary"
    >
      <div className=" relative my-auto flex min-h-[480px] w-[450px] flex-col items-center rounded-xl bg-bgColor p-4 shadow-[0_0_15px_0_rgba(0,0,0,0.1)] sml:w-[320px] xsm:w-[270px]">
        <h1 className="text-textColor my-4 text-3xl font-semibold xsm:text-3xl">
          {formType}
        </h1>
        <div className="btns my-4 grid w-11/12 grid-cols-2 rounded-md border border-gray-300 bg-bgColor text-center">
          <Button
            value={"Login"}
            className={`${formType != "Login" && "bg-bgColor text-black"}`}
            onClick={() => setFormType("Login")}
          />
          <Button
            value={"Signup"}
            className={`${formType != "Signup" && "bg-bgColor text-black"}`}
            onClick={() => setFormType("Signup")}
          />
        </div>
        {formType == "Login" ? (
          <LoginForm className={"mx-auto w-11/12 h-[420px]"} setFormType={setFormType} />
        ) : (
          <SignupForm className={"mx-auto w-11/12 h-[420px]"} setFormType={setFormType} />
        )}
      </div>
    </div>
  )
}

export default Authentication
