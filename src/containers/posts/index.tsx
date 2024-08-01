import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { PageContainer } from '@components/box/page-container'
import { useMounted } from '@hooks/lifecycle'
import { Button, Input, InputRef, Space, Table, TableColumnType, TableProps } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import axios from 'axios'
import React, { startTransition, useCallback, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import ModalDetailContainer, { ModalDetailContainerMethods } from './detail'

export type Post = {
  userId: string
  id: number
  title: string
  body: string
}

type DataIndex = keyof Post

const PostManagerContainer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<Post[]>([])

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const detailRef = useRef<ModalDetailContainerMethods>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<Post> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const fetch = useCallback(() => {
    setLoading(true)
    axios.get('https://jsonplaceholder.typicode.com/posts').then(r => {
      if (r.status === 200) {
        startTransition(() => {
          setLoading(false)
          setData(r.data)
        })
      }
    })
  }, [])

  useMounted(() => fetch())

  const columns: TableProps<Post>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      ...getColumnSearchProps('userId'),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<ExclamationCircleOutlined />}
            onClick={() => detailRef.current?.open(record)}
            style={{ border: 'none' }}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer>
      <Table
        columns={columns}
        loading={loading}
        rowKey={record => record?.id ?? ''}
        dataSource={data}
      />
      <ModalDetailContainer ref={detailRef} />
    </PageContainer>
  )
}

export default PostManagerContainer
