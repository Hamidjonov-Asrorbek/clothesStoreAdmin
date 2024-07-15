import React, { Dispatch, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";

type FileType = File & {
  preview?: string;
  originFileObj?: File;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface UploadImageProps {
  setFiles: Dispatch<React.SetStateAction<File[]>>;
  urls: string[];
  setUrls: Dispatch<React.SetStateAction<string[]>>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  setFiles,
  urls,
  setUrls,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  console.log(setUrls);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const files = newFileList.map((file) => file.originFileObj as File);
    setFiles(files);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent auto upload
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {urls.map((url, index) => (
            <Image key={index} width={100} height={100} src={url} />
          ))}
        </div>
      )}
      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
        src={previewImage}
      />
    </>
  );
};

export default UploadImage;
