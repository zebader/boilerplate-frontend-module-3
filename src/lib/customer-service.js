import axios from "axios";

class CustomerService {
  constructor() {
    this.customer = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
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
// ======== img SERVICES ============================================================= //

  imageUpload(file) {
    return this.customer
    .post('/business/image', file)
    .then(({data}) => data)
  }
}


const Customer = new CustomerService();

export default Customer;
