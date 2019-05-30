import axios from "axios";

class BusinessService {
  constructor() {
    this.business = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }
  // ======== BUSINESS SERVICES =================================================== //

  getBusiness() {
    return this.business
      .get("/business")
      .then(({ data }) => data);
  }

  updateBusiness(business){
    return this.business
      .put(`/business/update`, business)
      .then(({ data }) => data);
  }
  // ======== WORKER SERVICES ======================================================== //

  getAWorker(id) {
    return this.business
      .get(`/business/workers/${id}`)
      .then(({ data }) => data);
  }

  addWorker(worker){
    return this.business
      .post(`/business/workers-add`, worker)
      .then(({ data }) => data);
  }

  updateWorker(worker,id){
    return this.business
      .put(`/business/workers/${id}/update`, worker)
      .then(({ data }) => data);
  }
  
  deleteWorker(id){
    return this.business
      .delete(`/business/workers/${id}/delete`)
      .then(({ data }) => data);
  }
  // ======== PROMOTION SERVICES ============================================================= //

  getAPromotion(id) {
    return this.business
      .get(`/business/promotions/${id}`)
      .then(({ data }) => data);
  }
  addPromotion(promotion){
    return this.business
      .post(`/business/promotions-add`, promotion)
      .then(({ data }) => data);
  }

  updatePromotion(promotion,id){
    return this.business
      .put(`/business/promotions/${id}/update`, promotion)
      .then(({ data }) => data);
  }
  
  deletePromotion(id){
    return this.business
      .delete(`/business/promotions/${id}/delete`)
      .then(({ data }) => data);
  } 
// ======== img SERVICES ============================================================= //

  imageUpload(file) {
    return this.business
    .post('/business/image', file)
    .then(({data}) => data)
  }

  }

const business = new BusinessService();

export default business;
