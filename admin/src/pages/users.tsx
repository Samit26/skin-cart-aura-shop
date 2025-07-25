import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { Users, Search, Eye, Mail, Phone, Calendar, User } from "lucide-react";

interface ClerkUser {
  id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  emailAddresses: Array<{
    emailAddress: string;
    verification?: {
      status: string;
    };
  }>;
  phoneNumbers?: Array<{
    phoneNumber: string;
    verification?: {
      status: string;
    };
  }>;
  publicMetadata?: {
    role?: string;
  };
  privateMetadata?: any;
  unsafeMetadata?: any;
  createdAt: number;
  updatedAt: number;
  imageUrl?: string;
}

const UsersPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<ClerkUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  useEffect(() => {
    if (isAuthenticated) {
      fetchClerkUsers();
    }
  }, [isAuthenticated]);

  const fetchClerkUsers = async () => {
    try {
      const response = await fetch("/api/clerk-users");

      if (response.ok) {
        const users = await response.json();
        setUsers(Array.isArray(users) ? users : []);
      } else {
        console.error("Failed to fetch users from Clerk:", response.status);
        // Fallback: create a mock user list if Clerk API is not available
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching Clerk users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch("/api/clerk-users/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: newRole,
        }),
      });

      if (response.ok) {
        // Update the local state
        setUsers(
          users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  publicMetadata: {
                    ...user.publicMetadata,
                    role: newRole,
                  },
                }
              : user
          )
        );
        alert("User role updated successfully!");
      } else {
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Error updating user role.");
    }
  };

  const getUserDisplayName = (user: ClerkUser) => {
    return (
      user.fullName ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Unknown User"
    );
  };

  const getUserEmail = (user: ClerkUser) => {
    return user.emailAddresses?.[0]?.emailAddress || "No email";
  };

  const getUserPhone = (user: ClerkUser) => {
    return user.phoneNumbers?.[0]?.phoneNumber || null;
  };

  const getUserRole = (user: ClerkUser) => {
    return user.publicMetadata?.role || "user";
  };

  const isEmailVerified = (user: ClerkUser) => {
    return user.emailAddresses?.[0]?.verification?.status === "verified";
  };

  const isPhoneVerified = (user: ClerkUser) => {
    return user.phoneNumbers?.[0]?.verification?.status === "verified";
  };

  const filteredUsers = users
    .filter((user) => {
      const name = getUserDisplayName(user).toLowerCase();
      const email = getUserEmail(user).toLowerCase();
      const phone = getUserPhone(user) || "";
      const search = searchTerm.toLowerCase();

      return (
        name.includes(search) ||
        email.includes(search) ||
        phone.includes(search)
      );
    })
    .filter((user) => {
      if (filterRole === "all") return true;
      return getUserRole(user) === filterRole;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return getUserDisplayName(a).localeCompare(getUserDisplayName(b));
        case "email":
          return getUserEmail(a).localeCompare(getUserEmail(b));
        case "created":
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Users
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage customer accounts and permissions
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="created">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="email">Sort by Email</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-5 w-5 mr-2" />
              {filteredUsers.length} users found
            </div>
          </div>
        </div>

        {/* Users List */}
        {filteredUsers.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.imageUrl ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.imageUrl}
                                alt={getUserDisplayName(user)}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getUserDisplayName(user)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {getUserEmail(user)}
                        </div>
                        {getUserPhone(user) && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {getUserPhone(user)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={getUserRole(user)}
                          onChange={(e) =>
                            updateUserRole(user.id, e.target.value)
                          }
                          className={`text-sm rounded-full px-3 py-1 font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            getUserRole(user) === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              isEmailVerified(user)
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            Email{" "}
                            {isEmailVerified(user) ? "Verified" : "Unverified"}
                          </span>
                          {getUserPhone(user) && (
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                isPhoneVerified(user)
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              Phone{" "}
                              {isPhoneVerified(user)
                                ? "Verified"
                                : "Unverified"}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() =>
                            alert(
                              `Viewing user details for ${getUserDisplayName(
                                user
                              )}`
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterRole !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Users will appear here when they register on your site."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UsersPage;
