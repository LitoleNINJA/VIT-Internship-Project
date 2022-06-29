import { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, Button, Pagination } from '@mui/material';
import TextBox from '../components/TextBox';

export default function Question() {
  const [pageCount, setPageCount] = useState(1);

  const handleAddPage = () => {
    setPageCount(pageCount + 1);
  }

  return (
    <Router>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Routes>
          <Route path="/:pageId" component={TextBox} />
        </Routes>

        <Link to={`/${pageCount + 1}`}>
          <Button variant='contained' color='primary' onClick={handleAddPage} sx={{
            m: '2rem auto'
          }}>Add Question +</Button>
        </Link>

        <Pagination count={pageCount} color='primary' sx={{
          m: '2rem auto'
        }} />
      </Box>
    </Router>

  );
}
