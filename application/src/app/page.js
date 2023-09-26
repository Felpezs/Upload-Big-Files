"use client";

import { useState, useEffect, useRef } from "react";
import { API_URL, ON_UPLOAD_EVENT } from "@/utils/config";

export default function Home() {
  const [bytesAmount, setBytesAmount] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const ioClient = io.connect(API_URL, { withCredentials: false });
    ioClient.on("connect", (msg) => {
      console.log("connected!", ioClient.id);
      const targetUrl = API_URL + `?socketId=${ioClient.id}`;
      configureForm(targetUrl);
    });

    ioClient.on(ON_UPLOAD_EVENT, (bytesReceived) => {
      console.log("received", bytesReceived);
      bytesAmount = bytesAmount - bytesReceived;
      setBytesAmount(bytesAmount);
    });
  }, []);

  const configureForm = (targetUrl) => {
    formRef.current.action = targetUrl;
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  function showSize() {
    const { files: fileElements } = document.getElementById("file");
    if (!fileElements.length) return;

    const files = Array.from(fileElements);
    const { size } = files.reduce(
      (prev, next) => ({ size: prev.size + next.size }),
      { size: 0 }
    );

    setBytesAmount(size);
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <h3>Uploading files</h3>
        <form
          id="form"
          method="POST"
          encType="multipart/form-data"
          ref={formRef}
        >
          <div className="form-group">
            <label htmlFor="field">Files</label>
            <input
              type="file"
              className="form-control"
              id="file"
              name="file"
              onChange={showSize}
              multiple
            />
            <output className="span" id="size">
              Pending Bytes to Upload:{" "}
              <strong>{formatBytes(bytesAmount)}</strong>
            </output>
            <br />
            <output className="span" id="msg"></output>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-success" />
            <input
              type="reset"
              className="btn btn-danger"
              onClick={() => {
                setBytesAmount(0);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
