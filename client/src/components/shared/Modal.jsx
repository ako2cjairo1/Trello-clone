import './Modal.css';
import { IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';

const Modal = (props) => {
	const {
		children,
		isOpen,
		onClose,
		style,
		containerClassName = 'modal-container',
		noBackdrop = false,
		hideCloseButton,
		clickBackdropToClose = true,
	} = props;

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className='modal-wrapper' style={{ border: '2px solid purple' }}>
			{!noBackdrop && <div className='modal-overlay' onClick={clickBackdropToClose && onClose} />}

			<div className={containerClassName} style={style}>
				{!hideCloseButton && (
					<div className='close modal' onClick={onClose}>
						<IoCloseOutline className='close-icon' />
					</div>
				)}
				<div className='d-flex-column'>{children}</div>
			</div>
		</div>,
		document.getElementById('modal-root')
	);
};

export { Modal };
