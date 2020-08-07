import {
	TextFieldFormsy,
	CheckboxFormsy,
	FuseChipSelectFormsy,
	RadioGroupFormsy,
	SelectFormsy
} from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import MenuItem from '@material-ui/core/MenuItem';

function JWTRegisterTab(props) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(e, model) {
		dispatch(submitRegister(e));
	
	}
//SELECT FOI ATRIBUIDO O MESMO VALOR value="none"
	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="fullname"
					label="Full name"
					validations={{
						//	minLength: 30,
						maxLength: 30
					}}
					validationErrors={{
						maxLength: 'Max character length is 30'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="Numeric"
					name="cpf"
					label="Cpf"
					validations={{
						minLength: 11
					}}
					validationErrors={{
						minLength: 'Min character length is 11'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									person_pin
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="Numeric"
					name="telephone"
					label="Telephone"
					validations={{
						maxLength: 11
					}}
					validationErrors={{
						maxLength: 'Max character length is 11'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									telephone
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<SelectFormsy
					className="my-16"
					name="bank"
					label="Select Bank"
					validations="equals:none"
					validationErrors="Must be None"
					variant="outlined"
					required
				>
					
					<MenuItem>
					
						<em>None</em>
					
					</MenuItem>
					<MenuItem variant="outlined" required value="none">
						B. Brasil
					</MenuItem>
					<MenuItem variant="outlined" required value="none">
						Bradesco
					</MenuItem>
					<MenuItem variant="outlined" required value="none">
						Caixa Economica
					</MenuItem>
					<MenuItem variant="outlined" required value="none">
						Santander
					</MenuItem>
				</SelectFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="agencia"
					label="Agency"
					validations={{
						maxLength: 4
					}}
					validationErrors={{
						maxLength: 'Max character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									RiBankLine
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="account"
					label="Account"
					validations={{
						maxLength: 15
					}}
					validationErrors={{
						maxLength: 'Max character length is 15'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									RiBankLine
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="REGISTER"
					disabled={!isFormValid}
					value="legacy"
				>
					Register
				</Button>
			</Formsy>
		</div>
	);
}

export default JWTRegisterTab;
