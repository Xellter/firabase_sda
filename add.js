import { Timestamp, addDoc } from "firebase/firestore";
export const addTask = (tasksCollection) => {
	const addTaskForm = document.querySelector("#addTaskForm");

	if (addTaskForm) {
		addTaskForm.addEventListener("submit", (event) => {
			event.preventDefault(); // zatrzymuję domyślną akcje

			const formData = new FormData(addTaskForm); // wbudowania funkcja js pobiera dane z formularza po atrybucie name

			const deadlineDate = new Date(formData.get("deadline"));
			const deadlineTimestamp = Timestamp.fromDate(deadlineDate);

			addDoc(tasksCollection, {
				title: formData.get("title"),
				deadline: deadlineTimestamp,
				done: false,
			}).then((result) => {
				console.log("zadanie zostało dodane do firestore");
				console.log(result);
				window.location.reload();
			});
		});
	}
};
