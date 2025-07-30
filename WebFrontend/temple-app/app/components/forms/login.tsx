// 'use client';
// import React, { useState,useEffect } from 'react';
// import {
//   Box, Button, Container, FormControl, TextField, 
//   Paper, Typography, Link
// } from "@mui/material";
// import { Grid } from "@mui/material";

// import { SignIn } from '@/app/Services/authServices';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { useSelector } from "react-redux";
// import { RootState } from '@/app/Redux/store';
// import { toast } from 'react-hot-toast';

// interface LoginFormState {
//   email: string;
//   password: string;
//   errorMessage: string | null;
//   loading: boolean;
// }

// const LoginForm = () => {
//   const [email, setEmail] = useState<LoginFormState['email']>('');
//   const [password, setPassword] = useState<LoginFormState['password']>('');
//   const [loading, setLoading] = useState<LoginFormState['loading']>(false);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const role = useSelector((state:RootState) => state.auth?.roles || []);
  


//   useEffect(() => {
    
//     if (role) {
//       if (role === "Admin") {
//         router.push("/Admin");
//       }else {
//         router.push("/User");
//       }
//     }
//   }, [role, router]);

  

//   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true); 
//     try {
//       const formData = {
//         email,
//         password
//       };
//       await toast.promise(
//         SignIn(formData, dispatch),  // The promise to track
//         {
//           loading: "Signing in...", // While the request is in progress
//           success: "Login successful!", // If the request succeeds
//           error: (err) => err.message || "Login failed!", // If the request fails
//         },
//         {
//           style: {
//             fontSize: "18px",  // Increase font size
//             padding: "20px",   // Increase padding
//             width: "400px",    // Increase width
//           },
//         }
//       )

//     } catch (error: unknown) {
//       if (error instanceof Error) { // Check if error is an instance of Error
//         if (error.message === "User is inactive") {
//           router.push("/Userstatus");
//         }
//       } else {
//         console.log(error); // You can still log the unknown error for debugging
//       }
//     } finally {
//       setLoading(false);
//     }
    
//   };


//   // const forgetPasswordText = () => ({
//   //   textAlign: "center",
//   //   marginTop: "20px",
//   //   textDecoration: "none",
//   //   cursor: "pointer",
//   //   fontSize: "14px",
//   //   "& a": {
//   //     fontWeight: "bold",
//   //   }
//   // });
//   // const loginRef = () => ({
//   //   fontSize: "14px",
//   //   marginTop: "10px",
//   //   textAlign: "center",
//   //   "& span": {
//   //     fontWeight: "bold",
//   //   },
//   //   "& a": {
//   //     textDecoration: "none",
//   //   },
//   // });

//   return (
// <Container maxWidth="lg">
//   <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
//     <Grid item xs={12} sm={6}>
//       <img
//         src="/images/login_page.webp"
//         alt="Login"
//         style={{ width: "100%", borderRadius: 8 }}
//       />
//     </Grid>

//     <Grid item xs={12} sm={6}>
//       <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
       
//         <Typography variant="h4" mb={2}>Welcome Back</Typography>
//         <Typography variant="h6">Login with your Email</Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//           <FormControl fullWidth>
//             <TextField
//               // error={isSubmitted && emailError}
//               // helperText={isSubmitted && emailErrorMessage}
//               id="email"
//               type="email"
//               name="email"
//               label="Email Address"
//               variant="outlined"
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" } } }}
//             />
//           </FormControl>

//           <FormControl fullWidth>
//             <TextField
//               // error={isSubmitted && passwordError}
//               // helperText={isSubmitted && passwordErrorMessage}
//               id="password"
//               type="password"
//               name="password"
//               label="Password"
//               variant="outlined"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "black" } } }}
//             />
//           </FormControl>

//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Link
//               component="button"
//               type="button"
//               // onClick={() => setOpen(true)}
//               variant="body2"
//               sx={{ color: "black" }}
//             >
//               Forgot password?
//             </Link>
//           </Box>

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2, color: "white", fontWeight: "bold", mb: 2 }}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </Box>

//         {/* {serverMessage && (
//           <Typography variant="body1" sx={{ color: "green", textAlign: "center", mb: 1 }}>
//             {serverMessage}
//           </Typography>
//         )} */}

//         {/* <Divider>or</Divider>

//         <Typography sx={{ textAlign: "center", mt: 2 }}>
//           Don&apos;t have an account?{" "}
//           <Link href="/Signup" variant="body2">Sign up to create account</Link>
//         </Typography> */}
//       </Paper>
//     </Grid>
//   </Grid>

//   {/* Forgot Password Dialog */}
//   {/* <Dialog
//     open={open}
//     onClose={() => setOpen(false)}
//     maxWidth="sm"
//     fullWidth
//     sx={{
//       "& .MuiDialog-paper": {
//         width: "550px",
//         padding: "20px",
//         borderRadius: "10px"
//       }
//     }}
//   >
//     <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
//       Forgot Password
//     </DialogTitle>
//     <DialogContent>
//       <Typography sx={{ textAlign: "center" }}>
//         Enter your email address to send OTP.
//       </Typography>
//       <TextField
//         fullWidth
//         label="Email Address"
//         type="email"
//         value={forgotEmail}
//         onChange={(e) => setForgotEmail(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setOpen(false)}>Cancel</Button>
//       <Button onClick={handleForgotPassword} color="primary" variant="contained">
//         Send OTP
//       </Button>
//     </DialogActions>
//   </Dialog> */}
// </Container>

//   );
// };

// export default LoginForm;

'use client';
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Container, FormControl, TextField,
  Paper, Typography, Link, Grid
} from '@mui/material';
import { SignIn } from '@/app/Services/authServices';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userDataStr = sessionStorage.getItem('userData');
    if (userDataStr) {
      const { roles } = JSON.parse(userDataStr);
      if (roles === 'Admin') {
        router.push('/Admin');
      } else {
        router.push('/User');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = { email, password };
      const user = await toast.promise(
        SignIn(formData),
        {
          loading: 'Signing in...',
          success: 'Login successful!',
          error: (err) => err.message || 'Login failed!',
        },
        {
          style: { fontSize: '18px', padding: '20px', width: '400px' },
        }
      );

      if (user.roles === 'Admin') {
        router.push('/Admin');
      } else {
        router.push('/User');
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'User is inactive') {
        router.push('/Userstatus');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <img
            src="/images/login_temple.jpg"
            alt="Login"
            style={{ width: '1000%', 
                     height: "auto",
                     maxHeight: "900px", // limit height on larger screens
                     objectFit: "cover",
                     borderRadius: 8 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" mb={2}>Welcome Back</Typography>
            <Typography variant="h6">Login with your Email</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Link component="button" type="button" variant="body2" sx={{ color: 'black' }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, color: 'white', fontWeight: 'bold', mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
            <Typography sx={{ textAlign: "center", mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link href="/Signup" variant="body2">Sign up to create account</Link>
        </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;

  