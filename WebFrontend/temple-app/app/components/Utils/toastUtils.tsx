// utils/toastUtils.ts
import { toast } from 'react-hot-toast';

const baseStyle = {
  fontSize: "16px",
  padding: "16px",
  width: "350px",
  borderRadius: "8px",
};

interface ErrorWithResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export function showPromiseToast<T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
): Promise<T> {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: (err: unknown) => {
        if (typeof err === "string") return err;

        const error = err as ErrorWithResponse;

        if (error.response?.status === 404) return "Network error";

        if (error.response?.data?.message) return error.response.data.message;

        if (error.message) return error.message;

        return "Something went wrong. Please try again.";
      },
    },
    {
      style: baseStyle,
    }
  );
}




export const showToast = (
  type: "success" | "error" | "loading" | "warning",
  message: string,
  duration = 3000
) => {
  if (type === "warning") {
    toast.custom(
      <div style={{ ...baseStyle, background: "#fef3c7", color: "#92400e" }}>
        ⚠️ {message}
      </div>,
      { duration }
    );
  } else {
    toast[type](message, {
      duration,
      style: baseStyle,
    });
  }
};

interface ErrorWithResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}




export const showErrorToast = (error: unknown, fallback = "An unknown error occurred") => {
  let message = fallback;

  const err = error as ErrorWithResponse;

  if (typeof error === "string") {
    message = error;
  } else if (err.response?.data?.message) {
    message = err.response.data.message;
  } else if (err.message) {
    message = err.message;
  }

  toast.error(message, {
    duration: 3000,
    style: baseStyle,
  });
};
