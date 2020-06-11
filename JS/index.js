const postUserCredentials = async () => {
	const form = document.getElementById("login-form");

	const url = `${host}/auth`;

	const account = {
		usuario: form.username.value,
		password: form.password.value,
	};

	return await axios.post(url, account);
};

const loginClicked = async () => {
	postUserCredentials()
		.then(({ data }) => {
			if (data) {
				window.location.href = "./home.html";
			} else {
				alert("Credenciais Inválidas");
			}
		})
		.catch((error) => {
			console.log(error);
			alert("Algo deu errado!");
		});
};
