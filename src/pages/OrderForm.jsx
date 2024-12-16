import React from "react";
import { useGetOneOrderQuery } from "../features/auth/OrderSlice";
import ReusableForm from "../components/Reuseableform";

function OrderFrom({}){
    const {data, isLoading: orderLoading} = useGetOneOrderQuery(id )
}


