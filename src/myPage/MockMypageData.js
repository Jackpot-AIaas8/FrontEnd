const mockMypageData = {
  member: {
    email: "example@example.com",
    pwd: "securePassword123",
    name: "John Doe",
    phone: "+82 10-1234-5678",
    nickName: "Johnny",
    address: "123 Main St, Seoul, South Korea",
  },
  returnItems: [
    { shopId: 1, name: "사료", category: "식자재", status: "반품 요청", price: 10000 },
    { shopId: 2, name: "인형", category: "장난감", status: "환불 완료", price: 20000 },
    { shopId: 3, name: "유모차", category: "개모차", status: "반품 요청", price: 30000 },
    { shopId: 4, name: "밥그릇", category: "식자재", status: "주문 취소", price: 40000 },
    { shopId: 5, name: "하네스", category: "의류", status: "반품 요청", price: 50000 },
  ],
  fundingItems: [
    { fundId: 1, dogId: 101, amount: 50000 },
    { fundId: 2, dogId: 102, amount: 30000 },
    { fundId: 3, dogId: 103, amount: 70000 },
    { fundId: 4, dogId: 104, amount: 150000 },
    { fundId: 5, dogId: 105, amount: 80000 },
  ],
};

export default mockMypageData;
