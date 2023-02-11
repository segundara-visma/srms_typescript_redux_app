import React, { useEffect } from "react";
import download from "downloadjs";
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { clearDownloadPDF } from "../../actions/studentData";
import { selectPDFRecord } from "./studentSlice";

const RecordsPDF = () => {
    const pdfData = useAppSelector(selectPDFRecord)
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (pdfData.data) {
            const content = pdfData?.headers?.["content-type"];
            pdfData.data && download(pdfData.data, "Transcript", content);
            dispatch(clearDownloadPDF())
        }
    
    }, [pdfData.data, dispatch, pdfData?.headers])

    return <></>;
};

export default RecordsPDF;
