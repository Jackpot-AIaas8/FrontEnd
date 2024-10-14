import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      // paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      try {
        const response = await fetch("http://localhost:8181/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
    
        if (!response.ok) {
          const text = await response.text(); // 응답이 빈 경우를 대비해 텍스트로 먼저 처리
          const json = text ? JSON.parse(text) : { message: "Unknown error", code: response.status };
    
          // 결제 실패 시 실패 페이지로 이동
          navigate(`/fail?message=${json.message}&code=${json.code}`);
          return;
        }
    
        // 결제 성공 시 추가 로직 구현
        const json = await response.json();
        console.log("결제 성공:", json);
    
        // 여기에 결제 성공 후 비즈니스 로직 추가
      } catch (error) {
        console.error("결제 확인 중 오류 발생:", error);
        navigate("/fail?message=결제 확인 중 오류 발생&code=500");
      }
    }
    confirm();
  }, []);

  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>
          결제 성공
        </h2>
        <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
        <p>{`결제 금액: ${Number(
          searchParams.get("amount")
        ).toLocaleString()}원`}</p>
        <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
      </div>
    </div>
  );
}

export default SuccessPage;