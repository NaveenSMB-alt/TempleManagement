
"use client";

 import { useEffect, useState } from "react";
import {
  Box, Button, Container, FormControl, TextField,
  Paper, Typography, Link,MenuItem,Select,InputLabel
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import axios from "axios";
// import Cookies from 'js-cookie';
import { showToast, showErrorToast, showPromiseToast } from "../Utils/toastUtils";
import { signupUser } from '../../Services/authServices';
import { SelectChangeEvent } from '@mui/material';

const APP_URL = process.env.NEXT_PUBLIC_API_URL;

interface Role {
    id:string;
    name:string;
}


interface SignupForm {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  role: string;
  dateOfBirth: string;
  phoneNumber: string;
  city: string;
  role_ids: string
  
}


export default function Signup() {

  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    role: "user",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
    role_ids: "",
  });
  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const router = useRouter();
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        fetchRoles();
    }, []);


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


    const fetchRoles = async () => {

            try {
               const response = await axios.get(APP_URL + '/roles/');

                setRoles(response.data.results);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                showToast("error", error.message);  
                } else {
                showToast("error","An unknown error occurred");
                }
            }
            };
            


        const handleInputChangeDrop = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { value } = event.target;
        setFormData({
            ...formData,
            role_ids: value,
        });
    };

  // Validate form inputs

// const validateInputs = () => {
//   let newErrors: Partial<SignupForm> = {};
//   let isValid = true;

//   // Validate Name
//   if (!formData.name.trim()) {
//     newErrors.name = "Name is required.";
//     showErrorToast("Name is required."); // Show error toast
//     isValid = false;
//   }

//   // Validate Email
//   if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//     newErrors.email = "Please enter a valid email address.";
//     showErrorToast("Please enter a valid email address."); // Show error toast
//     isValid = false;
//   }

//   // Validate Password
//   if (!formData.password || formData.password.length < 6) {
//     newErrors.password = "Password must be at least 6 characters long.";
//     showErrorToast("Password must be at least 6 characters long."); // Show error toast
//     isValid = false;
//   }

//   // Validate Confirm Password
//   if (formData.confirm_password !== formData.password) {
//     newErrors.confirm_password = "Passwords do not match.";
//     showErrorToast("Passwords do not match."); // Show error toast
//     isValid = false;
//   }



//   // Validate Phone Number
//   if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
//     newErrors.phoneNumber = "Enter a valid 10-digit mobile number.";
//     showErrorToast("Enter a valid 10-digit mobile number."); // Show error toast
//     isValid = false;
//   }

//   setErrors(newErrors);
//   return isValid;
// };


   const validatePassword = (password: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!formData.name.trim()) {
            return "Name is required.";
            }

         if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
             return "Please enter a valid email address.";
        }

         if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            return "Enter a valid 10-digit mobile number.";
        }

        if (!password){
             return "Password must be required";
        }

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must contain at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }
        if (formData.confirm_password !== formData.password) {
            return "Passwords do not match.";
        }
         if (!formData.role_ids) {
            return "Role must be required";
        }


        return ""; // Return empty string if password is valid
    };



 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Validate password

   const passwordError = validatePassword(formData.password);
        if (passwordError) {
            console.log(setErrors);
            
            showErrorToast(passwordError);
            return;
        }

  try {
    // Show loading toast during the signup process
    const promise = signupUser({
      username: formData.name,
      email: formData.email,
      phone_number: formData.phoneNumber,
      role_ids: [formData.role_ids],
      password: formData.password
    });

    await showPromiseToast(promise, {
      loading: "Signing you up...",
      success: "Signup successful!",
      error: "Signup failed. Please try again."
    });

    router.push("/login"); 
  } catch (error: unknown) {
    showErrorToast(error); 
  }
};


