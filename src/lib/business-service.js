import axios from "axios";

class BusinessService {
  constructor() {
    this.business = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }

  getBusiness() {
    return this.business
      .get("/business")
      .then(({ data }) => data);
  }
}

const business = new BusinessService();

export default business;
