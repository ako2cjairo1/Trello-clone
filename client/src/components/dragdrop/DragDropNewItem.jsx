import { memo, useState, useRef } from 'react';

export const DragDropNewItem = memo(
	({
		sectionID,
		variant,
		placeHolder,
		composerButtonLabel,
		buttonLabel,
		scrollDown,
		onSaveCallback,
		...args
	}) => {
		const [isActive, setIsActive] = useState(false);
		const [sectionName, setSectionName] = useState(args.value ? args.value : '');
		const [cardName, setCardName] = useState(args.value ? args.value : '');
		const inputRef = useRef();

		// Event Handlers
		const handleOnOpen = (e) => {
			setSectionName(args.value ? args.value : '');
			setCardName(args.value ? args.value : '');
			setIsActive(true);
			// create a delay to wait for inputRef to be mounted
			setTimeout(() => {
				inputRef.current.focus();
				scrollDown && scrollDown();
			}, 0);
		};

		const handleClose = () => {
			setSectionName('');
			setCardName('');
			setIsActive(false);
		};

		const handleSave = () => {
			if (isValid() || args.ismodal === 1) {
				onSaveCallback(variant === 'input' ? sectionName : cardName);
				handleClose();
			}
		};

		const handleKeyUp = (evt) => {
			if (evt.key === 'Escape') {
				handleClose();
			} else if (evt.key === 'Enter' && args.ismodal !== 1) {
				handleSave();
			}
		};

		const isValid = () => {
			let isValid = false;

			if (variant === 'input') {
				if (sectionName?.trim().length > 0) {
					isValid = true;
				}
			} else {
				if (cardName?.trim().length > 0) {
					isValid = true;
				}
			}
			return isValid;
		};

		return (
			<div
				className={
					variant === 'input'
						? `section ${!isActive ? 'transparent' : ''}`
						: isActive
						? !isActive
							? 'button-container mblock-5'
							: ''
						: !isActive
						? 'button-container mblock-10'
						: ''
				}
				{...args}>
				{!isActive ? (
					<div
						className={`card-section-composer ${variant === 'input' ? 'color-invert' : ''}`}
						onClick={handleOnOpen}>
						<span>{args.noicon !== 1 ? '+' : ''}</span>
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
									onKeyUp={handleKeyUp}
								/>
							) : (
								<textarea
									className={args.ismodal === 1 ? 'new-section-input' : 'new-item-textarea'}
									ref={inputRef}
									value={cardName}
									placeholder={placeHolder}
									onChange={(e) => setCardName(e.target.value)}
									onKeyUp={handleKeyUp}
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