//   const handleOtpSubmit = async () => {
//     setLoading(true);
//     try {
//       const storedData = Cookies.get("signupData");
//       if (storedData) {
//         const userDetails = JSON.parse(storedData);
//         await axios.post(`${APP_URL}/api/sign_up/otp`, userDetails);
//         Cookies.remove("signupData");
//         Cookies.set("email", userDetails.email, { expires: 7 });
//         Cookies.set("name", userDetails.name, { expires: 7 });
//         Cookies.set("role", userDetails.role, { expires: 7 });
//         Cookies.set("phoneNumber", userDetails.phoneNumber, { expires: 7 });
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       setServerError(error.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={6}>
          <img
            src="\images\signup.jpg"
            alt="Login"
            style={{ width: "100%", 
                     height: "auto",
                     maxHeight: "900px", // limit height on larger screens
                     objectFit: "cover",
                     borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
            <Typography variant="h4" mb={2}>Sign Up</Typography>
            {/* <Typography variant="h6" mb={2}>Create an Account</Typography> */}
            <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Name" fullWidth  name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email Address" fullWidth  name="email" value={formData.email} onChange={handleChange} error={!!errors.email}   helperText={errors.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Password" type="password" fullWidth name="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Confirm Password" type="password" fullWidth  name="confirm_password"  value={formData.confirm_password} onChange={handleChange} error={!!errors.confirm_password}  helperText={errors.confirm_password} />
                </Grid>
                <Grid item xs={12} >
                  <TextField label="Phone Number" name="phoneNumber" fullWidth value={formData.phoneNumber} onChange={handleChange} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                </Grid>
               <Grid item xs={12}>
                <FormControl fullWidth margin="normal" size="medium" variant="outlined">
                    <InputLabel>Role</InputLabel>
                    <Select
                    name="role_ids"
                    value={formData.role_ids}
                    onChange={handleInputChangeDrop}
                    label="Role"
                    >
                    {roles
                        .filter((role) => role.name.toLowerCase() !== 'admin')
                        .map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, color: "white", fontWeight: "bold", marginBottom: 2 }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
              Already have an account? <Link href="/login" variant="body2">Login</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField label="6-digit OTP" fullWidth value={otp} onChange={(e) => setOtp(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleOtpSubmit} disabled={loading}>{loading ? "Verifying..." : "Verify"}</Button>
        </DialogActions>
      </Dialog> */}
    </Container>

  );

}


// import { useEffect, useState } from "react";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Button from "@mui/material/Button";
// import { Box, InputLabel, MenuItem,Tooltip, Select, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import Image from "next/image";
// import OpenEyeIcon from "../../../public/images/openEyeIcon.svg";
// import EyeOff from "../../../public/images/Eye-Off.svg";
// import { signupUser } from '../../Services/authServices';
// import { useRouter } from 'next/navigation';
// import axios from "axios";
// import { Snackbar, Alert } from '@mui/material'; // Importing Snackbar and Alert from Material-UI
// import ReCAPTCHA from "react-google-recaptcha"; // Importing reCAPTCHA
// import { SelectChangeEvent } from '@mui/material';



// const APP_URL = process.env.NEXT_PUBLIC_API_URL;
// const RECAPTCHA_SITE_KEY = "6Lc9ZRAqAAAAAAYwjMAJJD_QQ8JTw__Sciz8Cj-v"

// interface Role {
//     id:string;
//     name:string;
// }

// const SignUpForm = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//         email: "",
//         phone_number: "",
//         role_ids: "",
//     });
//     const [errorMessage, setErrorMessage] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [roles, setRoles] = useState<Role[]>([]);
//     const [otp, setOtp] = useState("");
//     const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
//     const router = useRouter();
//     const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
//     const [snackbarMessage, setSnackbarMessage] = useState(""); // State to hold the message for Snackbar
//     const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success"); // State for the severity (color)
//     const [recaptchaToken, setRecaptchaToken] = useState(""); // reCAPTCHA token state
//     const [captchaError, setCaptchaError] = useState(""); // Error state for reCAPTCHA
//     const [passwordFocused, setPasswordFocused] = useState(false);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disable
//     const [timer, setTimer] = useState(120); // Timer in seconds
    

    
    // Fetching roles
    // const fetchRoles = async () => {
    //     try {
    //         const response = await axios.get(APP_URL + '/roles/');
    //         setRoles(response.data.results);
    //     } catch (error: unknown) {
    //         if (axios.isAxiosError(error)) {
    //           // Now TypeScript knows that error is of type AxiosError
    //           setErrorMessage(error.message);
    //         } else {
    //           setErrorMessage('An unknown error occurred');
    //         }
    //       }
    // };

//       useEffect(() => {
//             if (isOtpDialogOpen) {
//                 // Set an interval to update the timer every second
//                 const interval = setInterval(() => {
//                     setTimer((prevTime) => {
//                         if (prevTime <= 1) {
//                             clearInterval(interval);
//                             setIsButtonDisabled(true); // Disable the button after 120 seconds
//                             return 0;
//                         }
//                         return prevTime - 1;
//                     });
//                 }, 1000); // Update every second
    
//                 return () => clearInterval(interval); // Cleanup the interval on component unmount or dialog close
//             }
//         }, [isOtpDialogOpen]);



//     useEffect(() => {
//         fetchRoles();
//     }, []);

//     const onCaptchaChange = (token: string | null) => {
//         if (token) {
//             setRecaptchaToken(token);
//             setCaptchaError("");
//         } else {
//             setRecaptchaToken("");
//         }
//     };


//     // Handling input change
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleInputChangeDrop = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
//         const { value } = event.target;
//         setFormData({
//             ...formData,
//             role_ids: value,
//         });
//     };
    

//     // Toggling password visibility
//     const handlePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     // Password validation function
    // const validatePassword = (password: string) => {
    //     const minLength = 8;
    //     const hasUpperCase = /[A-Z]/.test(password);
    //     const hasLowerCase = /[a-z]/.test(password);
    //     const hasNumber = /\d/.test(password);
    //     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    //     if (password.length < minLength) {
    //         return "Password must be at least 8 characters long.";
    //     }
    //     if (!hasUpperCase) {
    //         return "Password must contain at least one uppercase letter.";
    //     }
    //     if (!hasLowerCase) {
    //         return "Password must contain at least one lowercase letter.";
    //     }
    //     if (!hasNumber) {
    //         return "Password must contain at least one number.";
    //     }
    //     if (!hasSpecialChar) {
    //         return "Password must contain at least one special character.";
    //     }

    //     return ""; // Return empty string if password is valid
    // };

//     // Handle form submission for signup
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
    //     e.preventDefault();

    //     // Validate password
        // const passwordError = validatePassword(formData.password);
        // if (passwordError) {
        //     setErrorMessage(passwordError);
        //     return;
        // }

    //     try {
    //         const response = await signupUser({
    //             username: formData.username,
    //             email: formData.email,
    //             phone_number: formData.phone_number,
    //             role_ids: [formData.role_ids],
    //             password: formData.password
    //         });
            
    //         setSnackbarMessage(response.message);
    //         setSnackbarSeverity("success");
    //         setOpenSnackbar(true);
    //         setIsOtpDialogOpen(true);
    //         setTimer(120); 
    //         setIsButtonDisabled(false);
    //     } catch (error: unknown) {
    //         if (axios.isAxiosError(error)) {
    //           // Now TypeScript knows that error is of type AxiosError
    //           setErrorMessage(error.message);
    //         } else {
    //           setErrorMessage('An unknown error occurred');
    //         }
    //       }
    // };

//     // Handle OTP submission
//     const handleOtpSubmit = async () => {
//         try {
//             const response = await axios.post(APP_URL + '/verify-otp/', {
//                 username: formData.username,
//                 email: formData.email,
//                 phone_number: formData.phone_number,
//                 role_ids: [formData.role_ids],
//                 password: formData.password,
//                 otp: otp 
//             });

//             if (response.status === 201) {
//                 setIsOtpDialogOpen(false);
//                 setSnackbarMessage("User successfully signed up!");
//                 setSnackbarSeverity("success");
//                 setOpenSnackbar(true);
//                 setTimeout(() => {
//                     router.push('/Login');
//                 }, 3000);
//             } else {
//                 setErrorMessage(response.data.message || "OTP verification failed.");
//             }
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//               // Now TypeScript knows that error is of type AxiosError
//               setErrorMessage(error.response?.data.message || "OTP verification failed.");
//             } else {
//               setErrorMessage('An unknown error occurred');
//             }
//           }
//     };

//     const handleCloseOtpDialog = () => {
//         setIsOtpDialogOpen(false);
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     const labelStyle = {
//         fontSize: "12px",
//         paddingBottom: "8px",
//     };

//     const fileInpShadow = {
//         height: "30px",
//         "& img": {
//             width: "16px",
//             cursor: "pointer",
//         },
//     };

//     const heading = {
//         textAlign: "center",
//         paddingBottom: "20px",
//         fontWeight: "bold",
//     };


//       const handlePasswordFocus = () => {
//         setPasswordFocused(true);
//       };
    
//       const handlePasswordBlur = () => {
//         setPasswordFocused(false);
//       };

    

//     return (
//         <div>
//             {/* Snackbar for success/error messages */}
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>

//             {errorMessage && (
//           <Alert severity="error" sx={{ marginBottom: '16px' }}>
//             {errorMessage}
//           </Alert>
//         )}
            
//             <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                 <Image
//                     src='/images/logo.png'
//                     width={100}
//                     height={100}
//                     alt="Picture of the author"
//                 />
//             </Box>
            
//             <Typography variant="h5" sx={heading}>
//                 Create Your Account
//             </Typography>

//             <form onSubmit={handleSubmit} id="signup-form">
//                 <FormControl fullWidth sx={{ pb: 2 }}>
//                     <Typography sx={labelStyle}>Email address</Typography>
//                     <OutlinedInput
//                         type="email"
//                         placeholder="Email address"
//                         sx={fileInpShadow}
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         autoComplete="off"
//                     />
//                 </FormControl>

//                 <FormControl fullWidth sx={{ pb: 2 }}>
//       <Typography sx={labelStyle}>Create a Password</Typography>

//       {/* Tooltip that shows password requirements */}
//       <Tooltip
//         title="Password must be at least 8 characters long, contain an uppercase, a lowercase, a number, and a special character."
//         open={passwordFocused} // Show when password input is focused
//         placement="right" // Positioning of the tooltip
//         arrow
//       >
//         <OutlinedInput
//           sx={fileInpShadow}
//           type={showPassword ? "text" : "password"}
//           name="password"
//           placeholder="Create a Password"
//           value={formData.password}
//           onChange={handleInputChange}
//           onFocus={handlePasswordFocus} // Show tooltip when focused
//           onBlur={handlePasswordBlur} // Hide tooltip when focus is lost
//           autoComplete="off"
//           endAdornment={
//             <Image
//                 src={showPassword ? OpenEyeIcon : EyeOff}
//                 alt="Toggle Password Visibility"
//                 onClick={handlePasswordVisibility}
//             />
//         }
//         />
//       </Tooltip>

//     </FormControl>

//                 <FormControl fullWidth sx={{ pb: 1 }}>
//                     <Typography sx={labelStyle}>User Name</Typography>
//                     <OutlinedInput
//                         type="text"
//                         placeholder="User Name"
//                         sx={fileInpShadow}
//                         name="username"
//                         value={formData.username}
//                         onChange={handleInputChange}
//                     />
//                 </FormControl>

//                 <FormControl fullWidth margin="normal" sx={{ pb: 1 }} size="small" variant="outlined">
//                     <InputLabel>Role</InputLabel>
//                     <Select
//                         name="role_ids"
//                         value={formData.role_ids}
//                         onChange={handleInputChangeDrop}
//                         label="Role"
//                     >
//                         {roles
//                             .filter((role) => role.name.toLowerCase() !== 'admin')
//                             .map((role) => (
//                                 <MenuItem key={role.id} value={role.id}>
//                                     {role.name}
//                                 </MenuItem>
//                             ))}
//                     </Select>
//                 </FormControl>
//                 <FormControl fullWidth sx={{ pb: 2 }}>
//                     <Typography sx={labelStyle}>Phone Number</Typography>
//                     <OutlinedInput
//                         type="text"
//                         placeholder="Phone Number"
//                         sx={fileInpShadow}
//                         name="phone_number"
//                         value={formData.phone_number}
//                         onChange={handleInputChange}
//                     />
//                 </FormControl>

//                 <Box sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}>
//                     {/* reCAPTCHA box */}
//                     <div
//                         className="g-recaptcha"
//                         style={{ transform: "scale(1.0)", transformOrigin: "0 0" }} // Adjust the scale here
//                     >
//                         <ReCAPTCHA
//                         sitekey={RECAPTCHA_SITE_KEY} // Your reCAPTCHA site key
//                         onChange={onCaptchaChange}
//                         />
//                     </div>

//                     {/* Display error message if CAPTCHA not completed */}
//                     {captchaError && (
//                         <Typography color="error" sx={{ mt: 1 }}>
//                         {captchaError}
//                         </Typography>
//                     )}
//                     </Box>

//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Button variant="contained" type="submit" fullWidth sx={{ mr: 2 }}  disabled={!recaptchaToken}> 
//                         Sign Up
//                     </Button>
//                 </Box>
//             </form>

//             {/* OTP Dialog */}
           
//         </div>
//     );
// };

// export default SignUpForm;
