const showCreateAccModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createAccRegistrationModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createAccRegistrationModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Cadastro de Contas";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "account-form";

	const comboText = ["", "Conta Corrente", "Conta Poupança", "Conta Pessoa Jurídica"];

	const tipoConta = createComboBoxGroup("Tipo de conta*", "tipo", comboText);
	form.appendChild(tipoConta);

	const clientName = createFromGroup("Id Cliente*", "idCliente", "number", true);
	form.appendChild(clientName);

	const buttonGroup = createButtonGroup("Cancelar", "Cadastrar", newAccClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showAccDeletionModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createAccDeletionModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createAccDeletionModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Desativação de Conta";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "delete-form";

	const accId = createFromGroup("Número da Conta", "accId", "number", true);
	form.appendChild(accId);

	const buttonGroup = createButtonGroup("Cancelar", "Desativar", deactivateAccClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showAccListModal = async () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = await createAccListModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createAccListModal = async () => {
	const modal = document.createElement("div");
	modal.id = "list-modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Contas";
	modal.appendChild(modalTitle);

	const accList = document.createElement("div");
	accList.id = "acc-list";
	modal.appendChild(accList);

	await getAccList().then((response) => {
		console.log(response.data);

		response.data.forEach((account) => {
			accList.appendChild(createAccListItem(account));
		});
	});

	const buttonGroup = createButtonGroup("", "Fechar", closeModal);
	modal.appendChild(buttonGroup);

	return modal;
};

const createAccListItem = (account) => {
	const tipoId = account.tipoConta;
	let tipo;
	let nome;
	if (tipoId == 1) {
		tipo = "Conta Corrente";
		nome = "Nome";
	} else if (tipoId == 2) {
		tipo = "Conta Poupança";
		nome = "Nome";
	} else if (tipoId == 3) {
		tipo = "Conta Empresarial";
		nome = "Nome Fantasia";
	} else {
		tipo = "invalido";
	}

	const accContainer = document.createElement("div");
	accContainer.id = account.id;
	accContainer.className = "client-container";

	const accId = document.createElement("span");
	accId.className = "acc-id";
	accId.innerHTML = `ID: ${account.id}`;

	const clientName = document.createElement("span");
	clientName.className = "client-name";
	clientName.innerHTML = `${nome}: ${account.nomeCliente}`;

	const saldo = document.createElement("span");
	saldo.className = "saldo";
	saldo.innerHTML = `Saldo: R$${account.saldo.toFixed(2)}`;

	const tipoConta = document.createElement("span");
	tipoConta.className = "tipo-conta";
	tipoConta.innerHTML = tipo;

	accContainer.appendChild(accId);
	accContainer.appendChild(clientName);
	accContainer.appendChild(saldo);
	accContainer.appendChild(tipoConta);

	return accContainer;
};

const getAccList = async () => {
	const url = `${host}/contas`;

	return await axios.get(url);
};

const newAccClicked = async () => {
	await postNewAcc()
		.then((response) => {
			closeModal();
			console.log(response);
			showSuccessModal("Conta criada com sucesso!");
		})
		.catch((error) => {
			showFailModal();
			console.log(error);
		});
};

const postNewAcc = async () => {
	const form = document.getElementById("account-form");

	const type = form.tipo.value;

	let acc;

	if (type == 1) {
		acc = "pf";
	} else if (type == 2) {
		acc = "pj";
	} else if (type == 3) {
		acc = "pp";
	} else {
		showFailModal();
		return;
	}

	const url = `${host}/conta/create/${acc}`;

	const account = {
		cliente: form.idCliente.value,
		ativa: true,
	};

	return await axios.post(url, account);
};

const deactivateAccClicked = async () => {
	await putDeactivateAcc()
		.then((response) => {
			closeModal();
			console.log(response);
			showSuccessModal("Conta desativada com sucesso!");
		})
		.catch((error) => {
			showFailModal();
			console.log(error);
		});
};

const putDeactivateAcc = async () => {
	const form = document.getElementById("delete-form");

	const accId = form.accId.value;

	const url = `${host}/conta/delete/${accId}`;

	console.log(url);

	return await axios.put(url);
};
