import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css';

import RootLayout from "@/layouts/root-layout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {IndexPage} from "@/routes/index.page.tsx";
import {AdminPage} from "@/routes/admin.page.tsx";
import {Players} from "@/features/player/players.feature";
import {ReserveLists} from "@/features/reserve/reserve-lists.feature";


const router = createBrowserRouter([
    {
        element: <RootLayout/>,
        children: [
            {path: "/", element: <IndexPage/>},
            {
                path: "/admin", element: <AdminPage/>, children: [
                    {path: "/admin/players", element: <Players/>},
                    {path: "/admin/reserve-lists", element: <ReserveLists/>}]
            },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
