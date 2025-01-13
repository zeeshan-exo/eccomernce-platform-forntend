import React, { useState } from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Drawer,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../features/auth/UserSlice";
import UserForm from "./UserForm";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { data, isLoading, isError, error } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [deleteUser] = useDeleteUserMutation();

  const handleOpenDrawer = (update = false, userId = null) => {
    setIsUpdate(update);
    setSelectedUserId(userId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUserId(null);
  };

  const handleDeletion = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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

  if (isError || !data) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error">
          Error loading users: {error?.message || "Unknown error"}
        </Typography>
      </Box>
    );
  }

  const { pagination, data: users } = data;

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDrawer(false)}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "gray" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDrawer(true, user._id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeletion(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={pagination.totalPages}
          page={pagination.currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <Box p={2} width={400}>
          <UserForm
            isUpdate={isUpdate}
            userId={selectedUserId}
            onClose={handleCloseDrawer}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

export default Users;
