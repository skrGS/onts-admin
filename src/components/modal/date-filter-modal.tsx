"use client";

import React from 'react'
import { Form,  Modal,   Divider, Select } from "antd";
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInput } from '@mantine/core';

export type IExcelDateForm = {
  startDate: string;
  endDate: string;
  isPayment: boolean | null;
}

type Props = {
  visible: boolean;
  onOk: (data: IExcelDateForm) => Promise<void>;
  onCancel: () => void;
  handleSubmit: any;
  control: Control<IExcelDateForm, any>;
  errors: FieldErrors<IExcelDateForm>;
  loading:boolean
}

const DateFilterModal = ({onCancel, onOk,visible, handleSubmit,control, errors,loading }: Props) => {
  return (
    <Modal
    title="Excel хөрвүүлэх"
    visible={visible}
    okText="Татах"
    cancelText="Болих"
    confirmLoading={loading}
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
          <Controller
          name='isPayment'
          control={control}
          render={({field}) => (
            <div className='mt-4'>
            <Form.Item label="Төлбөрийн төлөв" name="isPayment">
            <Select
            placeholder="Төлбөрийн төлөв"
            value={field.value}
            className='w-full'
            onChange={(value) => field.onChange(value)}
            allowClear
            >
            {[true,false, null].map((payment, index) => (
              <Select.Option key={index} value={payment}>
                {payment === null ? "Бүгд" : payment ? "Төлөгдсөн" : "Төлөгдөөгүй"}
              </Select.Option>
            ))}
          </Select>
          </Form.Item>
            </div>
          )}
          />
      </Form>
  </Modal>
  )
}

export default DateFilterModal
