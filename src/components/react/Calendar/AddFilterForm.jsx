import { useState, useEffect } from 'react';
import Modal from '@components/react/Modal.jsx';
import Button from '@components/react/Button.jsx';
import { retrieveEvents } from '@utils/events.js'; // Importa la función para obtener eventos

const AddFilterForm = ({ show, setShow, onAddFilter }) => {
    const [filter, setFilterSubject] = useState({ subject: '' });
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const { data, error } = await retrieveEvents();
                if (error) {
                    console.error('Error al cargar los eventos:', error);
                    return;
                }
                // Extraer asignaturas únicas de los eventos
                const uniqueSubjects = [...new Set(data.map(event => event.subject))];
                setSubjects(uniqueSubjects);
            } catch (error) {
                console.error('Error al cargar las asignaturas:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFilter(filter.subject);
        setFilterSubject({ subject: '' });
        setShow(false);
    };

    return (
        <Modal title="New Filter" show={show} setShow={setShow}>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Subject</span><br />
                    <select
                        value={filter.subject}
                        onChange={(e) => setFilterSubject({ ...filter, subject: e.target.value })}
                        required
                    >
                        <option value="">Select a subject</option>
                        {subjects.map((subject, index) => (
                            <option key={index} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </label>
                <Button type="submit">
                    <span>Add</span>
                </Button>
            </form>
        </Modal>
    );
};

export default AddFilterForm;