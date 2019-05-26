import axios from "axios";

class CustomerService {
  constructor() {
    this.customer = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }
  // ======== customer SERVICES =================================================== //

  getCustomer() {
    return this.customer
      .get("/customer")
      .then(({ data }) => data);
  }

  updateCustomer(customer){
    return this.customer
      .put(`/customer/update`, customer)
      .then(({ data }) => data);
  }
  // ======== WORKER SERVICES ======================================================== //

  getAWorker(id) {
    return this.customer
      .get(`/customer/workers/${id}`)
      .then(({ data }) => data);
  }

  addWorker(worker){
    return this.customer
      .post(`/customer/workers-add`, worker)
      .then(({ data }) => data);
  }

  updateWorker(worker,id){
    return this.customer
      .put(`/customer/workers/${id}/update`, worker)
      .then(({ data }) => data);
  }
  
  deleteWorker(id){
    return this.customer
      .delete(`/customer/workers/${id}/delete`)
      .then(({ data }) => data);
  }

  }

const Customer = new CustomerService();

export default Customer;
