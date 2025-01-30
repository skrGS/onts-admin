"use client";

import React from 'react'
import {  Form,  Modal, Select,  Divider } from "antd";
import { IUser } from '@/app/(private)/users/page';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TextInput } from '@mantine/core';
import { cyrillicLetters } from '@/utils/params';
type Props = {
  visible: boolean;
  onOk: (data: IUser) => Promise<void>;
  onCancel: () => void;
  handleSubmit: any;
  control: Control<IUser, any>;
  errors: FieldErrors<IUser>
}

const UserEditModal = ({onCancel, onOk,visible, handleSubmit,control, errors }: Props) => {
  return (
    <Modal
    title="Хэрэглэгчийн мэдээлэл засах"
    visible={visible}
    okText="Засах"
    cancelText="Болих"
    onOk={handleSubmit(onOk)}
    onCancel={onCancel}
  >
    <Divider />
      <Form layout="vertical">
        <Controller
        name='registerNumber'
        control={control}
        render={({field}) => (
          <div className='gap-4 w-full'>
            <p>Регистр</p>
            <div className='flex gap-2'>
            <Select 
            value={field.value.charAt(0)}
            onChange={(value) => field.onChange(`${value}${field.value.slice(1)}`)}
            >
              {cyrillicLetters.map((letter) => (
                <Select.Option key={letter} value={letter}>
                  {letter}
                </Select.Option>
              ))}

            </Select>
            <Select 
            value={field.value.charAt(1)}
            onChange={(value) => field.onChange(`${field.value.charAt(0)}${value}${field.value.slice(2)}`)}
            >
              {cyrillicLetters.map((letter) => (
                <Select.Option key={letter} value={letter}>
                  {letter}
                </Select.Option>
              ))}
            </Select>
            <TextInput
            value={field.value.slice(2)}
            placeholder='Утас'
            required
            radius={8}
            onChange={(event) => {
              field.onChange(`${field.value.slice(0,2)}${event.target.value}`)
            }}
            error={errors?.phone?.message}
            className='w-full min-w-[100px]'
            />
            </div>
          </div>
        )}
        />
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
          name='firstName'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            placeholder='Нэр'
            label="Нэр"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors?.firstName?.message}
            />
          )}
          />
          <Controller
          name='lastName'
          control={control}
          render={({field}) => (
            <TextInput
            {...field}
            placeholder='Овог'
            label="Овог"
            required
            radius={8}
            onChange={(event) => {
              field.onChange(event.target.value)
            }}
            error={errors.firstName?.message}
            />
          )}
          />
      </Form>
  </Modal>
  )
}

export default UserEditModal
