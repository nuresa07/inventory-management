import { UserSetting } from "@/types";
import { GridColDef } from "@mui/x-data-grid";
import { Archive, CircleDollarSign, Clipboard, Layout, SlidersHorizontal, TrendingDown, TrendingUp, User } from "lucide-react";

export const sidebarLinks = [
  { href: '/dashboard', icon: Layout, label: 'Dashboard' },
  { href: '/inventory', icon: Archive, label: 'Inventory' },
  { href: '/products', icon: Clipboard, label: 'Products' },
  { href: '/users', icon: User, label: 'Users' },
  { href: '/settings', icon: SlidersHorizontal, label: 'Settings' },
  { href: '/expenses', icon: CircleDollarSign, label: 'Expenses' },
];

export const statDate = [
  {
    title: "Customer Growth",
    amount: "175.00",
    changePercentage: 131,
    IconComponent: TrendingUp
  },
  {
    title: "Expenses",
    amount: "10.00",
    changePercentage: -56,
    IconComponent: TrendingDown
  }
]

export const statDate2 = [
  {
    title: "Dues",
    amount: "250.00",
    changePercentage: 131,
    IconComponent: TrendingUp
  },
  {
    title: "Pending Orders",
    amount: "147",
    changePercentage: -56,
    IconComponent: TrendingDown
  }
]

export const statDate3 = [
  {
    title: "Sales",
    amount: "1000.00",
    changePercentage: 20,
    IconComponent: TrendingUp
  },
  {
    title: "Discount",
    amount: "200.00",
    changePercentage: -10,
    IconComponent: TrendingDown
  }
]

// Inventory
export const columns: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 90
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`
  },
  {
    field: "rating", headerName: "Rating", width: 110, type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity", headerName: "Stock Quantity", width: 150, type: "number",
  }
]

export const columnsUsers: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 }
]

export const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
]