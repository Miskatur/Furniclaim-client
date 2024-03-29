import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main/Main";
import AllProducts from "../../Pages/AllProducts/AllProducts";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllOrders from "../../Pages/Dashboard/AllOrders/AllOrders";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
// import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyClient from "../../Pages/Dashboard/MyClient/MyClient";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import Payment from "../../Pages/Dashboard/MyOrders/Payment/Payment";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Furnitures from "../../Pages/Furnitures/Furnitures";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                element: <PrivateRoutes><Furnitures></Furnitures></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://furniclaim-server.vercel.app/categories/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/allproducts',
                element: <PrivateRoutes><AllProducts></AllProducts></PrivateRoutes>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }


        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            // {
            //     path: '/dashboard',
            //     element: <Dashboard></Dashboard>
            // },
            {
                path: '/dashboard',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/myclients',
                element: <MyClient></MyClient>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/reporteditems',
                element: <ReportedItems></ReportedItems>
            },
            {
                path: '/dashboard/allorders',
                element: <AllOrders></AllOrders>
            },
            {
                path: '/dashboard/myorder/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://furniclaim-server.vercel.app/order/${params.id}`)
            }
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
])