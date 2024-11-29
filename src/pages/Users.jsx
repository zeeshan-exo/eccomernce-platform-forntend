import React, { useState, useEffect } from "react";

function Customer() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const HandleSubmit = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setUser(data.data);
        } else {
          console.error("Expected an array of users, but got:", data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    HandleSubmit();
  }, []);

  return (
    <div>
      <div>
        <table className="table-auto w-full border-separate border-spacing-4">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <UserUpdate
                        handlerUpdate={() => navigate(`update/${user._id}`)}
                      />
                      <UserDelete
                        handlerDeletion={() => handlerDeletion(user._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customer;
