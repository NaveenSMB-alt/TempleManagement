// "use client";
// import "./globals.css";
// import { ThemeProvider } from "@mui/material";
// import theme from "./theme"
// import CssBaseline from '@mui/material/CssBaseline';


// export default function ClientLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en">
//             <ThemeProvider theme={theme}>
//                 <CssBaseline />
//                     {children}
//             </ThemeProvider>
//         </html>
//     );
// }

"use client";

import "./globals.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
