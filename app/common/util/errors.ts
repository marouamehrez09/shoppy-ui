export const getErrorMessage = ({ response }: { response: unknown }) => {
  if (response && typeof response === "object" && "message" in response) {
    const message = (response as { message: string | string[] }).message;

    if (Array.isArray(message)) {
      return formatErrorMessage(message[0]);
    }
    return formatErrorMessage(message);
  }

  return "Unknown error occurred";
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
