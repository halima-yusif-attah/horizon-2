'use client'

import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput';
import { Loader2, Router } from 'lucide-react';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import PlaidLink from './PlaidLink';


function AuthForm({ type }:{ type: string }) {
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      
    }
  })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      try {
        if (type === "sign-up") {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            dateOfBirth: data.dateOfBirth!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password,
          };
          const newUser = await signUp(userData);

          setUser(newUser);
        }

        if (type === "sign-in") {
          const response = await signIn({
            email: data.email,
            password: data.password,
          });
          if (response) router.push("/");
        }
      } catch (error) {
        console.error("Error submitting form" + error);
      } finally {
        setIsLoading(false);
      }
    };



  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex items-center gap-1 px-4">
          <Image
            src="/icons/logo.svg"
            alt="Horizon logo"
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p>Please enter your details</p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <CustomInput
                    name="firstName"
                    placeholder="John"
                    label="First Name"
                    control={form.control}
                  />
                  <CustomInput
                    name="lastName"
                    placeholder="Doe"
                    label="Last Name"
                    control={form.control}
                  />
                  <CustomInput
                    name="address1"
                    placeholder="Enter your specific address"
                    label="Address"
                    control={form.control}
                  />
                  <CustomInput
                    name="city"
                    placeholder="Enter your specific city"
                    label="City"
                    control={form.control}
                  />
                  <CustomInput
                    name="state"
                    placeholder="Ex: NY"
                    label="State"
                    control={form.control}
                  />
                  <CustomInput
                    name="postalCode"
                    placeholder="Ex: 11011"
                    label="Postal Code"
                    control={form.control}
                  />
                  <CustomInput
                    name="dateOfBirth"
                    placeholder="yyyy-mm-dd"
                    label="Date of Birth"
                    control={form.control}
                  />
                  <CustomInput
                    name="ssn"
                    placeholder="Ex: 1234"
                    label="SSN"
                    control={form.control}
                  />
                </>
              )}
              <CustomInput
                name="email"
                placeholder="Enter your email address"
                label="Email"
                control={form.control}
              />
              <CustomInput
                name="password"
                placeholder="Enter your password"
                label="Password"
                control={form.control}
              />

              <div className="flex flex-col">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* <footer className="flex gap-2">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer> */}
          <footer className="flex justify-center gap-1">
            <p className="text-14 fornt-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>

            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign-In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm