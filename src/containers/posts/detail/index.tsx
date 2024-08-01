import LoadingCenter from '@components/loading/loading-center'
import { Descriptions, Modal, ModalProps } from 'antd'
import axios from 'axios'
import React, { startTransition, useImperativeHandle, useState } from 'react'
import { Post } from '..'

type ModalDetailContainerProps = {
  onSuccess?: () => void
} & ModalProps
export type ModalDetailContainerMethods = {
  open: (data?: Post) => void
}
const ModalDetailContainer = React.forwardRef<
  ModalDetailContainerMethods,
  ModalDetailContainerProps
>(({ onSuccess, ...p }, ref) => {
  const [data, setData] = useState<Post>()
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    open: data => {
      startTransition(() => {
        setOpen(true)
        if (data?.id) {
          fetch(data?.id)
        }
      })
    },
  }))

  const fetch = (id: number) => {
    setLoadingData(true)
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(r => {
        if (r.status === 200) {
          startTransition(() => {
            setLoadingData(false)
            setData(r?.data)
          })
        }
      })
      .catch(() => setLoadingData(false))
  }

  const onClose = () => {
    startTransition(() => {
      setOpen(false)
    })
  }

  return (
    <Modal {...p} open={open} onCancel={onClose} footer={null} width={1000}>
      {!loadingData ? (
        <Descriptions
          title="Post Info"
          layout="vertical"
          bordered
          items={[
            {
              key: data?.userId,
              label: 'User ID',
              children: data?.userId,
            },
            {
              key: data?.title,
              label: 'Title',
              children: data?.title,
            },
            {
              key: data?.body,
              label: 'Body',
              children: data?.body,
            },
          ]}
        />
      ) : (
        <LoadingCenter />
      )}
    </Modal>
  )
})

export default ModalDetailContainer
