import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
// import { Select } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { differenceInDays, add } from "date-fns";
import axios from "axios";
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     TableContainer,
//     Button,
//     Text,
// } from "@chakra-ui/react";
import {
    // fetchAllTransaction,
    fetchStockMovement
} from "../../../features/reportStockSlice";
import Datepicker from "react-tailwindcss-datepicker";
// import "react-tailwindcss-datepicker/dist/index.css";
// import TransactionTable from "../components/TransactionTable";


function StockReport() {
    const dispatch = useDispatch();
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [warehouses, setWarehouses] = useState([]);
    const stockMovement = useSelector(
        (state) => state.reportStock.stock.stockMovementHistory
    );

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const token = localStorage.admin_token;
                console.log("token dari fetchwarehouse", token)
                if (token) {
                    console.log("token dari fetchwarehouse 2", token)
                    let response = await axios.get(
                        `http://localhost:8000/api/warehouses/`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    console.log(response.data)
                    setWarehouses(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchWarehouses();
    }, []);

    // useEffect(() => {
    //     dispatch(fetchStockMovement(selectedWarehouse))
    // }, []);
    // useEffect(()) = async (event) => {
    //     // console.log("ini woi", event)
    //     // const selectedWarehouse = event.target.value;
    //     setSelectedWarehouse(event);

    //     dispatch(fetchStockMovement(selectedWarehouse));

    //     // console.log("warehousenya yg dipilih", selectedWarehouseId)
    //     // dispatch(fetchStockMovement(selectedWarehouseId));
    //     // const stock = await dispatch(fetchStockMovement(id_chosen_warehouse));
    // };
    console.log("selectedwarehouse", selectedWarehouse)

    //----------------------------------------------------------------
    return (
        <div className="text-slate-900 min-h-screen flex-row bg-base-100 h-screen w-screen  px-20 lg:">
            <div className="form-control">
                <select
                    value={selectedWarehouse}
                    onChange={(e) => { setSelectedWarehouse(e.target.value); fetchStockMovement(e.target.value); }}
                    className="select select-bordered"
                    required
                >
                    <option value="">Select warehouse</option>
                    {warehouses.map((w) => (
                        <option key={w.id_warehouse} value={w.id_warehouse}>
                            {w.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {stockMovement?.map((w) => {
                    return (
                        <p>{w.movement_description}</p>
                    )
                })}
            </div>

        </div>
    );
}

export default StockReport;