export class ValidationService {

	static getValidatorErrorMessage(code: string, quality: string) {
		let config = {
			'required' : `${quality} is Required`,
		}
		return config[code];
	}
}