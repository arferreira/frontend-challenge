import type z from "zod";
import { signIn } from "next-auth/react";
import { type ReactElement } from "react";
import MainLayout from "~/layouts/MainLayout";
import Input from "~/components/Input";
import { SignInSchema } from "~/schemas/signIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/Button";
import Discord from "~/components/auth/Discord";

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

  const onSubmit = async (data: ValidationSchema) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    console.log("🚀 - response:", response);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <Discord />
      <div className="flex w-full items-center justify-center gap-2 text-sm text-gray-400">
        <div className="h-px w-full rounded-md bg-gray-300" />
        or
        <div className="h-px w-full rounded-md bg-gray-300" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
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
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

SignIn.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
