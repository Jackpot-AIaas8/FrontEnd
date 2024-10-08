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

const DogAddFrom = () => {
    return (
        <Row>
            <Col>
                {/* --------------------------------------------------------------------------------*/}
                {/* Card-1*/}
                {/* --------------------------------------------------------------------------------*/}
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        강아지 등록
                    </CardTitle>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="naem">이름</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="강아지 이름"

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="species">종</Label>
                                <Input
                                    id="species"
                                    name="species"
                                    placeholder="강아지 종"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="age">나이</Label>
                                <Input id="age" name="age" placeholder="강아지 나이">
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender">성별</Label>
                                <Input
                                    id="gender"
                                    name="gender"
                                    type="select"
                                >
                                    <option value={0}>수컷</option>
                                    <option value={1}>암컷</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="detail">설명</Label>
                                <Input id="detail" name="detail" type="textarea"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="img">사진</Label>
                                <Input id="img" name="img" type="file"/>
                            </FormGroup>
                            <Button>등록</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default DogAddFrom;
