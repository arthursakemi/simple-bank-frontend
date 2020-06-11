const host = "http://localhost:8080";

const showCreateClientModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createClientRegistrationModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createClientRegistrationModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Cadastro de Cliente";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "client-form";

	const comboText = ["", "Pessoa Física", "Pessoa Jurídica"];

	const tipoConta = createComboBoxGroup("Tipo de conta*", "tipo", comboText);
	form.appendChild(tipoConta);

	const clientName = createFromGroup("Nome*", "name", "text", true);
	form.appendChild(clientName);

	const register = createFromGroup("CPF/CNPJ*", "register", "number", true);
	form.appendChild(register);

	const telefone = createFromGroup("Telefone*", "telefone", "number", true);
	form.appendChild(telefone);

	const email = createFromGroup("Email*", "email", "text", true);
	form.appendChild(email);

	const address = createFromGroup("Endereço*", "address", "text", true);
	form.appendChild(address);

	const user = createFromGroup("Usuário*", "user", "text", true);
	form.appendChild(user);

	const password = createFromGroup("Senha*", "password", "password", true);
	form.appendChild(password);

	const buttonGroup = createButtonGroup("Cancelar", "Cadastrar", newClientClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showClientDeletionModal = () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createClientDeletionModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createClientDeletionModal = () => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Desativação de Cliente";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");
	form.id = "delete-form";

	const clientId = createFromGroup("Número do Cliente", "clientId", "number", true);
	form.appendChild(clientId);

	const buttonGroup = createButtonGroup("Cancelar", "Desativar", deactivateClientClicked);
	form.appendChild(buttonGroup);

	modal.appendChild(form);

	return modal;
};

const showClientListModal = async () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = await createClientListModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createClientListModal = async () => {
	const modal = document.createElement("div");
	modal.id = "list-modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Clientes";
	modal.appendChild(modalTitle);

	const clientList = document.createElement("div");
	clientList.id = "client-list";
	modal.appendChild(clientList);

	await getClientList().then((response) => {
		console.log(response.data);

		response.data.forEach((client) => {
			clientList.appendChild(createClientListItem(client));
		});
	});

	const buttonGroup = createButtonGroup("", "Fechar", closeModal);
	modal.appendChild(buttonGroup);

	return modal;
};

const showClientRegistrationSuccessModal = (client) => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = createClientRegistrationSuccessModal(client);

	overlay.appendChild(modal);

	console.log(document.getElementById("wrapper"));

	document.getElementById("wrapper").appendChild(overlay);
};

const createClientRegistrationSuccessModal = (client) => {
	const modal = document.createElement("div");
	modal.id = "modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Cadastrado com Sucesso!";
	modal.appendChild(modalTitle);

	const clientData = document.createElement("div");
	clientData.className = "client-data-container";

	const clientId = document.createElement("span");
	clientId.className = "client-data";
	clientId.innerHTML = `ID: ${client.id}`;

	const clientName = document.createElement("span");
	clientName.className = "client-data";
	clientName.innerHTML = client.nome ? `Nome: ${client.nome}` : `Nome Fantasia: ${client.nomeFantasia}`;

	const registro = document.createElement("span");
	registro.className = "client-data";
	registro.innerHTML = client.tipo == 1 ? `CPF: ${client.registro}` : `CNPJ: ${client.registro}`;

	const telefone = document.createElement("span");
	telefone.className = "client-data";
	telefone.innerHTML = `Telefone: ${client.telefone}`;

	const email = document.createElement("span");
	email.className = "client-data";
	email.innerHTML = `Email: ${client.email}`;

	const usuario = document.createElement("span");
	usuario.className = "client-data";
	usuario.innerHTML = `Usuário: ${client.usuario}`;

	clientData.appendChild(clientId);
	clientData.appendChild(clientName);
	clientData.appendChild(registro);
	clientData.appendChild(telefone);
	clientData.appendChild(email);
	clientData.appendChild(usuario);

	modal.appendChild(clientData);

	modal.appendChild(createButtonGroup("", "Fechar", closeModal));

	return modal;
};

const createClientListItem = (client) => {
	const clientContainer = document.createElement("div");
	clientContainer.id = client.id;
	clientContainer.className = "client-container";

	const clientId = document.createElement("span");
	clientId.className = "client-id";
	clientId.innerHTML = `ID: ${client.id}`;

	const clientName = document.createElement("span");
	clientName.className = "client-name";
	clientName.innerHTML = client.nome ? `Nome: ${client.nome}` : `Nome Fantasia: ${client.nomeFantasia}`;

	const registro = document.createElement("span");
	registro.className = "registro";
	registro.innerHTML = client.cpf ? `CPF: ${client.cpf}` : `CNPJ: ${client.cnpj}`;

	const telefone = document.createElement("span");
	telefone.className = "telefone";
	telefone.innerHTML = `Telefone: ${client.telefone}`;

	clientContainer.appendChild(clientId);
	clientContainer.appendChild(clientName);
	clientContainer.appendChild(registro);
	clientContainer.appendChild(telefone);

	return clientContainer;
};

const createComboBoxGroup = (label, id, list) => {
	const formGroup = document.createElement("div");
	formGroup.className = "form-group";

	const inputLabel = document.createElement("h5");
	inputLabel.innerHTML = `${label}: `;

	const inputField = document.createElement("select");
	inputField.id = id;
	inputField.name = id;
	inputField.className = "form-control";

	list.forEach((element, index) => {
		const option = document.createElement("option");
		option.innerHTML = element;
		option.value = index;
		inputField.appendChild(option);
	});

	formGroup.appendChild(inputLabel);
	formGroup.appendChild(inputField);

	return formGroup;
};

const createFromGroup = (label, id, type, required = false, min = 0, step = 1) => {
	const formGroup = document.createElement("div");
	formGroup.className = "form-group";

	const inputLabel = document.createElement("h5");
	inputLabel.innerHTML = `${label}: `;

	const inputField = document.createElement("input");
	inputField.id = id;
	inputField.name = id;
	inputField.type = type;
	inputField.className = "form-control";
	inputField.required = required;

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

const getClientList = async () => {
	const url = `${host}/clientes`;

	return await axios.get(url);
};

const newClientClicked = async () => {
	await postNewClient()
		.then((response) => {
			closeModal();
			console.log(response);
			showClientRegistrationSuccessModal(response.data);
			showSuccessModal("");
		})
		.catch((error) => {
			showFailModal();
			console.log(error);
		});
};

const postNewClient = async () => {
	const form = document.getElementById("client-form");

	const url = `${host}/cliente/create`;

	const client = {
		registro: form.register.value,
		nome: form.name.value,
		telefone: form.telefone.value,
		email: form.email.value,
		endereco: form.address.value,
		usuario: form.user.value,
		password: form.password.value,
		tipo: form.tipo.value,
		ativo: true,
	};

	return await axios.post(url, client);
};

const deactivateClientClicked = async () => {
	await putDeactivateClient()
		.then((response) => {
			closeModal();
			console.log(response);
			showSuccessModal("Cliente desativado com sucesso!");
		})
		.catch((error) => {
			showFailModal();
			console.log(error);
		});
};

const putDeactivateClient = async () => {
	const form = document.getElementById("delete-form");

	const clientId = form.clientId.value;

	const url = `${host}/cliente/delete/${clientId}`;

	console.log(url);

	return await axios.put(url);
};

const otto = {
	ativo: true,
	email: "otto@mail.com",
	endereco: "Rua otto 55",
	id: 13,
	nome: "Otto",
	registro: "65485232155",
	telefone: "11965487582",
	tipo: 1,
	usuario: "otto",
};
