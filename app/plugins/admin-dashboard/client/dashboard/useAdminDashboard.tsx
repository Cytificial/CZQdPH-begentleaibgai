import { Prisma } from '@prisma/client'
import { message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { Api } from '~/core/trpc'

type Props = {
  models: Prisma.ModelName[]
  where?: Record<string, any>
  countItemsByPages?: number
}

export function useAdminDashboard<ModelType>({
  models,
  where,
  countItemsByPages = 10,
}: Props) {
  const [messageApi] = message.useMessage()

  const [selectedModel, setSelectedModel] = useState(models[0])
  const [whereState, setWhere] = useState<Record<string, any>>(where ?? {})

  const modelLowercase = selectedModel.toLowerCase()

  const countItems = countItemsByPages + 1

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { data, fetchNextPage, hasNextPage, refetch, isRefetching } = Api[
    modelLowercase
  ].findMany.useInfiniteQuery(
    { where: whereState, take: countItems },
    {
      getNextPageParam: (pageLast, _pages) => {
        if (pageLast.length < countItems) {
          return undefined
        }

        const itemLast = pageLast.slice(-1)[0]

        return { id: itemLast.id }
      },
    },
  )

  const { data: totalCount, isLoading: isLoadingCount } = Api[
    modelLowercase
  ].count.useQuery({ where })

  const { mutateAsync: editItem, isLoading: isLoadingUpdate } =
    Api[modelLowercase].update.useMutation()
  const { mutateAsync: deleteItem, isLoading: isLoadingDelete } =
    Api[modelLowercase].delete.useMutation()

  useEffect(() => {
    if (errorMessage) {
      messageApi.open({
        type: 'error',
        content: errorMessage,
      })
      setErrorMessage(null)
    }
  }, [errorMessage, messageApi])

  const isLoading =
    isLoadingUpdate || isLoadingDelete || isRefetching || isLoadingCount

  const pages: ModelType[][] = data?.pages ?? []

  const items = useMemo(() => {
    return pages.map(page => page.slice(0, countItems - 1)).flat()
  }, [pages])

  const onEdit = async (id: string, itemUpdated: any) => {
    await editItem({ where: { id }, data: itemUpdated })
  }

  const onDelete = async (id: string, cascade = false) => {
    try {
      await deleteItem({ where: { id } }, cascade)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return {
    items,
    fetchNextPage,
    hasNextPage,
    totalCount,
    refetch,
    selectedModel,
    setSelectedModel,
    models,
    onEdit,
    onDelete,
    isLoading,
    setWhere,
  }
}
