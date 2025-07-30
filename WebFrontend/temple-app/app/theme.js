import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2002e9',
            light: '#00b6ef',
            contrastText: '#ffffff'
        },
        background: {
            default: '#ffffff',
            },
    },
    typography: {
        allVariants: {
            fontSize: 14,
        },
        h1: {
            fontSize: '34px',
            fontWeight: 'bold'
        },
        h2: {
            fontSize: '32px',
            fontWeight: 'bold'
        },
        h3: {
            fontSize: '28px',
            fontWeight: 'bold'
        },
        h4: {
            fontSize: '24px',
            fontWeight: 'bold'
        },
        h5: {
            fontSize: '20px',
            fontWeight: 'bold'
        },
        h5: {
            fontSize: '18px',
            fontWeight: 'bold'
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: ({ theme }) => ({
                        backgroundColor: '#34bbbb',
                        color: "#ffffff",
                        border: 'none',
                        ':hover': {
                            backgroundColor: '#2002e9',
                            color: "#ffffff",
                        },
                        [theme.breakpoints.down('md')]: {
                            backgroundColor: '#089989'
                        }
                    })
                },
                {
                    props: { variant: 'outlined' },
                    style: {
                        backgroundColor: '#6f7f8f',
                        color: '#fff',
                        borderColor: '#6f7f8f',
                        ':hover': {
                            color: '#ffffff',
                            backgroundColor: '#6f7f8f'
                        }
                    }
                }
            ]
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#5dbcca', // Set the desired background color for the header
                    color: '#ffffff', // Set the text color if needed
                    position: 'sticky',
                    top: 0,
                    zIndex: 1, // Ensure the header stays above other content

                },
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: '#f8f6ff', // Set the background color for even rows
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '4px 18px',
                },
                head: {
                    padding: '14px 18px',
                    backgroundColor: '#5dbcca',
                    color: '#ffffff'
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#ffffff',  // Set your desired color for anchor tags
                    textDecoration: 'none',  // Optionally remove underline
                    "& a": {
                        color: '#ffffff',
                        textDecoration: "none",
                    },
                    '&:hover': {
                        color: '#f2f2f2',  // Set hover color
                        textDecoration: 'underline',  // Optionally add underline on hover
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '& a': {
                        color: '#00b6ef',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#00b6ef',
                            textDecoration: 'underline',
                        },
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d3d3d3',
                        borderWidth: '1px' 
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d3d3d3', 
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d3d3d3', 
                    },
                    '&.Mui-focused': {
                        outline: '#d3d3d3', 
                    },
                },
                input: {
                    
                },
            },
        },
    },

})

export default theme