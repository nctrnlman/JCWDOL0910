import React from "react";

const SetPrimaryModal = ({
    // deleteItemName,
    closeSetPrimaryModal,
    handleSetPrimary,
    setPrimaryItemId,
}) => {
    return (
        <div className="modal" id="set_primary_modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4 text-warning font-semibold">
                    Are you sure you want to set this address as primary?
                </p>
                <div className="modal-action">
                    <a
                        href="#close"
                        className="btn btn-error"
                        onClick={() => {
                            handleSetPrimary();
                            closeSetPrimaryModal();
                        }}
                    >
                        Yes
                    </a>
                    <a
                        href="#close"
                        className="btn btn-primary"
                        onClick={() => {
                            closeSetPrimaryModal();
                        }}
                    >
                        No
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SetPrimaryModal;
