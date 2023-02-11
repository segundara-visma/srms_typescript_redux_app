import Stack from 'react-bootstrap/Stack';
import VisiblePageNumbers from './paginationButtons/VisiblePageNumbers';
import PreviousPageButton from './paginationButtons/PreviousPageButton';
import NextPageButton from './paginationButtons/NextPageButton';
import FirstPageButton from './paginationButtons/FirstPageButton';
import LastPageButton from './paginationButtons/LastPageButton';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentPage, selectMaxVisible } from './paginationSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

let NumOfPages: number

function Pagination({numOfPages = NumOfPages}) {
  const currentPage = useAppSelector(selectCurrentPage)
  const maxVisible = useAppSelector(selectMaxVisible)

    return (
        <Stack direction="horizontal">
          <FirstPageButton/>
          <PreviousPageButton/>
          {maxVisible && numOfPages && currentPage > Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <FontAwesomeIcon icon={faEllipsisH} style={{ marginLeft: "2px", marginRight: "2px" }}/>
          )}
          <VisiblePageNumbers
            numOfPages={numOfPages}
          />
          {maxVisible && numOfPages && maxVisible % 2 === 1 ? (currentPage <= numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <FontAwesomeIcon icon={faEllipsisH} style={{ marginLeft: "2px", marginRight: "2px" }}/>
          ))
          :(maxVisible && numOfPages && currentPage < numOfPages - Math.ceil(maxVisible / 2) && numOfPages > maxVisible && (
            <FontAwesomeIcon icon={faEllipsisH} style={{ marginLeft: "2px", marginRight: "2px" }}/>
          ))}
          <NextPageButton/>
          <LastPageButton/>
        </Stack>
    );
}

export default Pagination;