"use client";

import React from 'react'
import {  Form,  Modal,   Divider } from "antd";
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInput } from '@mantine/core';

export type IExcelDateForm = {
  startDate: string;
  endDate: string;
}

type Props = {
  visible: boolean;
  onOk: (data: IExcelDateForm) => Promise<void>;
  onCancel: () => void;
  handleSubmit: any;
  control: Control<IExcelDateForm, any>;
  errors: FieldErrors<IExcelDateForm>
}

const DateFilterModal = ({onCancel, onOk,visible, handleSubmit,control, errors }: Props) => {
  return (
    <Modal
    title="Excel хөрвүүлэх"
    visible={visible}
    okText="Татах"
    cancelText="Болих"
    onOk={handleSubmit(onOk)}
    onCancel={onCancel}
  >
    <Divider />
      <Form layout="vertical">
          <Controller 
          name='startDate'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            type='date'
            placeholder='Эхлэх хугацаа'
            label="Эхлэх хугацаа"
            required
            className='mb-4'
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors?.startDate?.message}
            />
          )}
          />
          <Controller 
          name='endDate'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            type='date'
            placeholder='Дуусах хугацаа'
            label="Дуусах хугацаа"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors?.startDate?.message}
            />
          )}
          />
      </Form>
  </Modal>
  )
}

export default DateFilterModal
