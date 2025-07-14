import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function UrlList({ urlList }) {
  const [visibleQR, setVisibleQR] = useState(null);

  const toggleQR = (index) => {
    setVisibleQR(visibleQR === index ? null : index);
  };

  return (
    <ul className="list grid grid-cols-1 gap-5">
      {urlList.map((element, index) => {
        return (
          <li className="list-item" key={index} id={index}>
            <div className="links">
              <a href={element.url} className="full-url">
                {element.url.slice(0, 100)}
              </a>
              <a href={element.shortUrl} className="short-url font-medium">
                {element.shortUrl}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="btn-cta btn-copy"
                onClick={() => navigator.clipboard.writeText(element.shortUrl)}
              >
                Copy
              </button>

              {/* {element.clicks !== undefined && (
                                <div className="text-sm text-gray-600 font-medium">
                                    Clicks: {element.clicks}
                                </div>
                            )} */}

              <button
                type="button"
                className="btn-cta btn-copy"
                onClick={() => toggleQR(index)}
              >
                {visibleQR === index ? "Hide QR" : "Show QR"}
              </button>

              {visibleQR === index && (
                <div className="flex justify-center mt-2">
                  <QRCodeCanvas value={element.shortUrl} size={128} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
