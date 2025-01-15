"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Search,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTablePagination } from "@/components/data-table-pagination";

interface Article {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  status: "published" | "draft" | "archived";
  category: string;
  views: number;
  likes: number;
  publishedDate: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "The Future of AI in Journalism",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "published",
    category: "Technology",
    views: 1500,
    likes: 120,
    publishedDate: "2023-06-01",
  },
  {
    id: "2",
    title: "Climate Change: A Global Crisis",
    author: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "draft",
    category: "Environment",
    views: 0,
    likes: 0,
    publishedDate: "-",
  },
  {
    id: "3",
    title: "The Rise of Remote Work",
    author: {
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "published",
    category: "Business",
    views: 2200,
    likes: 180,
    publishedDate: "2023-05-28",
  },
  // Add more article data as needed
];

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.original.author.avatar}
              alt={row.original.author.name}
            />
            <AvatarFallback>
              {row.original.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="font-medium">{row.getValue("title")}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.author.name}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "published"
              ? "default"
              : status === "draft"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const views = parseInt(row.getValue("views"));
      return (
        <div className="flex items-center">
          <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
          {views.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const likes = parseInt(row.getValue("likes"));
      return (
        <div className="flex items-center">
          <ThumbsUp className="mr-2 h-4 w-4 text-muted-foreground" />
          {likes.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "publishedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const article = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(article.id)}
            >
              Copy article ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View article</DropdownMenuItem>
            <DropdownMenuItem>Edit article</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ArticlesPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: articles,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button className="mt-2 sm:mt-0">Add Article</Button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter articles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        header.id === "likes" ||
                        header.id === "status" ||
                        header.id === "category" ||
                        header.id === "views" ||
                        header.id === "publishedDate"
                          ? "hidden md:table-cell"
                          : ""
                      } px-2 py-1 sm:px-4 sm:py-2`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.id === "likes" ||
                        cell.column.id === "status" ||
                        cell.column.id === "category" ||
                        cell.column.id === "views" ||
                        cell.column.id === "publishedDate"
                          ? "hidden md:table-cell"
                          : ""
                      } px-2 py-1 sm:px-4 sm:py-2`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
