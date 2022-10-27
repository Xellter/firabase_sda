// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { firebaseConfig } from "./config";
import { initTaskList } from "./list";
import { addTask } from "./add";
import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const tasksCollection = collection(database, "tasks");

const initEditTaskForm = (database) => {
	const editTaskForm = document.querySelector("#editTaskForm");
	if (editTaskForm) {
		editTaskForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(editTaskForm);
			const deadline = formData.get("deadline");
			const deadlineDate = new Date(deadline);
			const deadlineTimestamp = Timestamp.fromDate(deadlineDate);
			const docRef = doc(database, "tasks", formData.get("id"));
			updateDoc(docRef, {
				title: formData.get("title"),
				deadline: deadlineTimestamp,
			}).then((result) => {
				console.log("Zaktualizowano zadanie");
			});
		});
	}
};

initTaskList(tasksCollection, database);
addTask(tasksCollection);
initEditTaskForm(database);
