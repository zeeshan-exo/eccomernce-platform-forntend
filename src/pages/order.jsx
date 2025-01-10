import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../features/auth/OrderSlice";
import OrderDelete from "../components/OrderDelete";
import OrderUpdate from "../components/OrderUpdate";
import ReusableTable from "../components/Table";
import OrderForm from "./OrderForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Box,
  IconButton,
  Drawer,
  Typography,
  CircularProgress,
  Pagination,
  Paper,
  Grid,
} from "@mui/material";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery({ page: currentPage, limit: pageSize });

  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleDeletion = async (id) => {
    try {
      console.log(`Deleting order with ID: ${id}`);
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (id) => {
    setSelectedOrderId(id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrderId(null);
  };

  const calculateTotalAmount = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.totalAmount || 0), 0);
  };

  const columns = [
    { label: "User Name", accessor: "userName" },
    { label: "Quantity", accessor: "quantity" },
    { label: "Contact", accessor: "contact" },
    { label: "Address", accessor: "shippingAddress" },
    { label: "Total Amount", accessor: "totalAmount" },
  ];

  const formattedData = ordersData?.data.map((order) => ({
    userName: order.user?.name || "N/A",
    quantity:
      Array.isArray(order.items) && order.items.length > 0
        ? order.items.reduce((acc, item) => acc + item.quantity, 0)
        : "No items",
    contact: order.contact || "N/A",
    shippingAddress: order.shippingAddress || "N/A",
    totalAmount: `$${calculateTotalAmount(order.items).toFixed(2) || "0.00"}`,
    id: order._id,
  }));

  const renderActions = (order) => (
    <Box display="flex" justifyContent="center" gap={1}>
      <IconButton onClick={() => handleEdit(order.id)} color="primary">
        <EditIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => handleDeletion(order.id)}
        disabled={deleting}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (ordersData?.pagination?.hasNextPage) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Error: {error?.data?.message || "Unable to fetch orders"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" color="dark-gray" fontWeight="bold" gutterBottom>
        Orders
      </Typography>

      {ordersData?.data?.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={formattedData}
          renderActions={renderActions}
        />
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No orders available.
        </Typography>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Button
          onClick={handlePreviousPage}
          disabled={!ordersData?.pagination?.hasPreviousPage}
          variant="contained"
          color="primary"
        >
          Previous
        </Button>
        <Typography>
          Page {ordersData?.pagination?.currentPage} of{" "}
          {ordersData?.pagination?.totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={!ordersData?.pagination?.hasNextPage}
          variant="contained"
          color="primary"
        >
          Next
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          width: "400px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "400px",
            boxSizing: "border-box",
          },
        }}
      >
        <OrderForm id={selectedOrderId} onCancel={handleCloseDrawer} />
      </Drawer>
    </Box>
  );
}

export default Orders;
