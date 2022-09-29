import createApiClient from "./api.service";
class GioHangService{ 
  constructor(baseUrl = "/api/gioHang"){
    this.api = createApiClient(baseUrl);
  }
  async getAll(){
    return (await this.api.get("/")).data;
  }
  async getAll1(){
    return (await this.api.get("/all/1")).data;
  }
  async create(data){
    return (await this.api.post("/", data)).data;
  }
  async deleteAll(){
    return (await this.api.delete("/")).data;
  }
  async deleteAll1(){
    return (await this.api.delete("/all/1")).data;
  }
  async get(id){
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data){
    return (await this.api.put(`/${id}`, data)).data;
  }
  async updateMany(){
    return (await this.api.put("/")).data;
  }
  async delete(id){
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new GioHangService();