"use client";

import React from 'react'
import { Modal, Divider,  } from "antd";
import {   SolutionOutlined } from "@ant-design/icons";
import { IUser } from '@/app/(private)/users/page';
type Props = {
  visible: boolean;
  onOk: () => Promise<void>
  onCancel: () => void;
  user: IUser | null;
  title?: string
  okText?: string;
  description?: string;
  type?: "error" | "success"
}

const ConfirmModal = ({onCancel, onOk,visible, user, title, okText, description, type = "success"}: Props) => {
  return (
     <Modal
        title={title ? title :"Хэрэглэгчийн төлбөр засах"}
        visible={visible}
        okText={okText ? okText : "Засах"}
        cancelText="Болих"
        onOk={onOk}
        onCancel={onCancel}
      >
        <Divider />
       <div className={`${type === "error" ? "bg-red-500" : "bg-green-500"} rounded-full px-3 justify-self-center p-2 text-3xl text-white`}> 
        <SolutionOutlined />
       </div>
       <p className='text-center mt-2 font-medium text-lg'>
        {user?.registerNumber}-{user?.phone}
       </p>
       <p className='text-center text-sm mb-5'>
        {description ? description : "Та төлбөрийг баталгаажуулахдаа итгэлтэй байна уу!"}
       </p>
      </Modal> 
  )
}

export default ConfirmModal
