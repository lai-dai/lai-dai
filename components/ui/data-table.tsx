'use client'

import {
  ComponentPropsWithoutRef,
  createContext,
  CSSProperties,
  forwardRef,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useContext,
} from 'react'
import {
  Cell,
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
  HeaderGroup,
  Row,
  RowData,
  TableOptions,
  Table as TableType,
  useReactTable,
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue>
    extends Record<string, any> {
    columnName: string
  }
}

const DataTableContext = createContext<TableType<any> | null>(null)

export function useDataTableContext<TData = any>() {
  const context = useContext(DataTableContext)

  if (!context) {
    throw new Error('useDataTableContext must be used within a <DataTable />')
  }

  return context as TableType<TData>
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>
  children?: ReactNode | ((table: TableType<TData>) => ReactNode)
}

export function DataTable<TData>({
  options,
  data,
  columns,
  children,
}: DataTableProps<TData>) {
  const table = useReactTable({
    ...options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <DataTableContext.Provider value={table}>
      {children instanceof Function ? children(table) : children}
    </DataTableContext.Provider>
  )
}

export const Table = forwardRef<
  HTMLTableElement,
  Omit<HTMLAttributes<HTMLTableElement>, 'children'> & {
    children?: ReactNode | ((table: TableType<any>) => ReactNode)
  }
>(function Table({ className, style, children, ...props }, ref) {
  const table = useDataTableContext()
  return (
    <table
      ref={ref}
      style={Object.assign({ minWidth: table.getTotalSize() }, style)}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    >
      {children instanceof Function ? children(table) : children}
    </table>
  )
})

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> & {
    children?: ReactElement | ((headerGroup: HeaderGroup<any>) => ReactElement)
  }
>(function TableHeader({ className, children, ...props }, ref) {
  const table = useDataTableContext()
  return (
    <thead
      ref={ref}
      className={cn('bg-muted/50 [&_tr]:border-b', className)}
      {...props}
    >
      {children instanceof Function
        ? table
            .getHeaderGroups()
            .map((headerGroup) => (
              <Fragment key={headerGroup.id}>{children(headerGroup)}</Fragment>
            ))
        : children}
    </thead>
  )
})

export const TableHeaderRowsTrack = ({
  children,
}: {
  children?: (headerGroup: HeaderGroup<any>) => ReactElement
}) => {
  const table = useDataTableContext()
  return (
    <Fragment>
      {children instanceof Function
        ? table
            .getHeaderGroups()
            .map((headerGroup) => (
              <Fragment key={headerGroup.id}>{children(headerGroup)}</Fragment>
            ))
        : null}
    </Fragment>
  )
}

export const TableHeaderRow = forwardRef<
  HTMLTableRowElement,
  Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> & {
    headerGroup?: HeaderGroup<Record<string, any>>
    children?: ReactElement | ((header: Header<any, any>) => ReactElement)
  }
>(function TableHeaderRow({ className, headerGroup, children, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    >
      {children instanceof Function
        ? headerGroup &&
          headerGroup.headers.map((header) => (
            <Fragment key={header.id}>{children(header)}</Fragment>
          ))
        : children}
    </tr>
  )
})

export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement> & { header?: Header<any, any> }
>(function TableHead({ className, header, style, ...props }, ref) {
  if (!header) return null
  const innerStyle = getTableCellStyles(header.column)
  return (
    <th
      ref={ref}
      colSpan={header.column.getIsPinned() ? 0 : header.colSpan}
      style={Object.assign(innerStyle, style)}
      className={cn(
        'text-table-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
        header.column.getIsPinned() && 'bg-muted/50',
        className
      )}
      {...props}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
})

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> & {
    children?: ReactNode | ((row: Row<any>) => ReactElement)
  }
>(function TableBody({ className, children, ...props }, ref) {
  const table = useDataTableContext()
  return (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    >
      {children instanceof Function
        ? table
            .getRowModel()
            .rows.map((row) => (
              <Fragment key={row.id}>{children(row)}</Fragment>
            ))
        : children}
    </tbody>
  )
})

export const TableRowsTrack = ({
  children,
}: {
  children?: (row: Row<any>) => ReactElement
}) => {
  const table = useDataTableContext()
  return (
    <Fragment>
      {children instanceof Function
        ? table
            .getRowModel()
            .rows.map((row) => (
              <Fragment key={row.id}>{children(row)}</Fragment>
            ))
        : null}
    </Fragment>
  )
}

export const TableRow = forwardRef<
  HTMLTableRowElement,
  Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> & {
    row?: Row<any>
    children?: ReactElement | ((cell: Cell<any, any>) => ReactElement)
  }
>(function TableRow({ className, row, children, ...props }, ref) {
  return (
    <tr
      ref={ref}
      data-state={row?.getIsSelected() && 'selected'}
      className={cn(
        'group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    >
      {children instanceof Function
        ? row &&
          row
            .getVisibleCells()
            .map((cell) => <Fragment key={cell.id}>{children(cell)}</Fragment>)
        : children}
    </tr>
  )
})

export const TableExpandedRow = forwardRef<
  HTMLTableRowElement,
  Omit<HTMLAttributes<HTMLTableRowElement>, 'children'> & {
    row?: Row<any>
    children?: ReactElement | ((row: Row<any>) => ReactElement)
  }
>(function TableRow({ className, row, children, ...props }, ref) {
  if (!row?.getIsExpanded()) return null
  return (
    <tr
      ref={ref}
      data-state={row?.getIsSelected() && 'selected'}
      className={cn(
        'group border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    >
      <td colSpan={row?.getVisibleCells().length}>
        {children instanceof Function ? row && children(row) : children}
      </td>
    </tr>
  )
})

export const TableCellsTrack = ({
  children,
  row,
}: {
  row?: Row<any>
  children?: (row: Cell<any, any>) => ReactElement
}) => {
  return (
    <Fragment>
      {children instanceof Function
        ? row &&
          row
            .getVisibleCells()
            .map((cell) => <Fragment key={cell.id}>{children(cell)}</Fragment>)
        : null}
    </Fragment>
  )
}

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement> & { cell?: Cell<any, any> }
>(function TableCell({ className, cell, style, ...props }, ref) {
  if (!cell) return null
  const innerStyle = getTableCellStyles(cell.column)
  return (
    <td
      ref={ref}
      style={Object.assign(innerStyle, style)}
      className={cn(
        'p-2 align-middle [&:has([role=checkbox])]:pr-0',
        cell.column.getIsPinned() &&
          'bg-background group-hover:bg-muted/50 group-data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
})

export const TableCellFull = forwardRef<
  HTMLTableCellElement,
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'children'> & {
    children?: ReactNode | ((table: TableType<any>) => ReactNode)
  }
>(function TableCellFull({ className, children, ...props }, ref) {
  const table = useDataTableContext()
  return (
    <td
      ref={ref}
      colSpan={table.getAllLeafColumns().length}
      className={cn('p-4', className)}
      {...props}
    >
      {children instanceof Function ? children(table) : children}
    </td>
  )
})

export function TableRowsEmpty({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof TableCellFull>) {
  const table = useDataTableContext()
  return (
    table.getRowModel().rows.length === 0 && (
      <TableRow>
        <TableCellFull {...props}>
          {children instanceof Function ? children(table) : children}
        </TableCellFull>
      </TableRow>
    )
  )
}

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})

function getTableCellStyles<TData>(column: Column<TData>): CSSProperties {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-3px 0 3px -3px hsl(var(--border)) inset'
      : isFirstRightPinnedColumn
        ? '3px 0 3px -3px hsl(var(--border)) inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    minWidth: column.columnDef.minSize ?? 0,
    maxWidth: column.columnDef.maxSize ?? 'none',
  }
}
