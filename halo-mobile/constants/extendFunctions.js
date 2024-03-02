const extendFunctions = {
  getAvatarName: (name) => {
    // Tách chuỗi thành mảng các từ
    const fullName = name.split(" ");
    // Lấy chữ cái đầu của họ
    const ho = fullName[0][0].toUpperCase();
    // Lấy chữ cái đầu của tên
    const ten = fullName[fullName.length - 1][0].toUpperCase();
    // Trả về kết quả
    const result = ho + "" + ten;
    return result;
  },
};
export default extendFunctions;
