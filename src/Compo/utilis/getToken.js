import CryptoJS from 'crypto-js';

export const getToken = () => {
    try {
        const encryptedToken = localStorage.getItem('authToken');
        if (encryptedToken) {
          const secretKey = "my-super-secret-key";
            const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
            const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      
            
            return decryptedToken;
        } else {
            console.error('No token found in local storage.');
            return null;
        }
    } catch (error) {
        console.error('Error decrypting token:', error.message);
        return null;
    }
};

