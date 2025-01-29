"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ILoginForm, LoginForm } from "./login-form";
import { useForm } from "react-hook-form";
import { authApi } from "@/apis";
import { message } from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginForm>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      await authApi.login(data);
      message.success("Амжилттай нэвтэрлээ.");
      router.push("/");
    } catch (err: any) {
      message.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center rounded-sm border border-stroke bg-gray-50 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="items-center flex flex-col gap-4 p-8 border rounded-2xl w-96 bg-white">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                className="hidden dark:block"
                src={"/logo.png"}
                alt="Logo"
                width={176}
                height={32}
                objectFit="cover"
              />
              <Image
                className="dark:hidden"
                src={"/logo.png"}
                alt="Logo"
                width={176}
                height={32}
                objectFit="cover"
              />
            </Link>
        <div className="w-full flex flex-col">
          <div className="w-full text-center gap-2 flex flex-col mb-8">
            <h2 className="text-xl font-bold text-black">
              ОНЦ800 Систем 
            </h2>
            <h3 className="text-sm text-gray-600">
              Админ нэвтрэх
            </h3>
          </div>
          <LoginForm
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            errors={errors}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
