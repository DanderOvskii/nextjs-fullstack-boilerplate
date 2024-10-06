import { clearUser, setUser } from "@/utils/sessionStorage";
import { FormData } from "@/utils/types";

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    const { redirectUrl, user } = data;

    // Store the user data in session storage
    setUser(user);

    // Redirect to the specified URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function signUpUser(formData: FormData) {
  try {
    const response = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Sign-up failed");
    }

    const data = await response.json();
    const { redirectUrl, user } = data;

    // Store the user data in session storage
    setUser(user);

    // Redirect to the specified URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch("/api/v1/auth/logout", {
      method: "POST",
    });

    if (response.redirected) {
      clearUser();
      window.location.href = response.url;
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
