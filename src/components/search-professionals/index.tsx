import React from 'react'
import { Input } from 'antd/lib'
import { UserOutlined } from '@ant-design/icons';

function SearchProfessionals() {
  return (
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
  )
}

export default SearchProfessionals;