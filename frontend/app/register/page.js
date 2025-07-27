import Image from "next/image";
import RegisterForm from "./_components/RegisterForm";

const page = () => {
  return (
    <>
      <div className="h-screen w-screen flex">
        {/* <!-- Left Half: Illustration --> */}
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src="https://i.ibb.co/RG9qhddc/register-illustration.jpg"
            alt="Login Illustration"
            className="w-full px-6"
            width={1000}
            height={1000}
            priority
          />
        </div>

        {/* <!-- Right Half: Sign Up Form --> */}
        <div className="w-1/2 bg-bg-color flex items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default page;
