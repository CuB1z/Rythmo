import { useState } from 'react';
import Modal from '@components/react/Modal.jsx';
import Button from '@components/react/Button.jsx';

const AddEventForm = ({ show, setShow, onAddEvent }) => {
    const [newEvent, setNewEvent] = useState({ date: '', name: '', subject: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(newEvent);
        setNewEvent({ date: '', name: '' , subject: ''});
        setShow(false);
    };

    return (
        <Modal title="New Event" show={show} setShow={setShow}>
            <form>
                <label>
                    <span>Date</span>
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        required
                    />
                </label>
                <label>
                    <span>Event</span>
                    <input
                        type="text"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        required
                    />
                </label>
                <label>
                    <span>Subject</span>
                    <input
                        type="text"
                        value={newEvent.subject}
                        onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })}
                        required
                    />
                </label>
                <Button onClick={(e) => handleSubmit(e)}>
                    <span>Add</span>
                </Button>
            </form>
        </Modal>
    );
};

export default AddEventForm;