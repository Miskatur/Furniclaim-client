import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import Furnitures from "../../Pages/Furnitures/Furnitures";
import Home from "../../Pages/Home/Home/Home";

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
            }
        ]
    }
])