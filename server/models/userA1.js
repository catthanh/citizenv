const pool = require("../config/pool");
class UserA1 extends User {
  constructor(username, password) {
    super(username, password, "A1");
  }

  // kkhai bao va cap ma cho tinh
  createProvince() {}
  // cap tai khoan
  createAccount() {}
  // mo quyen khai bao
  openDeclaration() {}
  // theo doi tien do
  checkProgress() {}
  //phan tich

  // xem danh sach
  citizenList() {}
  // xem thong tin mot nguoi dan bat ki
  citizenInfo() {}
}
