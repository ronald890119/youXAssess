// reusable table row component
function TableRow(props) {
	return (
		<tr>
			<td>{props.index + 1}</td>
			<td>{props.uni["alpha_two_code"]}</td>
			<td>{props.uni["name"]}</td>
			<td>{props.uni["domains"].map((domain) => (
				<p>{domain}</p>
			))}
			</td>
			<td>{props.uni["web_pages"].map((domain) => (
				<p>{domain}</p>
			))}
			</td>
			<td>{props.uni["country"]}</td>
			{props.uni["state-province"] ? (
				<td>{props.uni["state-province"]}</td>
			) : (
				<td>NULL</td>
			)}
		</tr>
	);
}

export default TableRow;