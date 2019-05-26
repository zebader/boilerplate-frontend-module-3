import axios from "axios";

class PromotionsService {
  constructor() {
    this.promotions = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }
  // ======== promotions SERVICES =================================================== //

  getPromotions() {
    return this.promotions
      .get("/promotions")
      .then(({ data }) => data);
  }
  
  getAPromotion(id) {
    return this.promotions
      .get(`/promotions/${id}`)
      .then(({ data }) => data);
  }

  // ======== TIP WORKER SERVICES ======================================================== //

  getAPromotionsWorker(worker,id) {
    return this.promotions
      .get(`/promotions/${id}/workers/${worker.id}`)
      .then(({ data }) => data);
  }
  updateTipWorker(worker,id){
    return this.promotions
      .put(`/promotions/${id}/workers/${worker.id}/rate`, worker)
      .then(({ data }) => data);
  }
  
  // ======== PROMOTION SERVICES ============================================================= //

  getAPromotionsPromo(promotion,id) {
    return this.promotions
      .get(`/promotions/${id}/promotions/${promotion.id}`)
      .then(({ data }) => data);
  }

  claimPromotion(worker,id){
    return this.promotions
      .put(`/promotions/${id}/workers/${worker.id}/rate`, worker)
      .then(({ data }) => data);
  }

  }

const promotions = new PromotionsService();

export default promotions;
