import {Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { Controller } from "react-hook-form";

export type ILoginForm = {
  phone: string;
  password: string;
};

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: any;
  errors: any;
  loading: boolean;
};

export function LoginForm({ onSubmit, control, errors, loading }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="Нэвтрэх нэр"
              label="Нэвтрэх нэр"
              required
              radius={8}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              placeholder="Нууц үг"
              label="Нууц үг"
              required
              radius={8}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              error={errors.password?.message}
            />
          )}
        />
        <Button radius="md" variant="filled" loading={loading} type="submit">
          Нэвтрэх
        </Button>
      </div>
    </form>
  );
}
