import Image from 'next/image'
import { useRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '~/utils/classNames'

const UploadImageButton = ({
  selectedFile,
  setSelectedFile,
  error,
}: {
  selectedFile: File | null
  setSelectedFile: (file: File) => void
  error?: FieldError
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      const previewURL = URL.createObjectURL(event.target.files[0])
      setImagePreview(previewURL)
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={cn([
        'relative flex h-40 w-40 justify-center rounded-full border border-gray-500',
        { 'border-red-500': error?.type === 'required' },
      ])}
    >
      <button className="text-gray-600" onClick={handleButtonClick}>
        {selectedFile ? (
          <Image
            className="rounded-full object-cover"
            src={imagePreview}
            alt={selectedFile.name}
            fill={true}
          />
        ) : (
          '選擇你的照片'
        )}
      </button>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default UploadImageButton
