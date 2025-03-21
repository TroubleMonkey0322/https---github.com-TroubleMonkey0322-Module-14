import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token); 
    }
    return null;
  }

  
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }

  
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token); 
      if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000); 
        return decoded.exp < currentTime; 
      }
      return false; 
    } catch (e) {
      return true; 
    }
  }

  
  getToken(): string | null {
    return localStorage.getItem('authToken'); 
  }

  
  login(idToken: string) {
    localStorage.setItem('authToken', idToken); 
    window.location.href = '/home'; 
  }

  
  logout() {
    localStorage.removeItem('authToken'); 
    window.location.href = '/login'; 
  }
}

export default new AuthService();

