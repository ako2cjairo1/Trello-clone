import './Modal.css';
import { IoCardOutline, IoCloseOutline, IoList } from 'react-icons/io5';
import { createPortal } from 'react-dom';

const Modal = (props) => {
	const {
		children,
		data,
		isOpen,
		onClose,
		style,
		containerClassName = 'modal-container',
		noBackdrop = false,
		clickBackdropToClose = true,
	} = props;

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className='modal-wrapper'>
			{!noBackdrop && <div className='modal-overlay' onClick={clickBackdropToClose && onClose} />}

			<div style={style} className={containerClassName}>
				<div className='modal-header'>
					<div className='title'>
						<div className='d-flex'>
							<div className='d-flex'>
								<IoCardOutline className='title-icon' />
							</div>
							<h2>{data.text}</h2>
						</div>
						<div className='section-link'>
							<p>in section </p> <span>{data.title}</span>
						</div>
					</div>
					<div className='d-flex'>
						<IoCloseOutline className='close-icon' onClick={onClose} />
					</div>
				</div>

				<div className='modal-body'>
					<div className='title'>
						<div className='d-flex'>
							<IoList className='title-icon' />
							<h3>Description</h3>
						</div>
						<div className='description'>{children}</div>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root')
	);
};

export { Modal };
