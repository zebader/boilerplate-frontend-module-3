import axios from "axios";

class PromotionsService {
  constructor() {
    this.promotions = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }
  // ======== promotions SERVICES =================================================== //

  getPromotions() {
    return this.promotions
      .get("/api/promotions")
      .then(({ data }) => data);
  }
  
  getAPromotion(id) {
    return this.promotions
      .get(`/api/promotions/${id}`)
      .then(({ data }) => data);
  }

  // ======== TIP WORKER SERVICES ======================================================== //

  getAPromotionsWorker(workerid,id) {
    return this.promotions
      .get(`/api/promotions/${id}/workers/${workerid}`)
      .then(({ data }) => data);
  }
  updateTipWorker(worker,workerid,id){
    return this.promotions
      .put(`/api/promotions/${id}/workers/${workerid}/rate`, worker)
      .then(({ data }) => data);
  }
  
  // ======== PROMOTION SERVICES ============================================================= //

  getAPromotionsPromo(promotionid,id) {
    return this.promotions
      .get(`/api/promotions/${id}/promotions/${promotionid}`)
      .then(({ data }) => data);
  }

  claimPromotion(promotionid,id){
    return this.promotions
      .put(`/api/promotions/${id}/promotions/${promotionid}/rate`)
      .then(({ data }) => data);
  }
  }

const promotions = new PromotionsService();

export default promotions;
