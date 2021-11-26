import client from "./client";
import _ from "lodash";

const endpoint = "/employees";

const getEmployees = () => client.get(endpoint);

const getEmployeeById = (id) => client.get(endpoint + "/" + id);

const addEmployee = (id, employee) => {
  if (id !== "new") return client.put(endpoint + "/" + id, employee);

  return client.post(endpoint, employee);
};

const deleteEmployee = (id) => {
  client.delete(endpoint + "/" + id);
};

const getPossibleManagersDefault = async (id) => {
  const response = await getEmployees();
  const employees = response.data;
  if (id !== "new") return employees;
  const l = [{ id: parseInt(id, 10) }];
  console.log("LLLLLLLLLLLLLLLL........", l);
  let d = true;
  getPossibleManagers(d, employees, l);
  return lManagers;
};

let lManagers = [];
const getPossibleManagers = (d, employees, l) => {
  if (d) lManagers = employees;
  d = false;

  if (l[0]) {
    for (let i = 0; i < l.length; i++) {
      const l2 = _.filter(lManagers, { parent_employee: { id: l[i].id } });
      lManagers = lManagers.filter((m) => m.id !== l[i].id);
      getPossibleManagers(d, employees, l2);
    }
  }
};

const employeesApi = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  deleteEmployee,
  getPossibleManagersDefault,
};

export default employeesApi;
