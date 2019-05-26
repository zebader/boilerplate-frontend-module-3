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
  // ======== wallet SERVICES ======================================================== //

  updateWallet(customer){
    return this.customer
      .put(`/customer/wallet/update`, customer)
      .then(({ data }) => data);
  }
  }

const Customer = new CustomerService();

export default Customer;
