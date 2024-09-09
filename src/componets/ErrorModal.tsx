import React, { useEffect, useRef } from "react";
import './ErrorModal.css';

type ErrorModalProps = {
    onClick: () => void;
    className?: string;
    errorText: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ onClick, className = '', errorText }) => {

    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!modalRef.current!.contains(event.target as Node)) {
                onClick();
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [onClick]);

    return (
        <div className="modal">
            <div ref={modalRef} className={`modal__data ${className}`}>
                <button className="modal__close close-button" onClick={onClick} />
                <h2 className='modal__title'>Ошибка вычисления</h2>
                {errorText}
            </div>
        </div>
    );
}

export default ErrorModal;