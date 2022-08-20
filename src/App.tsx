import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Employee from "./components/employees/Index";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Employee />
    </QueryClientProvider>
  );
}

export default App;
