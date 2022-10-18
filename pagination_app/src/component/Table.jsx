function objectValues(obj) {
  return Object.entries(obj).map(([key, value], index) =>
    typeof value === "object" ? (
      objectValues(value)
    ) : (
      <li key={index}>
        {key.toUpperCase()} : {value}
      </li>
    )
  );
}
// objectValues function is used to convert object to array of li elements and then render it in ul element

function Table(props) {
  return (
    <table>
      <thead>
        <tr>
          {props.thead.map((item, index) => (
            <th key={index}>{item.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.tbody.map((item, index) => (
          <tr key={index}>
            {props.thead.map((key, index) =>
              typeof item[key] === "object" ? (
                <td key={index}>
                  <ul>{objectValues(item[key])}</ul>
                </td>
              ) : (
                <td key={index}>{item[key]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
// Table component is used to render table with thead and tbody elements and it takes props as thead and tbody which are array of objects

export default Table;
