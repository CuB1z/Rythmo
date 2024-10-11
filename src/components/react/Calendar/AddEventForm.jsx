import { useState } from 'react';
import Modal from '@components/react/Modal.jsx';
import Button from '@components/react/Button.jsx';

const AddEventForm = ({ show, setShow, onAddEvent }) => {
    const [newEvent, setNewEvent] = useState({ date: '', name: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(newEvent);
        setNewEvent({ date: '', name: '' });
        setShow(false);
    };

    return (
        <Modal title="Añadir Evento" show={show} setShow={setShow}>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Evento:
                    <input
                        type="text"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        required
                    />
                </label>
                <Button type="submit" style={{ display: 'block' }}>Añadir</Button>
            </form>
        </Modal>
    );
};

export default AddEventForm;