import React from "react";

function SendOrderButton({ id_order, setSelectedId, status }) {
    const handleSend = () => {
        setSelectedId(id_order);
        console.log(id_order)
        window.send_order.showModal();
    };

    // const handleClick = () => {
    //     setSelectedId(id_order);
    //     window.reject_modal.showModal();
    // };

    if (status === "Diproses") {
        return (
            <div className="flex flex-col gap-2">
                <button
                    className="btn btn-success btn-xs lg:btn-sm"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        );
    }
    //   else if (status === "Diproses") {
    //     return (
    //       <div className="flex flex-col gap-2">
    //         <button
    //           className="btn btn-error btn-xs lg:btn-sm"
    //           onClick={handleClick}
    //         >
    //           Reject
    //         </button>
    //       </div>
    //     );
    //   } else if (
    //     status !== "Menunggu Konfirmasi Pembayaran" &&
    //     status !== "Diproses"
    //   ) {
    //     return <p>No actions available.</p>;
    //   }
}

export default SendOrderButton;
