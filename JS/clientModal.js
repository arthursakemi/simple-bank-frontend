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

	const comboText = ["", "Pessoa Física", "Pessoa Jurídica", "Conta Corrente"];

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

	const buttonGroup = createButtonGroup("Cancelar", "Cadastrar");
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
	modalTitle.innerHTML = "Exclusão de Cliente";
	modal.appendChild(modalTitle);

	const form = document.createElement("form");

	const clientName = createFromGroup("Nome*", "name", "text", true);
	form.appendChild(clientName);

	const register = createFromGroup("CPF/CNPJ*", "register", "number", true);
	form.appendChild(register);

	const buttonGroup = createButtonGroup("Cancelar", "Cadastrar");
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

	const buttonGroup = createButtonGroup("Cancelar", "Fechar");
	modal.appendChild(buttonGroup);

	return modal;
};

const createClientListItem = (client) => {
	const clientContainer = document.createElement("div");
	clientContainer.id = client.id;
	clientContainer.className = "client-container";

	const clientName = document.createElement("span");
	clientName.className = "client-name";
	clientName.innerHTML = client.nome ? `Nome: ${client.nome}` : `Nome Fantasia: ${client.nomeFantasia}`;

	const registro = document.createElement("span");
	registro.className = "registro";
	registro.innerHTML = client.cpf ? `CPF: ${client.cpf}` : `CNPJ: ${client.cnpj}`;

	const telefone = document.createElement("span");
	telefone.className = "telefone";
	telefone.innerHTML = `Telefone: ${client.telefone}`;

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

const createButtonGroup = (btn1Txt, btn2Txt) => {
	const buttonGroup = document.createElement("div");
	buttonGroup.className = "button-group";

	const cancelButton = document.createElement("button");
	cancelButton.type = "button";
	cancelButton.className = "btn btn-primary custom-button";
	cancelButton.innerHTML = btn1Txt;
	cancelButton.addEventListener("click", closeModal);

	const transferButton = document.createElement("button");
	transferButton.type = "button";
	transferButton.className = "btn btn-primary custom-button";
	transferButton.innerHTML = btn2Txt;
	transferButton.id = "action-button";

	buttonGroup.appendChild(cancelButton);
	buttonGroup.appendChild(transferButton);

	return buttonGroup;
};

const closeModal = () => {
	document.getElementById("overlay").remove();
};

const getClientList = async () => {
	const url = "http://localhost:8080/clientes";

	return await axios.get(url);
};
