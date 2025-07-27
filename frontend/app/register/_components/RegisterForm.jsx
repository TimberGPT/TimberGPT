"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../../redux/api/authApi";
import { useRouter } from "next/navigation";

// Registration validation schema
const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
        message: "Please enter a valid phone number",
      }),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username must be at most 30 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must be at most 50 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");

    try {
      const registrationData = {
        name: data.username,
        email: data.email,
        password: data.password,
        phone_no: data.phone,
        dob: data.dob,
      };

      const response = await register(registrationData).unwrap();

      toast.success("Registration successful!", {
        id: toastId,
      });

      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      const errorMessage =
        error?.data?.message || "Registration failed. Please try again.";

      toast.error(errorMessage, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <CustomForm
        className="w-full max-w-md px-6 space-y-5"
        onSubmit={handleSubmit}
        resolver={zodResolver(registerSchema)}
        defaultValues={{
          email: "",
          phone: "",
          dob: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          Sign Up!
        </h2>

        <CustomInput
          name="email"
          placeholder="Email"
          type="email"
          required
          disabled={isLoading}
        />

        <CustomInput
          name="phone"
          placeholder="Phone Number"
          type="tel"
          required
          disabled={isLoading}
        />

        <CustomInput
          name="dob"
          placeholder="Date of Birth"
          type="date"
          required
          disabled={isLoading}
          className="text-gray-500"
        />

        <CustomInput
          name="username"
          placeholder="Username"
          type="text"
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

        <CustomInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          disabled={isLoading}
        />

        <Button
          type="submit"
          content="Register"
          isLoading={isLoading}
          disabled={isLoading}
        />

        <p className="text-center text-primary-text-color">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-purple-700 font-semibold"
          >
            Login here
          </Link>
        </p>
      </CustomForm>
    </>
  );
};

export default RegisterForm;
