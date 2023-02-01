import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalViewer, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

  export function Modal({ closeModal, tags, modalImg }) {
    useEffect(() => {
     const handleKeyDown = e => {
       if (e.code === 'Escape') {
         closeModal();
       }
     };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
 

  const backDropClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={backDropClick}>
      <ModalViewer>
        <ModalImg src={modalImg} alt={tags} />
      </ModalViewer>
    </Overlay>,
    modalRoot
  );
};

// export class Modal extends React.Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeByEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeByEsc);
//   }

// closeByEsc = e => {
//   if (e.code !== 'Escape') {
//     return;
//   }
//   this.props.closeModal();
// };

//   render() {
//     const { closeModal, tags, modalImg } = this.props;

//     return createPortal(
//       <Overlay onClick={closeModal}>
//         <ModalViewer>
//           <ModalImg src={modalImg} alt={tags} />
//         </ModalViewer>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
