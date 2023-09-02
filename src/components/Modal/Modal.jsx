import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { ModalOverlay, ModalContainer } from './Modal.styled';

const modalBox = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleClick}>
      <ModalContainer>{children}</ModalContainer>
    </ModalOverlay>,
    modalBox
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;