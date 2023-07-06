import React, { useEffect, useState } from "react";
import OrderListTable from "./OrderListTable";
import Pagination from "../../utils/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderPaymentList } from "../../../features/orders/orderListAdminSlice";
import SearchInputList from "../../utils/SearchInputList";
import SortButtons from "../../utils/SortButtons";
import RejectOrderModal from "../../modals/RejectOrderModal";
import ConfirmOrderModal from "../../modals/ConfirmOrderModal";

function OrderListAdminContent() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderListAdmin.orders);
  const totalPages = useSelector((state) => state.orderListAdmin.totalPages);
  const currentPage = useSelector((state) => state.orderListAdmin.currentPage);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedId, setId] = useState();

  const handlePageChange = (page) => {
    dispatch(
      fetchOrderPaymentList(page, searchInput, selectedSort, selectedStatus)
    );
  };

  const handleSort = (option) => {
    setSelectedSort(option);
    fetchOrderPaymentList(
      currentPage,
      selectedSort,
      searchInput,
      selectedStatus
    );
  };

  useEffect(() => {
    dispatch(
      fetchOrderPaymentList(
        currentPage,
        selectedSort,
        searchInput,
        selectedStatus
      )
    );
  }, [currentPage, selectedSort, searchInput, selectedStatus]);
  return (
    <div className="flex flex-col px-5">
      <div className="lg:flex-col lg:flex lg:justify-center lg:items-center">
        <h1 className="menu-title font-bold text-lg p-2">Orders List</h1>
        <div className="p-2 flex justify-center items-center">
          <SearchInputList
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="p-3 ">
          <SortButtons handleSort={handleSort} />
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl lg:flex lg:justify-center lg:items-center">
        <OrderListTable
          orders={orders}
          currentPage={currentPage}
          setId={setId}
        />
      </div>
      <div className="lg:flex lg:justify-center lg:items-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <RejectOrderModal selectedId={selectedId} />
      <ConfirmOrderModal selectedId={selectedId} />
    </div>
  );
}

export default OrderListAdminContent;
