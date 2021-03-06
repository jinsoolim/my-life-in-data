import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Input, Modal, Button, Icon, Card } from 'semantic-ui-react';
import DataSetTile from './DataSetTile';

const HomePage = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState();
  const [modalDataSetId, setModalDataSetId] = useState();
  const [modalInputValue, setModalInputValue] = useState();

  const datasets = useStoreState((state) => state.datasets.items);

  const openAddPointModal = (dataset) => {
    setModalDataSetId(dataset._id);
    setModalName(dataset.name);
    setModalInputValue('');
    setModalOpen(true);
  };

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <Card.Group>
          {datasets.map((dataset) => (
            <DataSetTile
              dataset={dataset}
              key={dataset._id}
              openAddPointModal={() => openAddPointModal(dataset)}
              viewMetrics={() => console.log(dataset._id)}
            />
          ))}
        </Card.Group>
      </div>

      <Modal
        closeIcon
        size="mini"
        onClose={() => setModalOpen(false)}
        open={modalIsOpen}
      >
        <Modal.Header>Create a new point in {modalName}</Modal.Header>
        <Modal.Content
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Input
            focus
            value={modalInputValue}
            onChange={(e) => setModalInputValue(e.target.value)}
            type="number"
            placeholder="Input Num"
          ></Input>
          <Button onClick={() => setModalOpen(false)}>OK</Button>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default HomePage;
