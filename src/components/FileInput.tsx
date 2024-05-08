import { useRef } from "react";

interface FileInputProps {
  id: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearFile: () => void;
  value: File | null;
  label: string;
}

export const FileInput = ({
  id,
  label,
  value,
  clearFile,
  handleFileChange,
}: FileInputProps) => {
  const uploaderRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <h5 style={{ fontWeight: "medium", marginTop: 3, marginBottom: 1 }}>
        {label}
      </h5>
      <div
        style={{
          display: "flex",
          marginBottom: 8,
          minHeight: "45px",
          flexDirection: "row",
          paddingRight: 2,
          paddingLeft: 2,
          justifyContent: "space-between",
          alignItems: "center",
          background: "white",
        }}
      >
        <div
          style={{
            paddingLeft: "2px",
            paddingRight: "2px",
            display: "flex",
            width: "100%",
            minHeight: "45px",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: "1px",
            borderRadius: "lg",
            background: "white",
          }}
        >
          <button
            style={{
              paddingLeft: 2,
              paddingRight: 2,
              fontWeight: "medium",
              fontSize: 14,
              backgroundColor: "#2D3748",
              color: "#fff"
            }}
            onClick={() => uploaderRef.current?.click()}
          >
            {`Upload ${label}`}
          </button>

          {value?.name && <p>{`${value?.name.substring(0, 8)}...`}</p>}

          <input
            style={{ display: "none" }}
            onChange={handleFileChange}
            aria-label="upload input"
            id={id}
            name={id}
            multiple={false}
            type="file"
            ref={uploaderRef}
            accept="image/png,image/jpeg,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
        {value?.name && (
          <span
            onClick={clearFile}
            style={{
              paddingLeft: 2,
              height: "full",
              fontSize: 12,
              fontWeight: "bold",
              background: "#fff",
              color: "red",
            }}
          >
            Remove
          </span>
        )}
      </div>
    </>
  );
};
