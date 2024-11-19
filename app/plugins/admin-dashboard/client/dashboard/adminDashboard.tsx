import { Form, Input, Modal, Select, Table } from 'antd'
import { useEffect, useState } from 'react'
import { useUserContext } from '~/core/context'
import { Utility } from '~/core/helpers/utility'
import NotFound from '~/routes/$404.$'
import { useAdminDashboard } from './useAdminDashboard'

type ColumnType = {
  title: any
  dataIndex?: string
  key: string
  render?: (text: any, record: any) => JSX.Element
  filterDropdown?: JSX.Element
}

type Props<Type> = {
  hook: ReturnType<typeof useAdminDashboard<Type>>
}

export const AdminDashboard = <Type,>({ hook }: Props<Type>) => {
  const {
    items,
    fetchNextPage,
    hasNextPage,
    refetch,
    selectedModel,
    setSelectedModel,
    totalCount,
    onEdit,
    isLoading,
    setWhere,
  } = hook

  const { checkRole } = useUserContext()

  if (!checkRole('ADMIN')) {
    NotFound()
  }

  const [columns, setColumns] = useState<ColumnType[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingCell, setEditingCell] = useState<{
    record: any
    dataIndex: string
  } | null>(null)
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 10

  const valueDisplayed = (value: any) => {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return JSON.stringify(value)
    }
    return value
  }

  const handleSearchDebounce = Utility.debounce(
    (dataIndex: string, searchValue: string) =>
      handleSearch(dataIndex, searchValue),
    500,
  )

  const handleSearch = (dataIndex: string, searchValue: string) => {
    setWhere(prev => {
      const updatedWhere = {
        ...prev,
        [dataIndex]: {
          contains: `${searchValue.toLowerCase()}`,
          mode: 'insensitive',
        },
      }

      return updatedWhere
    })

    refetch()
  }

  useEffect(() => {
    if (items.length > 0) {
      const itemKeys = Object.keys(items[0])
      const generatedColumns: ColumnType[] = itemKeys.map(key => ({
        title: (
          <div>
            <div>{key}</div>
            <Input
              placeholder={`Search ${key}`}
              onChange={e => handleSearchDebounce(key, e.target.value)}
              style={{ marginTop: 8 }}
            />
          </div>
        ),
        dataIndex: key,
        key,
        render: (text, record) => (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => openEditModal(record, key)}
          >
            {valueDisplayed(text)}
          </span>
        ),
      }))
      setColumns(generatedColumns)
    }
  }, [items])

  const openEditModal = (record: any, dataIndex: string) => {
    setEditingCell({ record, dataIndex })
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setEditingCell(null)
    form.resetFields()
  }

  const handleSave = async () => {
    try {
      if (!editingCell) {
        return
      }

      const { record, dataIndex } = editingCell

      const values = form.getFieldsValue()

      await onEdit(record.id, { [dataIndex]: values[dataIndex] })
      await refetch()
      closeModal()
    } catch (error) {
      console.error('Error updating cell value:', error)
    }
  }

  const handleModelChange = (value: typeof selectedModel) => {
    setSelectedModel(value)
    refetch()
  }

  const handleTableChange = async (pagination: any) => {
    const newPage = pagination.current
    setCurrentPage(newPage)

    if (newPage > currentPage && hasNextPage) {
      await fetchNextPage()
    }
  }

  return (
    <div>
      <Select
        placeholder="Select a model"
        value={selectedModel}
        onChange={handleModelChange}
        style={{ marginBottom: 16, width: 200 }}
      >
        {hook.models.map(model => (
          <Select.Option key={model} value={model}>
            {model}
          </Select.Option>
        ))}
      </Select>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={items}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: totalCount,
        }}
        scroll={{ x: 'max-content' }}
        onChange={handleTableChange}
      />

      <Modal
        title={`Edit Cell: ${editingCell?.dataIndex}`}
        open={isModalVisible}
        onCancel={closeModal}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          {editingCell && (
            <Form.Item
              name={editingCell.dataIndex}
              label={`Edit ${editingCell.dataIndex}`}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  )
}
