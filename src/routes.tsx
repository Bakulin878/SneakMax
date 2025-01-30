import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import ProductPage from "./pages/ProductPage/ProductPage.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Layout from "./components/Layout/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: Loader,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
