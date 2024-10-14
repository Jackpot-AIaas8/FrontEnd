import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ToysIcon from '@mui/icons-material/Toys';
import ChairIcon from '@mui/icons-material/Chair';
import StrollerIcon from '@mui/icons-material/Stroller';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GavelIcon from '@mui/icons-material/Gavel';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ setCategory }) {
  const navigate = useNavigate();

  // 카테고리 항목
  const menuItemsGroup1 = [
    { text: '식품', icon: <RestaurantIcon sx={{ color: 'black' }} />, category: 0 },
    { text: '장난감', icon: <ToysIcon sx={{ color: 'black' }} />, category: 1 },
    { text: '가구', icon: <ChairIcon sx={{ color: 'black' }} />, category: 2 },
    { text: '유모차', icon: <StrollerIcon sx={{ color: 'black' }} />, category: 3 },
  ];

  // 다른 기능 항목 (예: 장바구니, 실시간 경매 등)
  const menuItemsGroup2 = [
    { text: '장바구니', icon: <ShoppingCartIcon sx={{ color: 'black' }} />, link: '/cart' },
    { text: '실시간 경매', icon: <GavelIcon sx={{ color: 'black' }} />, link: '/auction' }
  ];

  const handleCategorySelect = (item) => {
    if (setCategory) {
      setCategory(item.category); // 카테고리 상태 업데이트
    }
    // URL에 카테고리 추가해서 이동
    navigate(`/shop?category=${item.category}`);
  };

  return (
    <Box sx={{ display: 'flex', zIndex: 1000 }}>
      <Toolbar />
      <Box
        sx={{
          position: 'fixed',
          top: '150px',
          left: '70px', // 왼쪽에 고정
          borderRadius: '10px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0',
          padding: '10px',
          backgroundColor: 'white',
          width: '20vw', // 화면 너비의 20% 차지
          maxWidth: '200px', // 최대 너비
          minWidth: '200px', // 최소 너비
          height: '70%',
          overflowY: 'auto',
          '@media (max-width: 768px)': {
            position: 'relative',
            width: '100%',
            height: 'auto',
          },
        }}
      >
        {/* 카테고리 섹션 */}
        <Accordion disableGutters elevation={0} square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemText primary="카테고리" />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {menuItemsGroup1.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => handleCategorySelect(item)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Divider />

        {/* 비카테고리 기능 섹션 */}
        <List>
          {menuItemsGroup2.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
