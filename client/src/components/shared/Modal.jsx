import './Modal.css';
import { memo } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { createPortal } from 'react-dom';

export const Modal = memo((props) => {
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
		<div className='modal-wrapper'>
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
});
