import React from 'react'
import { MdClose } from "react-icons/md";
import './Modal.css'

export default function Modal ({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className = "modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}><MdClose size={24} /></button>
                {children}
            </div>

        </div>
    );
}