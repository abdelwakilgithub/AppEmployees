import client from "./client";

const endpoint = "/departments";

const getDepartments = () => {
  console.log("..........getDepartments............", client.get(endpoint));
  return client.get(endpoint);
};

// const getDepartmentById = (id) => client.get(endpoint + "/" + id);

// const addDepartment = (id, department) => {
//   if (id !== "new") return client.put(endpoint + "/" + id, department);

//   return client.post(endpoint, department);
// };

// const deleteDepartment = (id) => {
//   client.delete(endpoint + "/" + id);
// };

const departmentsApi = {
  getDepartments,
  //   getDepartmentById,
  //   addDepartment,
  //   deleteDepartment,
};

export default departmentsApi;
