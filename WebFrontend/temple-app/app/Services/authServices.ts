// import axios from 'axios';
// import { AxiosError } from 'axios';
// import { setToken } from '../Redux/slices/authSlice'
// import { AppDispatch } from "@/app/Redux/store"; // Adjust the path to your store
// import { showErrorToast } from '../components/Utils/toastUtils';



// const baseURL = process.env.NEXT_PUBLIC_API_URL;
// console.log(baseURL);


// export interface UserType {
//     username: string;
//     password: string;
//     email: string;
//     phone_number: string;
//     role_ids: [string];
// }

// export interface UserFormType {
//   username: string;
//     password: string;
//     email: string;
//     phone_number: string;
//     role_ids: [string];
// }

// export enum Gender {
//   Male = 'M',
//   Female = 'F',
//   Other = 'O',
// }


// interface LoginFormState {
//   email: string;
//   password: string;
// }



// const fetchUsers = async () => {

//   try {
//     const response = await axios.get(`${baseURL}/users/`);
//     return response.data.data;
//   } catch (error: unknown) {
//     // Type guard to check if error is an instance of Error
//     if (error instanceof Error) {
//       throw new Error('Error fetching users: ' + error.message);
//     } else {
//       throw new Error('Error fetching users: An unknown error occurred.');
//     }
//   }
// };

// const addUser = async (userData: UserFormType) => {
//   try {
//     const response = await axios.post(`${baseURL}/users/create/`, userData);
//     return response.data;
//   } catch (error: unknown) {
//     // Type guard to check if error is an instance of Error
//     if (error instanceof Error) {
//       throw new Error('Error fetching users: ' + error.message);
//     } else {
//       throw new Error('Error fetching users: An unknown error occurred.');
//     }
//   }
// };

// const signupUser = async (userData: UserFormType) => {
//   try {
//     const response = await axios.post(baseURL+`/register/`, userData);
//     console.log(response.data);
    
//     return response.data;
//   }catch (error: unknown) {
//     // Type guard to check if error is an instance of Error
//     if (error instanceof AxiosError) {
//       throw new Error(error.response?.data.message);
//     } else {
//       throw new Error('Error fetching users: An unknown error occurred.');
//     }
//   }
// };

// const updateUser = async (userId: number, userData: UserFormType) => {
//   try {
//     const response = await axios.put(`${baseURL}/${userId}`, userData);
//     return response.data;
//   } catch (error: unknown) {
//     // Type guard to check if error is an instance of Error
//     if (error instanceof AxiosError) {
//       throw new Error(error.response?.data.message);
//     } else {
//       throw new Error('Error fetching users: An unknown error occurred.');
//     }
//   }
// };

// const deleteUser = async (userId: number) => {
//   try {
//     const response = await axios.delete(`${baseURL}/${userId}`);
//     return response.data;
//   } catch (error: unknown) {
//     // Type guard to check if error is an instance of Error
//     if (error instanceof AxiosError) {
//       throw new Error(error.response?.data.message);
//     } else {
//       throw new Error('Error fetching users: An unknown error occurred.');
//     }
//   }
// };

// const SignIn = async (formData: LoginFormState, dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post(`${baseURL}/login/`, formData);

//     console.log("API Response:", response);

//     // Decode the token
//     const token = response.data.access;
//     const [, payload] = token.split(".");
//     const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

//     // Extract user details
//     const { email, roles, user_id, exp } = decodedPayload;

//     // Check token expiration
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (exp < currentTime) {
//       throw new Error("Token has expired");
//     }
//     if (!roles) return showErrorToast("Role is missing.");

//     // Dispatch decoded data and token to Redux
//     dispatch(
//       setToken({
//         token,
//         email,
//         roles,
//         user_id,
//       })
//     );

//     console.log("Decoded data saved to Redux");

//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios Error:", error.response?.data?.message || error.message);
//       throw new Error(error.response?.data?.message || "An error occurred while logging in.");
//     } else {
//       console.error("Unexpected Error:", error);
//       throw new Error("An unexpected error occurred.");
//     }
//   }
// };


// export { fetchUsers, signupUser, addUser, updateUser, deleteUser , SignIn };

import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export interface UserType {
    username: string;
    password: string;
    email: string;
    phone_number: string;
    role_ids: [string];
}

export interface UserFormType {
  username: string;
    password: string;
    email: string;
    phone_number: string;
    role_ids: [string];
}

export enum Gender {
  Male = 'M',
  Female = 'F',
  Other = 'O',
}

interface LoginFormState {
  email: string;
  password: string;
}

const fetchUsers = async () => {

  try {
    const response = await axios.get(`${baseURL}/users/`);
    return response.data.data;
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      throw new Error('Error fetching users: ' + error.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred.');
    }
  }
};

const addUser = async (userData: UserFormType) => {
  try {
    const response = await axios.post(`${baseURL}/users/create/`, userData);
    return response.data;
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      throw new Error('Error fetching users: ' + error.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred.');
    }
  }
};

const signupUser = async (userData: UserFormType) => {
  try {
    const response = await axios.post(baseURL+`/register/`, userData);
    console.log(response.data);
    
    return response.data;
  }catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred.');
    }
  }
};

const updateUser = async (userId: number, userData: UserFormType) => {
  try {
    const response = await axios.put(`${baseURL}/${userId}`, userData);
    return response.data;
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred.');
    }
  }
};

const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${baseURL}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Error fetching users: An unknown error occurred.');
    }
  }
};

const SignIn = async (formData: LoginFormState) => {
  try {
    const response = await axios.post(`${baseURL}/login/`, formData);
    const token = response.data.access;

    // Decode JWT
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const { email, roles, user_id, exp } = decodedPayload;

    const currentTime = Math.floor(Date.now() / 1000);
    if (exp < currentTime) {
      throw new Error('Token has expired');
    }

    if (!roles) throw new Error('Role is missing.');
    

    // Store in sessionStorage (or localStorage)
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userData', JSON.stringify({ email, roles, user_id }));

    return { email, roles, user_id };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed.');
    }
    throw new Error('An unexpected error occurred.');
  }
};

export { SignIn,signupUser};
