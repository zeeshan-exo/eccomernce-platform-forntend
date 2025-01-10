import React, { useState } from "react";
import ProductUpdate from "../components/ProductUpdate";
import ProductDelete from "../components/ProductDelete";
import ReusableTable from "../components/Table";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../features/auth/ProductSlice";
import ProductForm from "./ProductForm";
import {
  Button,
  Box,
  IconButton,
  Drawer,
  Typography,
  CircularProgress,
  Pagination,
  Paper,
} from "@mui/material";

function Product() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useGetAllProductsQuery({ page, limit });

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingProductId, setDeletingProductId] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenDrawer = (update = false, productId = null) => {
    setIsUpdate(update);
    setSelectedProductId(productId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProductId(null);
  };

  const handleDeletion = async (id) => {
    if (!id) return;
    setDeletingProductId(id);
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingProductId(null);
    }
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Brand", accessor: "company" },
    { label: "Category", accessor: "category.name" },
    { label: "SubCategory", accessor: "subCategory.name" },
    { label: "Price", accessor: "price" },
    { label: "Description", accessor: "details" },
  ];

  const renderActions = (product) => (
    <Box display="flex" gap={2} justifyContent="center">
      <IconButton
        onClick={() => handleOpenDrawer(true, product._id)}
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={() => handleDeletion(product._id)}
        color="error"
        disabled={deletingProductId === product._id}
      >
        {deletingProductId === product._id ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <DeleteIcon />
        )}
      </IconButton>
    </Box>
  );

  const handleNextPage = () => {
    if (data?.pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.pagination?.hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error)
    return (
      <Typography variant="body1" color="error" textAlign="center" mt={10}>
        Error loading products
      </Typography>
    );

  return (
    <Box container sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDrawer(false)}
        >
          Add Product
        </Button>
      </Box>

      <Paper>
        <ReusableTable
          columns={columns}
          data={data?.data || []}
          renderActions={renderActions}
        />
      </Paper>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={6}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handlePreviousPage}
          disabled={!data?.pagination?.hasPreviousPage}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleNextPage}
          disabled={!data?.pagination?.hasNextPage}
        >
          Next
        </Button>
      </Box>

      <Drawer open={isDrawerOpen} onClose={handleCloseDrawer} anchor="right">
        <Box width={400}>
          <ProductForm
            isUpdate={isUpdate}
            id={selectedProductId}
            onClose={handleCloseDrawer}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Product;
