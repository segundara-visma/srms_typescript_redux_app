import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectCurrentPage, setCurrentPage } from '../paginationSlice';

const RenderPrevButton = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  return (
    <>
      {currentPage > 1 ? (
        <Button
            className="btn-secondary"
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
            <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      ) : (
        <Button className="btn-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
            <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      )}
    </>
  );
}
export default RenderPrevButton;