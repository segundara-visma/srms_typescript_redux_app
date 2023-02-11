import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectCurrentPage, selectNumOfPages, setCurrentPage } from '../paginationSlice';

const RenderNextButton = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const numOfPages = useAppSelector(selectNumOfPages)
  return (
    <>
      {numOfPages && currentPage < numOfPages ? (
        <Button
            className="btn-secondary"
            style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      ) : (
        <Button className="btn-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      )}
    </>
  );
}
export default RenderNextButton;