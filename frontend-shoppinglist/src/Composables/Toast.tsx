type ToastProps = {
  message: string;
  type?: "error" | "success" | "info";
};

export default function Toast({ message, type = "info" }: ToastProps) {
  const colors = {
    error: "bg-red-500",
    success: "bg-green-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2
        px-4 py-3 rounded-lg text-white
        shadow-lg z-9999
        ${colors[type]}
      `}
    >
      {message}
    </div>
  );
}