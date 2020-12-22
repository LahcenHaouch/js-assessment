## Code

```js
function Employee({ id }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setLoading(false);
      })
      .catch((_) => {
        setError("Unable to fetch employee");
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <Row>
        <Cell>{employee.firstName}</Cell>
        <Cell>{employee.lastName}</Cell>
        <Cell>{employee.position}</Cell>
        <Cell>{employee.project}</Cell>
        <Cell>{employee.salary}</Cell>
        <Cell>{employee.yearHired}</Cell>
        <Cell>{employee.wololo}</Cell>
      </Row>
    </Table>
  );
}
```

## Review

Since loading, error and employee are linked, I suggest either using one state or useReducer.

Also for the table row, I'm not sure if we're displaying all the employee's properties, if it's the case we can refacto the code and have an array of cells.

And i think we need a check for employee to see if it's defined

```js
function Employee({ id }) {
  const [state, useState] = useState({
    error: null,
    loading: true,
    employee: {},
  });

  const { error, loading, employee } = state;

  useEffect(() => {
    getEmployee(id)
      .then((employee) => {
        setState({
          loading: false,
          employee,
        });
      })
      .catch((_) => {
        setState({
          loading: false,
          error: "Unable to fetch employee",
        });
      });
  }, [id]);

  if (error || !employee) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <Row>
        <Cell>{employee.firstName}</Cell>
        <Cell>{employee.lastName}</Cell>
        <Cell>{employee.position}</Cell>
        <Cell>{employee.project}</Cell>
        <Cell>{employee.salary}</Cell>
        <Cell>{employee.yearHired}</Cell>
        <Cell>{employee.wololo}</Cell>
      </Row>
    </Table>
  );
}
```
