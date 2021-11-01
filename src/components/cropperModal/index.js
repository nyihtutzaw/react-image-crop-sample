import React, { useState, useCallback } from "react";
import { Modal, Card, Button } from "reactstrap";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
function CropperModal({ isShow, image, close, setCroppedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  // try {
  //   const croppedImage = await getCroppedImg(image, croppedAreaPixels);
  //   console.log("donee", { croppedImage });
  // } catch (e) {
  //   console.error(e);
  // }

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={isShow}
      toggle={() => console.log("hi")}
    >
      <Card>
        <div className="crop-container" style={{ width: 400, height: 400 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 2}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <div
          className="d-flex justify-content-end pr-4"
          style={{ zIndex: "1" }}
        >
          <Button
            onClick={async () => {
              try {
                const croppedImage = await getCroppedImg(
                  image,
                  croppedAreaPixels
                );
                setCroppedImage(croppedImage);
                close();
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Crop
          </Button>
          <Button onClick={close}>Close</Button>
        </div>
      </Card>
    </Modal>
  );
}

export default CropperModal;
