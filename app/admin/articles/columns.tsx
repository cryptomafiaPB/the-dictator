import { ArrowUpDown, Eye, MoreHorizontal, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import { ColumnDef } from "@tanstack/react-table";
import { Article } from "@/types/index";
// ...existing imports...

const columns: ColumnDef<Article>[] = [
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

export default columns;
