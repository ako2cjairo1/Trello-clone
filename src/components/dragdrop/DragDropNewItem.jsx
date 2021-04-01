import { memo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSectionController, createCardController } from '../../controllers';

export const DragDropNewItem = memo(
	({ sectionID, variant, placeHolder, composerButtonLabel, buttonLabel, scrollDown }) => {
		const [close, setClose] = useState(false);
		const [sectionName, setSectionName] = useState('');
		const [cardName, setCardName] = useState('');
		const inputRef = useRef();
		const dispatch = useDispatch();
		const currentBoard = useSelector((state) => state.board.currentBoard);

		// Event Handlers
		const handleOnOpen = () => {
			setClose(true);
			// create a delay to wait for inputRef to be mounted
			setTimeout(() => {
				inputRef.current.focus();
				scrollDown && scrollDown();
			}, 0);
		};

		const handleClose = () => {
			setSectionName('');
			setCardName('');
			setClose(false);
		};

		const handleSave = () => {
			if (isValid()) {
				if (variant === 'input') {
					dispatch(createSectionController({ board: currentBoard.id, name: sectionName }));
				} else {
					dispatch(createCardController({ section: sectionID, text: cardName }));
				}
				handleClose();
			}
		};

		// util functions
		const isValid = () => {
			let isValid = false;

			if (variant === 'input') {
				if (sectionName.trim().length > 0) {
					isValid = true;
				}
			} else {
				if (cardName.trim().length > 0) {
					isValid = true;
				}
			}
			return isValid;
		};

		return (
			<div
				className={
					variant === 'input' ? `section ${!close && 'transparent'}` : close ? 'mt-5' : 'mt-10'
				}>
				{!close ? (
					<div
						className={`card-section-composer ${variant === 'input' && 'color-invert'}`}
						onClick={handleOnOpen}>
						<span>+</span>
						<p>{composerButtonLabel}</p>
					</div>
				) : (
					<>
						<>
							{variant === 'input' ? (
								<input
									type='text'
									className='new-section-input'
									ref={inputRef}
									value={sectionName}
									placeholder={placeHolder}
									maxLength={50}
									onChange={(e) => setSectionName(e.target.value)}
									onKeyUp={(e) => e.key === 'Escape' && handleClose()}
								/>
							) : (
								<textarea
									className='new-item-textarea'
									ref={inputRef}
									value={cardName}
									placeholder={placeHolder}
									onChange={(e) => setCardName(e.target.value)}
									onKeyUp={(e) => e.key === 'Escape' && handleClose()}
								/>
							)}
						</>
						<div className='add-card-actions'>
							<button className='add-card-button' onClick={handleSave}>
								{buttonLabel}
							</button>
							<span className='remove-card-button' onClick={handleClose}>
								✕
							</span>
						</div>
					</>
				)}
			</div>
		);
	}
);
