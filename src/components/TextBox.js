import { useState, useEffect } from 'react';
import '../styles/TextBox.css';
import { TextField, Box, Radio, RadioGroup, Select, MenuItem, FormControlLabel, ListItemText, OutlinedInput, Checkbox, Chip, Button } from '@mui/material';
import RichtextEditor from './RichtextEditor';


export default function TextBox({ questions, setQuestions, handleAddPage, handleRemovePage, currentQuestion }) {

    const [tolerance, setTolerance] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [level, setLevel] = useState('easy');
    const [marks, setMarks] = useState(0);
    const [editorState, setEditorState] = useState('');
    const [domains, setDomains] = useState([]);
    const [allDomains, setAllDomains] = useState(['Domain 1', 'Domain 2', 'Domain 3', 'Domain 4', 'Domain 5']);

    useEffect(() => {
        if (currentQuestion) {
            setTolerance(currentQuestion.tolerance);
            setMinutes(currentQuestion.minutes);
            setSeconds(currentQuestion.seconds);
            setLevel(currentQuestion.level);
            setMarks(currentQuestion.marks);
            setDomains(currentQuestion.domains);
            setEditorState(currentQuestion.description);
        } else {
            setTolerance(0);
            setMinutes(0);
            setSeconds(0);
            setLevel('easy');
            setMarks(0);
            setDomains([]);
            setEditorState('');
        }
    }, [currentQuestion]);

    const handleDomainSelect = (event) => {
        const {
            target: { value },
        } = event;
        setDomains(typeof value === 'string' ? value.split(',') : value);
    }

    const handleAddQuestion = () => {
        const question = {
            description: editorState,
            tolerance: tolerance,
            minutes: minutes,
            seconds: seconds,
            level: level,
            marks: marks,
            domains: domains
        };
        setQuestions([...questions, question]);
        setTolerance(0);
        setMinutes(0);
        setSeconds(0);
        setLevel('easy');
        setMarks(0);
        setDomains([]);
        setEditorState('');
        handleAddPage();
    }

    const handleRemoveQuestion = () => {
        currentQuestion = questions[questions.length - 1];
        handleRemovePage();
    }

    return (
        <Box sx={{
            padding: '2rem 10rem',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <h2>Question Discription</h2>
            <RichtextEditor editorState={editorState} setEditorState={setEditorState} />

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: '2rem'
            }}>
                <h2>Tolerance Level (in %) : </h2>
                <TextField label="Tolerance %" variant="outlined" size='small' value={tolerance}
                    onChange={(e) => setTolerance(e.target.value)}
                    sx={{
                        marginLeft: '2rem'
                    }} />
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: '2rem'
            }}>
                <h2>Set Timer : </h2>
                <TextField label="Minutes" variant="outlined" size='small' value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    sx={{
                        marginLeft: '2rem',
                        marginRight: '1rem'
                    }} />
                <h2> : </h2>
                <TextField label="Seconds" variant="outlined" size='small' value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    sx={{
                        marginLeft: '1rem'
                    }} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: '2rem',
                alignItems: 'center'
            }}>
                <h2>Level of Question : </h2>
                <RadioGroup
                    value={level}
                    name="radio-buttons-group"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        ml: '2rem',
                        alignItems: 'center'
                    }}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                    <FormControlLabel value="meduim" control={<Radio />} label="Medium" />
                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                </RadioGroup>
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: '2rem',
            }}>
                <h2>Domains : </h2>
                <Select
                    multiple
                    value={domains}
                    onChange={handleDomainSelect}
                    input={<OutlinedInput size='small' />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    sx={{
                        ml: '2rem',
                    }}
                >
                    {allDomains.map((domain) => (
                        <MenuItem key={domain} value={domain}>
                            <Checkbox checked={domains.indexOf(domain) > -1} />
                            <ListItemText primary={domain} />
                        </MenuItem>
                    ))}
                </Select>

                <h2 style={{
                    marginLeft: '4rem'
                }}>Add Domain : </h2>
                <TextField label="Custom Domain" variant="outlined" size='small'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setAllDomains([...allDomains, e.target.value]);
                            setDomains([...domains, e.target.value]);
                            e.target.value = '';
                        }
                    }}
                    sx={{
                        marginLeft: '2rem',
                        marginRight: '1rem'
                    }} />
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                mt: '2rem'
            }}>
                <h2>Marks for Question : </h2>
                <TextField label="Marks out of 100" variant="outlined" size='small' type='number' value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    sx={{
                        marginLeft: '2rem'
                    }} />
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}>
                <Button variant='contained' color='primary' onClick={handleAddQuestion} sx={{
                    mt: '4rem',
                    mb: '2rem',
                    p: '0 2rem'
                }}><h3>Add Question +</h3></Button>

                <Button variant='contained' color='primary' onClick={handleRemoveQuestion} sx={{
                    mt: '4rem',
                    mb: '2rem',
                    p: '0 2rem'
                }}><h3>Remove Question -</h3></Button>
            </Box>


        </Box >
    )
}
