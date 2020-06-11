const showTransferModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createTransferModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createTransferModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Transferência";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "transfer-form";

	const recieverId = createFromGroup("Transferir para", "destinationId", "number", 0, 1);
	form.appendChild(recieverId);

	const amount = createFromGroup("Valor", "amount", "number", 0, 0.01);
	form.appendChild(amount);

	const buttonGroup = createButtonGroup("Cancelar", "Transferir", transferButtonClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showWithdrawModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createWithdrawModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createWithdrawModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Saque";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "withdraw-form";

	const amount = createFromGroup("Valor", "amount", "number", 0, 0.01);
	form.appendChild(amount);

	const buttonGroup = createButtonGroup("Cancelar", "Sacar", withdrawButtonClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showDepositModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createDepositModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createDepositModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Depósito";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "deposit-form";

	const amount = createFromGroup("Valor", "amount", "number", 0, 0.01);
	form.appendChild(amount);

	const buttonGroup = createButtonGroup("Cancelar", "Depositar", depositButtonClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const createFromGroup = (label, id, type, min, step) => {
	const formGroup = document.createElement("div");
	formGroup.className = "form-group";

	const inputLabel = document.createElement("h5");
	inputLabel.innerHTML = `${label}: `;

	const inputField = document.createElement("input");
	inputField.id = id;
	inputField.type = type;
	inputField.className = "form-control";

	if (type == "number") {
		inputField.min = min;
		inputField.step = step;
	}

	formGroup.appendChild(inputLabel);
	formGroup.appendChild(inputField);

	return formGroup;
};

const createButtonGroup = (btn1Txt, btn2Txt, action) => {
	const buttonGroup = document.createElement("div");
	buttonGroup.className = "button-group";

	let cancelButton;
	let transferButton;

	if (btn1Txt) {
		cancelButton = document.createElement("button");
		cancelButton.type = "button";
		cancelButton.className = "btn btn-primary custom-button";
		cancelButton.innerHTML = btn1Txt;
		cancelButton.addEventListener("click", closeModal);
	} else {
		cancelButton = document.createElement("div");
	}

	if (btn2Txt) {
		transferButton = document.createElement("button");
		transferButton.type = "button";
		transferButton.className = "btn btn-primary custom-button";
		transferButton.innerHTML = btn2Txt;
		transferButton.id = "action-button";
		transferButton.addEventListener("click", action);
	} else {
		transferButton = document.createElement("div");
	}

	buttonGroup.appendChild(cancelButton);
	buttonGroup.appendChild(transferButton);

	return buttonGroup;
};

const closeModal = () => {
	document.getElementById("overlay").remove();
};

const transferButtonClicked = async () => {
	putTransferencia()
		.then((response) => {
			closeModal();
			showSuccessModal("Transferência feita com Sucesso!");
		})
		.catch((error) => {
			console.log(error);
			showFailModal();
		});
};

const putTransferencia = async () => {
	const url = `${host}/transacoes/transferencia`;

	const form = document.getElementById("transfer-form");
	const body = {
		idPagador: currentUserAcc.id,
		idReceptor: form.destinationId.value,
		valor: form.amount.value,
	};

	return axios.put(url, body);
};

const withdrawButtonClicked = async () => {
	postWithdraw()
		.then((response) => {
			closeModal();
			showSuccessModal("Saque realizado com Sucesso!");
		})
		.catch((error) => {
			console.log(error);
			showFailModal();
		});
};

const postWithdraw = async () => {
	const url = `${host}/transacoes/saque`;

	const form = document.getElementById("withdraw-form");
	const body = {
		idConta: currentUserAcc.id,
		valor: form.amount.value,
	};
	return await axios.post(url, body);
};

const depositButtonClicked = async () => {
	postDeposit()
		.then((response) => {
			closeModal();
			showSuccessModal("Deposito realizado com Sucesso!");
		})
		.catch((error) => {
			console.log(error);
			showFailModal();
		});
};

const postDeposit = async () => {
	const url = `${host}/transacoes/deposito`;

	const form = document.getElementById("deposit-form");
	const body = {
		idConta: currentUserAcc.id,
		valor: form.amount.value,
	};
	return await axios.post(url, body);
};
