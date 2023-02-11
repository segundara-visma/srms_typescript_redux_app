import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectCurrentPage, selectNumOfPages, setCurrentPage } from '../paginationSlice';

const RenderLastButton = () => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const numOfPages = useAppSelector(selectNumOfPages)
  return (
    <>
      {numOfPages && currentPage < numOfPages ? (
        <Button
          className="btn-secondary"
          style={{ cursor: "pointer", marginLeft: "2px", marginRight: "2px" }}
          onClick={() => dispatch(setCurrentPage(numOfPages))}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      ) : (
        <Button className="btn-secondary" style={{ marginLeft: "2px", marginRight: "2px" }} disabled>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Button>
      )}
    </>
  );
}
export default RenderLastButton;