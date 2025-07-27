import Image from "next/image";
import LoginForm from "./_components/LoginForm";

const page = () => {
  return (
    <div className="h-screen w-screen flex">
      {/* <!-- Left Half: Form --> */}
      <div className="w-1/2 bg-bg-color flex items-center justify-center">
        <LoginForm />
      </div>

      {/* <!-- Right Half: Illustration --> */}
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
    </div>
  );
};

export default page;
