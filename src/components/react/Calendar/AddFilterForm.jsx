import { useState } from 'react';
import Modal from '@components/react/Modal.jsx';
import Button from '@components/react/Button.jsx';

const AddFilterForm = ({ show, setShow, onAddFilter }) => {
    const [filter, setFilterSubject] = useState({ subject: '' });

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
                    <span>Subject</span>
                    <input
                        type="text"
                        value={filter.subject}
                        onChange={(e) => setFilterSubject({ ...filter, subject: e.target.value })}
                        required
                    />
                </label>
                <Button type="submit">
                    <span>Add</span>
                </Button>
            </form>
        </Modal>
    );
};

export default AddFilterForm;