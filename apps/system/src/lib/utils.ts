export const GenerateCode = () => {
	const char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
	const char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));

	const int1 = Math.floor(Math.random() * 10);
	const int2 = Math.floor(Math.random() * 10);

	const randomCode = char1 + char2 + int1 + int2;

	const code = randomCode.toString().toUpperCase();
	return code;
};

export function getTimeAgo(dateString: string): string {
	const currentDate = new Date();
	const pastDate = new Date(dateString);

	const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - pastDate.getTime()) / 1000);

	if (timeDifferenceInSeconds < 60) {
		return `${timeDifferenceInSeconds}s`;
	} else if (timeDifferenceInSeconds < 3600) {
		const minutes = Math.floor(timeDifferenceInSeconds / 60);
		return `${minutes}m ago`;
	} else if (timeDifferenceInSeconds < 86400) {
		const hours = Math.floor(timeDifferenceInSeconds / 3600);
		return `${hours}h ago`;
	} else if (timeDifferenceInSeconds < 2592000) {
		const days = Math.floor(timeDifferenceInSeconds / 86400);
		return `${days}d ago`;
	} else {
		// If it's been more than a month, switch to an absolute date format
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};
		return pastDate.toLocaleDateString(undefined, options);
	}
}

/**
 * Converts an amount of money to its base form.
 * @param amount - The amount in cedis (or any other main currency unit).
 * @param factor - The base unit factor (e.g., 100 for cedis to pesewas).
 * @returns The amount in base form (e.g., 1 cedi = 100 pesewas).
 */
export function toBaseForm(amount: number, factor: number = 100): number {
	return Math.round(amount * factor);
}

/**
 * Converts an amount in base form (pesewas) back to its main currency unit (cedis).
 * @param amountInBaseForm - The amount in base form (e.g., 8000 pesewas).
 * @param factor - The base unit factor (e.g., 100 for pesewas to cedis).
 * @returns The equivalent amount in cedis.
 */
export function fromBaseForm(amountInBaseForm: number, factor: number = 100): number {
	return amountInBaseForm / factor;
}

export function getFirstUUIDPart(uuid: string): string {
	return uuid.split('-')[0];
}
