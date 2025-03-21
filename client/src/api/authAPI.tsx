import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), 
    });

    
    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      
      
      const token = data.token;
      localStorage.setItem("authToken", token); 
      
      
      window.location.href = "/home"; 

      return data; 
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
      return null; 
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};

export { login };

