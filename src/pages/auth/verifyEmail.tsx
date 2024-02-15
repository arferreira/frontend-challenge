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
import HomeSkeleton from "~/components/Skeletons/HomeSkeleton";

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

  if (isLoading) return <HomeSkeleton />;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4 p-4 pb-0">
        <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white-soft md:text-2xl">
          Verify <span className="text-blue-600 dark:text-discord">Email</span>
        </h2>

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
        </form>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-b-lg bg-white-soft p-4 dark:bg-black-softest">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Verify
        </Button>
      </div>
    </div>
  );
}

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
