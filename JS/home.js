const eye = `<svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"/>
<path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>`;

const eyeSlash = `<svg class="bi bi-eye-slash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
 <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
 <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
 <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/>
 <path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/>
</svg>`;

let currentUserAcc = {
	id: 1,
	balance: 0.0,
};

const toogleSlashedEye = () => {
	const eyeIcon = document.getElementById("eye-icon");

	if (eyeIcon.getAttribute("slashed") == "") {
		eyeIcon.innerHTML = eye;
		eyeIcon.setAttribute("slashed", "true");
		document.getElementById("balance").innerHTML = `R$ ${currentUserAcc.saldo.toFixed(2)}`;
	} else {
		eyeIcon.setAttribute("slashed", "");
		eyeIcon.innerHTML = eyeSlash;
		document.getElementById("balance").innerHTML = `R$ -----.--`;
	}
};

const showTransactionListModal = async () => {
	const overlay = document.createElement("div");
	overlay.id = "overlay";

	const modal = await createTransactionListModal();

	overlay.appendChild(modal);

	document.getElementById("wrapper").appendChild(overlay);
};

const createTransactionListModal = async () => {
	const modal = document.createElement("div");
	modal.id = "list-modal";

	const modalTitle = document.createElement("h2");
	modalTitle.className = "modal-title";
	modalTitle.innerHTML = "Extrato";
	modal.appendChild(modalTitle);

	const clientList = document.createElement("div");
	clientList.id = "client-list";
	modal.appendChild(clientList);

	await getTransactionList().then((response) => {
		console.log(response.data);

		response.data.forEach((transaction) => {
			clientList.appendChild(createTransactionListItem(transaction));
		});
	});

	const buttonGroup = createButtonGroup("", "Fechar", closeModal);
	modal.appendChild(buttonGroup);

	return modal;
};

const createTransactionListItem = ({ id, date, valor, idPagador, idReceptor }) => {
	const transactionContainer = document.createElement("div");
	transactionContainer.id = id;
	transactionContainer.className = "client-container";

	const transactionId = document.createElement("span");
	transactionId.className = "transaction-id";
	transactionId.innerHTML = `ID: ${id}`;
	transactionContainer.appendChild(transactionId);

	const transactionType = document.createElement("span");
	transactionType.className = "transaction-type";
	transactionType.innerHTML = idReceptor ? "Transferência" : valor >= 0 ? "Deposito" : "Saque";
	transactionContainer.appendChild(transactionType);

	if (idPagador == currentUserAcc.id) {
		const receptor = document.createElement("span");
		receptor.className = "receptor";
		receptor.innerHTML = `Pago para conta nº ${idReceptor}`;
		transactionContainer.appendChild(receptor);
	} else if (idReceptor == currentUserAcc.id) {
		const pagoPor = document.createElement("span");
		pagoPor.className = "pagopor";
		pagoPor.innerHTML = `Pago pela conta nº ${idPagador}`;
		transactionContainer.appendChild(pagoPor);
	}

	const amount = document.createElement("span");
	amount.className = "valor";
	amount.innerHTML = `Valor: R$ ${Math.abs(valor.toFixed(2))}`;
	transactionContainer.appendChild(amount);

	const transactionDate = document.createElement("span");
	transactionDate.className = "transaction-date";
	transactionDate.innerHTML = date;
	transactionContainer.appendChild(transactionDate);

	return transactionContainer;
};

const getTransactionList = async () => {
	const url = `${host}/transacoes/${currentUserAcc.id}`;

	return await axios.get(url);
};

const getClientById = async (id) => {
	const url = `${host}/cliente/${id}`;

	return await axios.get(url);
};

const updateCurrentUserInfo = async (id) => {
	getAccList().then((response) => {
		currentUserAcc = response.find((acc) => acc.id == id);
		document.getElementById("welcome-user").innerHTML = `Bem Vindo ${currentUserAcc.nomeCliente.split(" ")[0]}!`;
		console.log(currentUserAcc);
	});
};

const getAccList = async () => {
	const url = `${host}/contas`;
	const response = await axios.get(url);
	return response.data;
};

updateCurrentUserInfo(currentUserAcc.id);
