import type z from "zod";
import { signIn, useSession } from "next-auth/react";
import { useEffect, type ReactElement } from "react";
import MainLayout from "~/layouts/MainLayout";
import Input from "~/components/Input";
import { SignInSchema } from "~/schemas/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/Button";
import Discord from "~/components/auth/Discord";
import { useRouter } from "next/router";
import Link from "next/link";
import { useToast } from "~/providers/ToastProvider";

type ValidationSchema = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  });

  const { query, push } = useRouter();
  const { status } = useSession();

  // I had to do this because the page was not redirecting to the home page after the user was authenticated
  useEffect(() => {
    if (status === "authenticated")
      void push((query?.callbackUrl as string) ?? "/home");
  }, [push, query?.callbackUrl, status]);

  const { showToast } = useToast();

  useEffect(() => {
    if (query?.message) {
      showToast({
        type: "success",
        message: query.message as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onSubmit = async (data: ValidationSchema) => {
    const response = await signIn("credentials", { ...data, redirect: false });
    if (response?.error) {
      showToast({
        type: "danger",
        message: response.error,
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 p-4 pb-2"
      >
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white-soft md:text-2xl">
          Sign <span className="text-blue-600 dark:text-discord">In</span>
        </h2>
        <Discord />
        <div className="flex w-full items-center justify-center gap-2 text-sm text-gray-400 dark:text-white-softest">
          <div className="h-px w-full rounded-md bg-gray-400 dark:bg-white-softest" />
          or
          <div className="h-px w-full rounded-md bg-gray-400 dark:bg-white-softest" />
        </div>
        <Input
          required
          label="email"
          register={register("email")}
          type="email"
          error={errors.email?.message}
        />
        <Input
          required
          label="password"
          register={register("password")}
          type="password"
          error={errors.password?.message}
        />
      </form>

      <div className="flex w-full flex-col gap-4 rounded-b-lg bg-white-soft p-4 dark:bg-black-softest">
        <div className="flex gap-1 text-sm">
          <p className="dark:text-white-softer">Don&apos;t have an account? </p>
          <Link href="/auth/signUp">
            <p className="text-blue-500 underline">Sign Up</p>
          </Link>
        </div>

        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
