import { Button, Col, ColorPicker, DatePicker, Flex, Form, Input, Row } from 'antd'
import { Color } from 'antd/es/color-picker'
import React, { useState } from 'react'
export type SettingProps = {}

const SettingFormContainer: React.FC<SettingProps> = () => {
  const [color, setColor] = useState<string>('#000') // Trạng thái lưu màu sắc

  const handleColorChange = (newColor: Color) => {
    setColor(newColor.toHexString()) // Cập nhật màu sắc mới
  }

  const [form] = Form.useForm()

  const onFinish = () => {
    const values = form.getFieldsValue()
    console.log('Received values of form: ', values)
  }

  return (
    <Form
      form={form}
      name="setting-form"
      onFinish={onFinish}
      scrollToFirstError={false}
      labelAlign="left"
      layout="vertical"
    >
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Form.Item
            name="title"
            label={'Title'}
            rules={[{ required: true, message: 'Vui lòng nhập title' }]}
          >
            <Input allowClear />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label={'Email'}
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Vui lòng nhập đúng định dạng email' },
            ]}
          >
            <Input allowClear />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="background_color"
            label={'Background Color'}
            rules={[{ required: true, message: 'Vui lòng nhập background color' }]}
          >
            <Flex>
              <Input style={{ color }} allowClear />
              <ColorPicker onChange={handleColorChange} allowClear />
            </Flex>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="active_date"
            label={'Active Date'}
            rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
          >
            <DatePicker.RangePicker
              placeholder={['Bắt đầu', 'Kết thúc']}
              style={{ width: '100%' }}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>

      <Flex justify="flex-end">
        <Flex gap={16}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Flex>
      </Flex>
    </Form>
  )
}

export default SettingFormContainer
