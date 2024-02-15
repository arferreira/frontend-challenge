import type z from "zod";
import { useEffect, type ReactElement } from "react";
import MainLayout from "~/layouts/MainLayout";
import Input from "~/components/Input";
import { TokenSchema } from "~/schemas/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/Button";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useToast } from "~/providers/ToastProvider";

type ValidationSchema = z.infer<typeof TokenSchema>;

export default function VerifyEmail() {
  const { push, query } = useRouter();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(TokenSchema),
    mode: "onBlur",
    defaultValues: {
      token: query.token as string,
    },
  });

  useEffect(() => {
    if (query?.message) {
      showToast({
        type: "success",
        message: query.message as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { mutate, isLoading } = api.user.VerifyEmail.useMutation({
    onSuccess: async (data) => {
      if (data) await push("/auth/signIn?message=Email Verified");
    },
    onError: () =>
      showToast({ type: "danger", message: "Error on Email Verification" }),
  });

  const onSubmit = async (data: ValidationSchema) => {
    if (!query.email) return;
    mutate({
      email: query.email as string,
      token: data.token,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Verify Email</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input
          required
          label="Token"
          register={register("token")}
          error={errors.token?.message}
          defaultValue={query.token as string}
        />
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Verify
        </Button>
      </form>
    </div>
  );
}

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
