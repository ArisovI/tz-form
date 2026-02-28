import { createBrowserRouter } from "react-router-dom";

import TestPagesList from "../../pages/test-pages-list";
import TestPagesCreate from "../../pages/test-pages-create";
import TestPagesEdit from "../../pages/test-pages-edit";

 export const router = createBrowserRouter([
    {
        path: '/',
        element: <TestPagesList />
    },
    {
        path: '/create',
        element: <TestPagesCreate />
    },
    {
        path: '/edit/:id',
        element: <TestPagesEdit />
    }
])