import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectCurrentPage, setCurrentPage } from '../paginationSlice';

const RenderFirstButton = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  return (
    <>
      {currentPage > 1 ? (
        <Button
          className="btn-secondary"
          style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          onClick={() => dispatch(setCurrentPage(1))}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
      ) : (
        <Button className="btn-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Button>
      )}
    </>
  );
}
export default RenderFirstButton;