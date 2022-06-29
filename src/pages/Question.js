import { useState } from 'react';
import { Box, Button, Pagination } from '@mui/material';
import TextBox from '../components/TextBox';

export default function Question() {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  const [questions, setQuestions] = useState([])

  const handleAddPage = () => {
    setPage(page + 1);
    setPageCount(pageCount + 1);
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      mt: '2rem',
      mb: '10rem'
    }}>

      <h1 className='questionHeading'>Question {page}</h1>

      <TextBox questions={questions} setQuestions={setQuestions} handleAddPage={handleAddPage} currentQuestion={questions[page - 1]} />


      <Pagination onChange={(e, v) => setPage(v)} count={pageCount} page={page} color='primary' sx={{
        m: '0 auto'
      }} />

      <Button variant='contained' color='success' sx={{
        m: '4rem auto',
        p: '0 2rem'
      }}><h3>Submit All Questions</h3></Button>
    </Box>
  );
}
