import { memo, useState, useEffect } from 'react';

// TODO: fix the action handler props
export const CreateNewItem = memo((props) => {
	const {
		sectionID,
		variant,
		isOpen,
		placeHolder,
		composerButtonLabel,
		buttonLabel,
		scrollDown,
		onSaveCallback,
		...args
	} = props;
	const [isActive, setIsActive] = useState(isOpen);
	const [sectionName, setSectionName] = useState(args.value ? args.value : '');
	const [cardName, setCardName] = useState(args.value ? args.value : '');

	useEffect(() => {}, [isOpen]);

	// Event Handlers
	const handleOnOpen = (e) => {
		setSectionName(args.value ? args.value : '');
		setCardName(args.value ? args.value : '');
		setIsActive(true);
		// create a delay to wait for inputRef to be mounted
		setTimeout(() => {
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
		} else if (evt.key === 'Escape') {
			handleClose();
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
					? `section ${!isActive ? 'transparent' : 'descendform'}`
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
					<div className={isActive && 'descendform'}>
						{variant === 'input' ? (
							<input
								type='text'
								className={`new-section-input ${isActive && 'descendform'}`}
								value={sectionName}
								placeholder={placeHolder}
								maxLength={50}
								onChange={(e) => setSectionName(e.target.value)}
								onKeyUp={handleKeyUp}
								autoFocus
							/>
						) : (
							<textarea
								className={
									args.ismodal === 1
										? 'new-section-input descendform'
										: 'new-item-textarea descendform'
								}
								value={cardName}
								placeholder={placeHolder}
								onChange={(e) => setCardName(e.target.value)}
								onKeyUp={handleKeyUp}
								autoFocus
							/>
						)}
					</div>
					<div className='add-card-actions'>
						<button className='add-card-button' onClick={handleSave}>
							{buttonLabel}
						</button>
						<span className='close-button' onClick={handleClose}>
							✕
						</span>
					</div>
				</>
			)}
		</div>
	);
});
