import { jwtDecode } from "jwt-decode";

// Create a simple simulated JWT token
export const createToken = (username, role) => {
  const header = btoa(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  );

  const payload = btoa(
    JSON.stringify({
      username: username,
      role: role,
      exp: Math.floor(Date.now() / 1000) + 3600,
    })
  );

  const signature = btoa("simulated-signature");

  return `${header}.${payload}.${signature}`;
};

// Save token in localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Decode JWT and get user information
export const getUserFromToken = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const user = jwtDecode(token);

    if (user.exp && user.exp * 1000 < Date.now()) {
      logout();
      return null;
    }

    return user;
  } catch (error) {
    console.error("Invalid token:", error);
    logout();
    return null;
  }
};

// Remove token during logout
export const logout = () => {
  localStorage.removeItem("token");
};
export const permissions = {
  admin: ["create", "edit", "delete", "read"],
  editor: ["create", "edit", "read"],
  viewer: ["read"],
};

export const hasPermission = (role, permission) => {
  return permissions[role]?.includes(permission);
};