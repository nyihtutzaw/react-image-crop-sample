import { useState, useRef } from "react";
import CropperModal from "./components/cropperModal";
import { dataUrlToFile } from "./util/fileConverter";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
function App() {
  const [initState, setInitState] = useState({
    openCropper: false,
    image: null,
    croppedImage: null,
  });
  const [cropImage, setCropImage] = useState(null);
  const inputFile = useRef(null);
  return (
    <div className="mt-3" style={{ paddingLeft: "20px" }}>
      {cropImage ? (
        <div>
          <img
            alt="Cropped Result"
            src={cropImage}
            width="200"
            height="150"
            onClick={() => {
              inputFile.current.click();
            }}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            inputFile.current.click();
          }}
          style={{
            width: 200,
            height: 150,
            background: "grey",
            cursor: "pointer",
          }}
        ></div>
      )}
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={(event) => {
          if (event.target.files[0]) {
            setInitState({
              ...initState,
              openCropper: true,
              image: URL.createObjectURL(event.target.files[0]),
            });
          }
        }}
      />
      {initState.openCropper && (
        <CropperModal
          isShow={initState.openCropper}
          image={initState.image}
          close={() => setInitState({ ...initState, openCropper: false })}
          setCroppedImage={async (image) => {
            setCropImage(image);
          }}
        />
      )}
      <div>
        <Button
          className="mt-3"
          onClick={async () => {
            let formData = new FormData();
            const imageFile = await dataUrlToFile(cropImage);
            console.log(imageFile);
            formData.append("image", imageFile);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default App;
