const role = {
    admin: "admin",
    A1: "Tổng cục Dân số",
    A2: "Chi cục dân số ",
    A3: "Phòng Y tế ",
    B1: "Trạm Y tế",
    B2: "Cộng tác viên",
};

const createChild = {
    admin: "khu vực",
    A1: "tỉnh",
    A2: "quận/ huyện",
    A3: "phường/ xã",
    B1: "khối xóm",
    B2: "tổ dân phố",
};

const childCodeLength = {
    A1: 2,
    A2: 4,
    A3: 6,
    B1: 8,
};

export { role, createChild, childCodeLength };
