import React, { useEffect } from 'react';
import io from 'socket.io-client';  // socket.io-client import

const socket = io('http://localhost:3001',
  {
    transports: ['websocket'],  // WebSocket으로만 연결 시도
    upgrade: false  // Long Polling으로 업그레이드 방지
  }
);  // Node.js WebSocket 서버에 연결

const AuctionWebSocket = ({ onAuctionUpdate }) => {
  useEffect(() => {
    // WebSocket으로 경매 업데이트 받기
    socket.on('auction update', (data) => {
      console.log('Received auction update:', data);
      onAuctionUpdate(data);  // 부모 컴포넌트에 데이터 전달
    });

    return () => {
      socket.off('auction update');  // 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, [onAuctionUpdate]);

  return null;  // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default AuctionWebSocket;
