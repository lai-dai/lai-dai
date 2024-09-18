'use client'

import * as React from 'react'
import { useMutation } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Trash } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import srtParser2 from 'srt-parser-2'

import { ResFindOne } from '@/lib/types/common'
import { api, apiAdmin, apiNext } from '@/lib/api'
import { QUERY_KEYS } from '@/lib/constants/query-key'
import { useListState } from '@/lib/hooks/use-list-state'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableRowsEmpty,
} from '@/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/responsive-dialog'
import { Spinner } from '@/components/ui/spinner'
import {
  Virtualizer,
  VirtualizerContent,
  VirtualizerItem,
  VirtualizerTrack,
} from '@/components/ui/virtualizer'
import { Message } from '@/components/message'

type SrtAttr = {
  id: string
  startTime: string
  startSeconds: number
  endTime: string
  endSeconds: number
  text: string
}

export function SentenceForm() {
  const parser = React.useRef(new srtParser2())
  const [open, setOpen] = React.useState(false)

  const [rowEnSelection, rowEnHandlers] = useListState<SrtAttr>([])
  const [rowViSelection, rowViHandlers] = useListState<SrtAttr>([])

  const [rowSelection, rowHandlers] = useListState<any>([])

  const createManySentence = useMutation({
    mutationFn: (data: any) =>
      apiNext.post<ResFindOne<any>>(QUERY_KEYS.createManySentence, data),
  })

  const handleSubmit = async () => {
    createManySentence.mutate(rowSelection, {
      onSuccess(data, variables, context) {
        toast.success(data.message || 'Successfully')
        setOpen(false)
        rowEnHandlers.setState([])
        rowViHandlers.setState([])
        rowHandlers.setState([])
      },
      onError(error, variables, context) {
        toast.error(error.message || 'Error')
      },
    })
  }

  const [listEnData, listEnHandlers] = useListState<SrtAttr>([])
  const [listViData, listViHandlers] = useListState<SrtAttr>([])

  const dropzoneEn = useDropzone({
    accept: {
      'text/plain': ['.srt'],
    },
    onDrop: (acceptedFiles) => {
      const reader = new FileReader()

      reader.onload = function () {
        if (typeof reader.result === 'string') {
          const srtArr = parser.current.fromSrt(reader.result)

          listEnHandlers.setState(srtArr)
          listViHandlers.setState([])
          rowEnHandlers.setState([])
          rowViHandlers.setState([])
          rowHandlers.setState([])
        }
      }

      if (acceptedFiles[0]) {
        reader.readAsText(acceptedFiles[0])
      }
    },
  })

  const dropzoneVi = useDropzone({
    accept: {
      'text/plain': ['.srt'],
    },
    onDrop: (acceptedFiles) => {
      const reader = new FileReader()

      reader.onload = function () {
        if (typeof reader.result === 'string') {
          const srtArr = parser.current.fromSrt(reader.result)

          listViHandlers.setState(srtArr)
          rowEnHandlers.setState([])
          rowViHandlers.setState([])
          rowHandlers.setState([])
        }
      }

      if (acceptedFiles[0]) {
        reader.readAsText(acceptedFiles[0])
      }
    },
  })

  const parse = (propsEn: SrtAttr, propsVi: SrtAttr) => {
    const html1 = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
    const html2 = / *\{[^}]*\} */g
    const html3 = / *\([^)]*\) */g

    const text = propsEn.text
      .replace(html1, '')
      .replace(html2, '')
      .replace(html3, '')

    const translate = propsVi?.text
      .replace(html1, '')
      .replace(html2, '')
      .replace(html3, '')

    return {
      id_en: propsEn?.id || '',
      id_vi: propsVi?.id || '',
      text,
      translate,
      start_time: propsEn?.startTime || '',
    }
  }

  const columns = React.useMemo<Array<ColumnDef<SrtAttr>>>(
    () => [
      {
        id: 'select-1',
        header: ({ table }) => (
          <Checkbox
            checked={
              listEnData.length > 0 &&
              listViData.length > 0 &&
              rowEnSelection.length === listEnData.length &&
              rowViSelection.length === listViData.length
            }
            onCheckedChange={(value) => {
              if (value) {
                rowEnHandlers.setState(listEnData)
                rowViHandlers.setState(listViData)
                const result = listEnData.map((item, index) =>
                  parse(item, listViData[index])
                )
                rowHandlers.setState(result)
              } else {
                rowEnHandlers.setState([])
                rowViHandlers.setState([])
                rowHandlers.setState([])
              }
            }}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => {
          if (listViData.length) {
            return (
              <Checkbox
                checked={
                  rowEnSelection.includes(row.original) &&
                  rowViSelection.includes(listViData[row.index])
                }
                onCheckedChange={(value) => {
                  if (value) {
                    rowEnHandlers.append(row.original)
                    rowViHandlers.append(listViData[row.index])

                    const result = parse(row.original, listViData[row.index])

                    rowHandlers.append(result)
                  } else {
                    rowEnHandlers.filter((item) => item !== row.original)
                    rowViHandlers.filter(
                      (item) => item !== listViData[row.index]
                    )
                    rowHandlers.filter(
                      (item) => item?.id_en !== row.original.id
                    )
                  }
                }}
                aria-label="Select row"
                className="translate-y-0.5"
              />
            )
          }
          return null
        },
        enableSorting: false,
        enableHiding: false,
        maxSize: 50,
      },

      {
        id: 'select-2',
        cell: ({ row }) => (
          <Checkbox
            checked={rowEnSelection.includes(row.original)}
            onCheckedChange={(value) => {
              if (value) {
                rowEnHandlers.append(row.original)

                if (rowViSelection?.[rowEnSelection.length]) {
                  const result = parse(
                    row.original,
                    rowViSelection?.[rowEnSelection.length]
                  )

                  rowHandlers.append(result)
                }
              } else {
                rowEnHandlers.filter((item) => item !== row.original)
                rowViHandlers.filter(
                  (item) =>
                    item !==
                    rowViSelection[
                      rowEnSelection.findIndex((item) => item === row.original)
                    ]
                )
                rowHandlers.filter((item) => item.id_en !== row.original.id)
              }
            }}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        maxSize: 50,
      },
      {
        accessorKey: 'id',
        header: 'id',
        maxSize: 80,
        cell: (info) => {
          return <Input defaultValue={info.getValue<string>()} />
        },
      },
      {
        header: 'start time',
        accessorKey: 'startTime',
        cell: (info) => {
          return (
            <div>
              <Input
                className={cn(
                  listViData.length
                    ? info.row.original.startSeconds ===
                      listViData[info.row.index]?.startSeconds
                      ? 'bg-green-500'
                      : 'bg-destructive'
                    : ''
                )}
                defaultValue={info.getValue<string>()}
              />
            </div>
          )
        },
        maxSize: 150,
      },
      {
        header: 'end time',
        accessorKey: 'endTime',
        cell: (info) => {
          return (
            <div>
              <Input
                className={cn(
                  listViData.length
                    ? info.row.original.endSeconds ===
                      listViData[info.row.index]?.endSeconds
                      ? 'bg-green-500'
                      : 'bg-destructive'
                    : ''
                )}
                defaultValue={info.getValue<string>()}
              />
            </div>
          )
        },
        maxSize: 150,
      },
      {
        accessorKey: 'text',
        header: 'text',
        cell: (info) => {
          return <Input defaultValue={info.getValue<string>()} />
        },
      },
      {
        id: 'actions',
        header: () => <p className="text-center">Actions</p>,
        maxSize: 100,
        enableHiding: false,
        cell: (info) => {
          return (
            <div className="flex justify-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'outline'} size={'icon'} className="size-6">
                    <ArrowUpDown className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      listEnHandlers.insert(info.row.index, {
                        text: '',
                        id: String(
                          Date.now().toString(36) +
                            Math.random().toString(36).substr(2)
                        ),
                        endTime: '',
                        startTime: '',
                        endSeconds: 0,
                        startSeconds: 0,
                      })
                    }}
                  >
                    Add Up
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      listEnHandlers.insert(info.row.index + 1, {
                        text: '',
                        id: String(
                          Date.now().toString(36) +
                            Math.random().toString(36).substr(2)
                        ),
                        endTime: '',
                        startTime: '',
                        endSeconds: 0,
                        startSeconds: 0,
                      })
                    }}
                  >
                    Add Down
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DeleteDataDialog
                data={info.row.original}
                onDelete={() => {
                  listEnHandlers.remove(info.row.index)
                }}
              >
                <Button
                  variant={'destructive'}
                  size={'icon'}
                  className="size-6"
                >
                  <Trash className="size-3" />
                </Button>
              </DeleteDataDialog>
            </div>
          )
        },
      },

      {
        id: 'select-3',
        cell: ({ row }) => {
          if (listViData.length) {
            return (
              <Checkbox
                checked={rowViSelection.includes(listViData[row.index])}
                onCheckedChange={(value) => {
                  if (value) {
                    rowViHandlers.append(listViData[row.index])

                    if (rowEnSelection?.[rowViSelection.length]) {
                      const result = parse(
                        rowEnSelection?.[rowViSelection.length],
                        listViData[row.index]
                      )

                      rowHandlers.append(result)
                    }
                  } else {
                    rowViHandlers.filter(
                      (item) => item !== listViData[row.index]
                    )
                    rowEnHandlers.filter(
                      (item) =>
                        item !==
                        rowEnSelection[
                          rowViSelection.findIndex(
                            (item) => item === listViData[row.index]
                          )
                        ]
                    )
                    rowHandlers.filter(
                      (item) => item.id_vi !== listViData[row.index].id
                    )
                  }
                }}
                aria-label="Select row"
                className="translate-y-0.5"
              />
            )
          }
          return null
        },
        enableSorting: false,
        enableHiding: false,
        maxSize: 50,
      },
      {
        accessorKey: 'id_vi',
        header: 'id',
        maxSize: 80,
        cell: (info) => {
          if (listViData.length) {
            return <Input defaultValue={listViData[info.row.index]?.id || ''} />
          }
          return null
        },
      },
      {
        header: 'start time',
        accessorKey: 'startTime_vi',
        maxSize: 150,
        cell: (info) => {
          if (listViData.length) {
            return (
              <div>
                <Input
                  className={cn(
                    info.row.original.startSeconds ===
                      listViData[info.row.index]?.startSeconds
                      ? 'bg-green-500'
                      : 'bg-destructive'
                  )}
                  defaultValue={listViData[info.row.index]?.startTime || ''}
                />
              </div>
            )
          }
          return null
        },
      },
      {
        header: 'end time',
        accessorKey: 'endTime_vi',
        maxSize: 150,
        cell: (info) => {
          if (listViData.length) {
            return (
              <div>
                <Input
                  className={cn(
                    info.row.original.endTime ===
                      listViData[info.row.index]?.endTime
                      ? 'bg-green-500'
                      : 'bg-destructive'
                  )}
                  defaultValue={listViData[info.row.index]?.endTime || ''}
                />
              </div>
            )
          }
          return null
        },
      },
      {
        accessorKey: 'text_vi',
        header: 'text',
        cell: (info) => {
          if (listViData.length) {
            return (
              <Input defaultValue={listViData[info.row.index]?.text || ''} />
            )
          }
          return null
        },
      },
      {
        id: 'actions_vi',
        header: () => <p className="text-center">Actions</p>,
        maxSize: 100,
        enableHiding: false,
        cell: (info) => {
          if (listViData.length) {
            return (
              <div className="flex justify-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={'outline'}
                      size={'icon'}
                      className="size-6"
                    >
                      <ArrowUpDown className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        listViHandlers.insert(info.row.index, {
                          text: '',
                          id: String(
                            Date.now().toString(36) +
                              Math.random().toString(36).substr(2)
                          ),
                          endTime: '',
                          startTime: '',
                          endSeconds: 0,
                          startSeconds: 0,
                        })
                      }}
                    >
                      Add Up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        listViHandlers.insert(info.row.index + 1, {
                          text: '',
                          id: String(
                            Date.now().toString(36) +
                              Math.random().toString(36).substr(2)
                          ),
                          endTime: '',
                          startTime: '',
                          endSeconds: 0,
                          startSeconds: 0,
                        })
                      }}
                    >
                      Add Down
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DeleteDataDialog
                  data={info.row.original}
                  onDelete={() => {
                    listViHandlers.remove(info.row.index)
                  }}
                >
                  <Button
                    variant={'destructive'}
                    size={'icon'}
                    className="size-6"
                  >
                    <Trash className="size-3" />
                  </Button>
                </DeleteDataDialog>
              </div>
            )
          }
          return null
        },
      },
    ],
    [listViData, listEnData, rowEnSelection, rowViSelection]
  )

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-x-3">
            <Button onClick={dropzoneEn.open}>File En</Button>
            <Button
              onClick={() => {
                listEnHandlers.setState([])
                listViHandlers.setState([])
                rowEnHandlers.setState([])
                rowViHandlers.setState([])
                rowHandlers.setState([])
              }}
            >
              Reset
            </Button>
          </div>
          <div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Selection {rowSelection.length}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>List</DialogTitle>
                </DialogHeader>
                <div className="size-full overflow-auto">
                  <div className="w-96 whitespace-pre text-sm">
                    {JSON.stringify(rowSelection, null, 4)}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit}>
                    {createManySentence.isPending && (
                      <Spinner className="mr-3" />
                    )}
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-x-3">
            <Button onClick={dropzoneVi.open}>File Vi</Button>
            <Button
              onClick={() => {
                listViHandlers.setState([])
                rowEnHandlers.setState([])
                rowViHandlers.setState([])
                rowHandlers.setState([])
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <DataTable data={listEnData} columns={columns}>
          <div className="flex h-[85vh] flex-col gap-6">
            <Virtualizer
              options={{
                count: listEnData.length,
                estimateSize: () => 35,
                overscan: 5,
                measureElement:
                  typeof window !== 'undefined' &&
                  navigator.userAgent.indexOf('Firefox') === -1
                    ? (element) => element?.getBoundingClientRect().height
                    : undefined,
              }}
              className="rounded-md border"
            >
              <Table className="grid">
                {(table) => (
                  <>
                    <TableHeader className="sticky top-0 z-[1] grid bg-muted">
                      {(headerGroup) => (
                        <TableHeaderRow
                          headerGroup={headerGroup}
                          className="flex w-full"
                        >
                          {(header) => (
                            <TableHead
                              header={header}
                              className="flex grow items-center"
                            />
                          )}
                        </TableHeaderRow>
                      )}
                    </TableHeader>

                    <VirtualizerContent asChild>
                      <TableBody className="grid">
                        <TableRowsEmpty>
                          <Message className="text-center">Not result</Message>
                        </TableRowsEmpty>

                        <VirtualizerTrack>
                          {(virtualRow, style, virtualizer) => {
                            const row =
                              table.getRowModel().rows[virtualRow.index]

                            return (
                              <VirtualizerItem asChild>
                                <TableRow
                                  row={row}
                                  data-index={virtualRow.index}
                                  ref={virtualizer.measureElement}
                                  style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                  }}
                                  className="absolute flex w-full"
                                >
                                  {(cell) => (
                                    <TableCell
                                      cell={cell}
                                      className="flex grow"
                                    />
                                  )}
                                </TableRow>
                              </VirtualizerItem>
                            )
                          }}
                        </VirtualizerTrack>
                      </TableBody>
                    </VirtualizerContent>
                  </>
                )}
              </Table>
            </Virtualizer>
          </div>
        </DataTable>
      </CardContent>
    </Card>
  )
}

function DeleteDataDialog({
  data,
  onDelete,
  children,
}: {
  data: SrtAttr | SrtAttr[]
  onDelete?: () => void
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className="font-medium">
              {Array.isArray(data) ? data.length : 1}
            </span>{' '}
            data from our servers.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => {
              onDelete?.()
              setOpen(false)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
