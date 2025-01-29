const TOKEN = 'token';
const USER = 'user';

const UserStorageService = {
  saveToken: (token) => {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  },

  saveUser: (user) => {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  },

  getToken: () => {
    return localStorage.getItem(TOKEN);
  },

  getUser: () => {
    try {
      const user = localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  },

  getUserId: () => {
    const user = UserStorageService.getUser();
    return user ? user.id : '';
  },

  getUserRole: () => {
    const user = UserStorageService.getUser();
    return user ? user.role : '';
  },

  isAdminLoggedIn: () => {
    if (!UserStorageService.getToken()) {
      return false;
    }
    const role = UserStorageService.getUserRole();
    return role === 'ADMIN';
  },

  isCustomerLoggedIn: () => {
    if (!UserStorageService.getToken()) {
      return false;
    }
    const role = UserStorageService.getUserRole();
    return role === 'CUSTOMER';
  },

  signOut: () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  },
};

export default UserStorageService;
