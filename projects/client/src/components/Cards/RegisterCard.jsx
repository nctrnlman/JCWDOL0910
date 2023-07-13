import React from "react";
import RegisterForm from "../Form/RegisterForm";
import TabsLoginRegister from "../TabsLoginRegister";
import ResendVerificationModal from "../modals/ResendVerificationModal";
import VerificationButton from "../Buttons/VerificationButton";

function RegisterCard({ isLoading }) {
  return (
    <div className="hero min-h-screen bg-base-100 pt-16 pb-5 xl:pt-0 xl:pb-0">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p className="py-6">
            Join us now and start shopping for amazing products. Register today
            and unlock a world of endless possibilities.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <TabsLoginRegister />
            <RegisterForm isLoading={isLoading} />
          </div>
          <div className="flex flex-col justify-center items-center pb-4 text-gray-700 font-medium text-xs text-center gap-2">
            <span className="ml-2 text-base-content">
              Forget to verifiy your account?
              <VerificationButton />
            </span>
            <span className="ml-2 text-base-content">
              Already have an account?
              <a
                href="/login"
                className="text-xs ml-2 text-primary-focus font-semibold hover:underline"
              >
                Sign In
              </a>
            </span>
          </div>
        </div>
      </div>
      <ResendVerificationModal />
    </div>
  );
}

export default RegisterCard;
