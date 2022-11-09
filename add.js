import { Timestamp, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import {user}
export const initAddTaskForm = (tasksCollection, user, storage) => {
	const addTaskForm = document.querySelector("#addTaskForm");

	if (addTaskForm) {
		addTaskForm.addEventListener("submit", (event) => {
			event.preventDefault(); // zatrzymuję domyślną akcje

			const formData = new FormData(addTaskForm); // wbudowania funkcja js pobiera dane z formularza po atrybucie name

			const deadlineDate = new Date(formData.get("deadline"));
			const deadlineTimestamp = Timestamp.fromDate(deadlineDate);
			const file = formData.get("attachment");
			if (file && file.size > 0) {
				const fileRef = ref(storage, "attachments/" + file.name);
				uploadBytes(fileRef, file).then((result) => {
					getDownloadURL(result.ref).then((url) => {
						addDoc(tasksCollection, {
							title: formData.get("title"),
							deadline: deadlineTimestamp,
							done: false,
							order: +formData.get("order"),
							userId: user.uid,
							attachment: url,
						}).then((result) => {
							console.log("zadanie zostało dodane do firestore");
							console.log(result);
							window.location.reload();
						});
					});
				});
			}else {
				addDoc(tasksCollection, {
					title: formData.get("title"),
					deadline: deadlineTimestamp,
					done: false,
					order: +formData.get("order"),
					userId: user.uid,
				}).then((result) => {
					console.log("zadanie zostało dodane do firestore");
					console.log(result);
					window.location.reload();
				});
			}
		});
	}
};
