import {Card, CardBody, CardTitle, Table} from "reactstrap";
import React from "react";
import {useState, useEffect} from "react";
import Button from "../button/ShopButton";
import apiClient from "../../../token/AxiosConfig";
import {useNavigate} from 'react-router-dom';
import Search from "../Search";

const BoardTables = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);
    const [searchText, setSearchText] = useState(""); // 검색어 상태 추가

    useEffect(() => {
        apiClient
            .get("/admin/board/findAll")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setBoards(res.data);  // 배열이면 바로 설정
                } else if (res.data && Array.isArray(res.data.dtoList)) {
                    setBoards(res.data.dtoList);  // dtoList가 배열인 경우 설정
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const searchShops = (searchText = "") => {
        const endpoint = searchText ? `/shop/search?name=${searchText}` : "/admin/shop/findList";
        apiClient
            .get(endpoint)
            .then((res) => {
                setBoards(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleSearch = (searchText) => {
        setSearchText(searchText);
        searchShops(searchText); // 검색어로 상점 가져오기
    };

    const sortedBoards = boards.sort((a, b) => {
        // 공지사항(1), 1대1 문의게시판(3), 자유게시판(2) 순으로 정렬
        const order = [1, 3, 2];
        return order.indexOf(a.type) - order.indexOf(b.type);
    });
    return (
        <div>
            <Card>
                <CardBody>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <CardTitle tag="h5">게시글 목록</CardTitle>
                        <Search onSearch={handleSearch}/>
                        <Button/>
                    </div>
                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                        <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>게시글 종류</th>
                            <th>등록 날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedBoards.map((board, index) => (
                            <tr key={index} className="border-top">
                                <td>
                                    <div className="d-flex align-items-center p-2">
                                        <div className="ms-3">
                                            <h6 className="mb-0">{board.title}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>{board.content}</td>
                                <td>
                                    {board.type === 1 && '공지사항'}
                                    {board.type === 2 && '자유게시판'}
                                    {board.type === 3 && '1대1 문의게시판'}
                                </td>
                                <td>{board.regdate}</td>
                                <td onClick={() => navigate(`/admin/shopdetailform/${board.boardId}`)}>
                                    상세<i className="bi bi-arrow-right-circle"></i>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};

export default BoardTables;
