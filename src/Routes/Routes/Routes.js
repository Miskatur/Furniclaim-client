import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Furnitures from "../../Pages/Furnitures/Furnitures";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register";
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                element: <Furnitures></Furnitures>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])