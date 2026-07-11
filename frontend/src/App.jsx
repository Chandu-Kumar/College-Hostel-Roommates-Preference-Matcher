import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={2500}
        expand={false}
        visibleToasts={3}
        toastOptions={{
          style: {
            borderRadius: "14px",
            padding: "16px",
            fontSize: "15px",
            minWidth: "320px",
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;