"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "../../../components/form/CustomInput";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CustomForm from "../../../components/form/CustomForm";
import { useLoginMutation } from "../../../redux/api/authApi";
import { setToLocalStorage } from "../../../utils/local-storage";
import { jwtDecode } from "jwt-decode";
import { setAuthCookie } from "../../../actions/auth";

// Login validation schema
const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" }),
});

const LoginForm = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");

    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });

      if (response?.data?.access_token) {
        const decodedToken = jwtDecode(response.data.access_token);
        const { company_id, role } = decodedToken;

        await setAuthCookie(response.data.access_token);
        setToLocalStorage(
          process.env.NEXT_PUBLIC_AUTH_KEY,
          response.data.access_token
        );

        toast.success("Login successful!", {
          id: toastId,
        });

        if (company_id === null && role === null) {
          router.push("/dashboard/settings");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.message || "Login failed", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <CustomForm
        className="w-full max-w-md px-6 space-y-5"
        onSubmit={handleSubmit}
        resolver={zodResolver(loginSchema)}
        defaultValues={{
          username: "",
          password: "",
        }}
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          Let&apos;s Buzz In!
        </h2>

        <CustomInput
          name="username"
          placeholder="Email Address"
          type="email"
          required
          disabled={isLoading}
        />

        <CustomInput
          name="password"
          type="password"
          placeholder="Password"
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          content="Login"
          isLoading={isLoading}
          disabled={isLoading}
        />

        <p className="text-center text-primary-text-color">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary hover:text-purple-700 font-semibold"
          >
            Register here
          </Link>
        </p>
      </CustomForm>
    </>
  );
};

export default LoginForm;
