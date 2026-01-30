"use client";
import { Social } from "@/payload-types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { HiMail, HiUser } from "react-icons/hi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import SectionTitle from "../components/SectionTitle";
import Socials from "../components/Socials";

interface ContactUsProps {
    className?: string;
    apiEndpoint?: string;
    socials?: Social[];
}

const nameRegex = /^[A-Za-z\s.'-]+$/;

const schema = yup
    .object({
        name: yup
            .string()
            .trim()
            .matches(nameRegex, "Name can only contain letters, spaces, apostrophes, periods or hyphens")
            .min(2, "Name is too short")
            .required("Name is required"),
        email: yup.string().required("Email is required").email("Must be a valid email"),
        message: yup.string().required("Message is required")
    })
    .required();

export type FormData = yup.InferType<typeof schema>;

export function ContactUs({ className, apiEndpoint, socials }: ContactUsProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const error = Object.values(errors).reverse().pop();
        if (error && error.message) {
            toast.error(error.message);
        }
    }, [errors]);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (data: FormData) => {
        try {

            if (!executeRecaptcha) {
                throw new Error("reCAPTCHA not yet available");
            }

            const token = await executeRecaptcha("contact_us_form");

            if (!token) {
                throw new Error("reCAPTCHA token not generated");
            }

            const response = await fetch(apiEndpoint || "/api/contact-us", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, reCapchaToken: token }),
            });

            if (!response.ok) throw new Error("Network response was not ok");

            await response.json();
            toast.success("Success: Contact request received successfully.");
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Error: Failed to submit the contact request.");
        }
    };

    return (
        <div className={`w-full flex flex-col gap-4 ${className}`}>
            <ToastContainer />
            <SectionTitle title={'Reach Out'} />
            <Socials socials={socials} />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="max-w-md w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="name" className="text-lg">Your name</Label>
                        </div>
                        <TextInput
                            {...register("name")}
                            rightIcon={HiUser}
                            id="name"
                            type="text"
                            placeholder="Name"
                            color={errors.name ? 'failure' : undefined}
                        />
                    </div>

                    <div className="max-w-md w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="email" className="text-lg">Your email</Label>
                        </div>
                        <TextInput
                            {...register("email")}
                            rightIcon={HiMail}
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            color={errors.email ? 'failure' : undefined}
                        />
                    </div>

                    <div className="max-w-md w-full mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="message" className="text-lg">Your message</Label>
                        </div>
                        <Textarea {...register("message")} id="message" placeholder="Leave a comment..." rows={6} color={errors.message ? 'failure' : undefined} />
                    </div>

                    <div className="max-w-md w-full">
                        <Button type="submit" className="flex items-center gap-2 px-8 py-6 text-lg w-full cursor-pointer">
                            Submit <IoArrowForwardCircleOutline className="text-lg" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}