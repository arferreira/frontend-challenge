import type z from "zod";
import { useEffect, type ReactElement } from "react";
import MainLayout from "~/layouts/MainLayout";
import Input from "~/components/Input";
import { SignUpSchema } from "~/schemas/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/Button";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useToast } from "~/providers/ToastProvider";

type ValidationSchema = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  });

  const { push, query } = useRouter();

  const { showToast } = useToast();

  useEffect(() => {
    if (query?.error) {
      showToast({
        type: "danger",
        message: query.error as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { mutate, isLoading } = api.user.createUser.useMutation({
    onError: () => showToast({ type: "danger", message: "Error on SignUp" }),
  });

  const onSubmit = async (data: ValidationSchema) => {
    mutate(data);
    await push(`/auth/verifyEmail?email=${data.email}&message=Email Sent!`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-start gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 p-4 pb-2"
      >
        <h2 className="dark:text-white-soft text-2xl font-bold tracking-tight text-black md:text-2xl">
          Sign <span className="text-blue-600 dark:text-discord">Up</span>
        </h2>
        <Input
          required
          label="name"
          register={register("name")}
          error={errors.name?.message}
        />
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
      <div className="dark:bg-black-softest bg-white-soft flex w-full flex-col gap-4 rounded-b-lg p-4">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
