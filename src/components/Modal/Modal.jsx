import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export default function Modal({ largeImage, onClose }) {
  const modalRoot = useRef(document.querySelector('#root'));

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = evt => {
    evt.preventDefault();
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = evt => {
    evt.preventDefault();
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={onBackdropClick}>
      <div className={css.modal}>
        <img src={largeImage} alt=""></img>
      </div>
    </div>,
    modalRoot.current
  );
}