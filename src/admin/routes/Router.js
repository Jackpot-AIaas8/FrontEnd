import {lazy} from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const MemberTables = lazy(() => import("../views/ui/MembersTables"));
const MemberDetailForm = lazy(() => import("../views/ui/MemberDetailForm"));
const DogTables = lazy(() => import("../views/ui/DogTables.js"));
const DogAddFrom = lazy(() => import("../views/ui/DogAddFrom.js"));
const DogDetailForm = lazy(() => import("../views/ui/DogDetailForm.js"));
const ShopAddFrom = lazy(() => import("../views/ui/ShopAddFrom.js"));
const ShopTables = lazy(() => import("../views/ui/ShopsTables"));
const ShopDetailForm = lazy(() => import("../views/ui/ShopDetailForm.js"));
const StockForm = lazy(() => import("../components/StockForm"));
const BoardTables = lazy(() => import("../views/ui/BoardsTables"));
const BoardDetailForm = lazy(() => import("../views/ui/BoardDetailForm.js"));

/*****Routes******/

const ThemeRoutes = [
    {
        path: "/",
        element: <FullLayout/>,
        children: [
            {path: "/admin", exact: true, element: <MemberTables/>},
            {path: "/admin/membertable", exact: true, element: <MemberTables/>},
            {path: "/admin/memberdetailform/:email", exact: true, element: <MemberDetailForm/>},
            {path: "/admin/dogtable", exact: true, element: <DogTables/>},
            {path: "/admin/dogaddform", exact: true, element: <DogAddFrom/>},
            {path: "/admin/dogdetailform/:dogId", exact: true, element: <DogDetailForm/>},
            {path: "/admin/shoptable", exact: true, element: <ShopTables/>},
            {path: "/admin/shopaddform", exact: true, element: <ShopAddFrom/>},
            {path: "/admin/shopdetailform/:shopId", exact: true, element: <ShopDetailForm/>},
            {path: "/admin/stockform/:shopId", exact: true, element: <StockForm/>},
            {path: "/admin/boardtable", exact: true, element: <BoardTables/>},
            {path: "/admin/boarddetailform/:boardId", exact: true, element: <BoardDetailForm/>},
        ],
    },
];

export default ThemeRoutes;
