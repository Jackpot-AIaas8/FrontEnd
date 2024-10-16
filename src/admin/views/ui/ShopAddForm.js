import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import "../../assets/scss/style.scss";
import React, {useState} from "react";
import apiClient from "../../../token/AxiosConfig";

const ShopAddFrom = () => {
    const [shop, setShop] = useState({
        name: '',
        price: '',
        category: '',
        detail: '',
        buy_count: 0,
        img: null
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setShop({
            ...shop,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setShop({
            ...shop,
            img: e.target.files[0]
        });
    };

    const addShop = () => {
        const formData = new FormData();
        formData.append('name', shop.name);
        formData.append('price', shop.price);
        formData.append('category', shop.category);
        formData.append('detail', shop.detail);
        formData.append('buy_count', shop.buy_count);
        formData.append('img', shop.img); // 파일 전송 시 FormData에 파일 추가

        apiClient.post('/admin/shop/register', formData, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(response => {
                alert("상품이 등록 되었습니다.");
                window.location.href = '/admin/shoptable';
            })
            .catch(error => {
                console.error('상품 등록 실패:', error);
            });
    };
    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        상품 등록
                    </CardTitle>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">상품명</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="상품명"
                                    value={shop.name}
                                    onChange={handleInputChange} // 이벤트 핸들러 추가
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">가격</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    placeholder="상품가격"
                                    value={shop.price}
                                    onChange={handleInputChange} // 이벤트 핸들러 추가
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">종류</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    type="select"
                                    value={shop.category}
                                    onChange={handleInputChange} // 이벤트 핸들러 추가
                                >
                                    <option value={0}>식품</option>
                                    <option value={1}>장난감</option>
                                    <option value={2}>가구</option>
                                    <option value={3}>개모차</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="detail">설명</Label>
                                <Input id="detail"
                                       name="detail"
                                       placeholder="상품설명"
                                       type="textarea"
                                       value={shop.detail}
                                       onChange={handleInputChange} // 이벤트 핸들러 추가
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="buy_count">매입 재고</Label>
                                <Input id="buy_count"
                                       name="buy_count"
                                       placeholder="매입 재고"
                                       type="number"
                                       value={shop.buy_count}
                                       onChange={handleInputChange} // 이벤트 핸들러 추가
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">사진</Label>
                                <Input
                                    id="img"
                                    name="img"
                                    type="file"
                                    onChange={handleFileChange} // 파일 변경 핸들러 추가
                                />
                            </FormGroup>
                            <Button onClick={addShop}>등록</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default ShopAddFrom;
