const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.malId}</td>
            <td>{item.title.english}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;