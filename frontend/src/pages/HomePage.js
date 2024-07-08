import TableRow from "../components/TableRow";
import styles from "./HomePage.module.css";
import { useSelector } from "react-redux";

// home page to show the table
function HomePage() {
	// load redux state
	const state = useSelector(state => state.uniData);

	return (
		<div className={styles.table_container}>
			<table className={styles.tableElement}>
				<thead>
					<tr>
						<th>No.</th>
						<th>alpha_two_code</th>
						<th>name</th>
						<th>domains</th>
						<th>web_pages</th>
						<th>country</th>
						<th>state-province</th>
					</tr>
				</thead>
				<tbody>
					{state.uniData.map((uni, index) => (
						<TableRow uni={uni} index={index}/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default HomePage;