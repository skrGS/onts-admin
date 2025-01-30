"use client";

import React from 'react'
import {  Form,  Modal, Select,  Divider } from "antd";
import { IAdmin,  } from '@/app/(private)/users/page';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInput } from '@mantine/core';

type Props = {
  visible: boolean;
  onOk: (data: IAdmin) => Promise<void>;
  onCancel: () => void;
  handleSubmit: any;
  control: Control<IAdmin, any>;
  errors: FieldErrors<IAdmin>
}

const AdminAddModal = ({onCancel, onOk,visible, handleSubmit,control, errors }: Props) => {
  return (
    <Modal
    title="Админ нэмэх"
    visible={visible}
    okText="Нэмэх"
    cancelText="Болих"
    onOk={handleSubmit(onOk)}
    onCancel={onCancel}
  >
    <Divider />
      <Form layout="vertical">
          <Controller 
          name='phone'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            placeholder='Утас'
            label="Утас"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors?.phone?.message}
            />
          )}
          />
          <Controller
          name='password'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            placeholder='Нууц үг'
            label="Нууц үг"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors?.password?.message}
            />
          )}
          />
          
          <Controller
          name='cPassword'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            placeholder='Нууц үг давтах'
            label="Нууц үг давтах"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors.cPassword?.message}
            />
          )}
          />
      </Form>
  </Modal>
  )
}

export default AdminAddModal
