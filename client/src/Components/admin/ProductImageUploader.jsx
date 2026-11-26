import { Upload, X } from 'lucide-react'
import React from 'react'

function ProductImageUploader({
    existingImages,
    previews,
    totalCount,
    onAddImages,
    onRemoveExisting,
    onRemoveNew
}) {
    const handleFileChange = (e) => {
        onAddImages(e.target.files)
        e.target.value
    }

    return (
        <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Product Images * ({totalCount}/5)
            </label>

            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E8DFD1] bg-[#FAF8F5] p-4 cursor-pointer hover:border-[#8C1515] transition-colors">
                <Upload className="h-5 w-5 text-[#8C1515] mb-1" />
                <span className="text-xs font-semibold text-gray-800">
                    Click to upload images from device
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5">
                    PNG, JPG, WEBP (Max 5MB each)
                </span>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {totalCount > 0 && (
                <div className="grid grid-cols-5 gap-2.5 mt-3">
                    {existingImages.map((img, idx) => (
                        <div
                            key={img.public_id || idx}
                            className="relative h-20 rounded-lg overflow-hidden border border-[#E8DFD1] bg-[#FAF8F5]"
                        >
                            <img src={img.url} alt="product" className="w-full h-full object-cover" />
                            {img.isPrimary && (
                                <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-medium text-center py-0.5">
                                    Primary
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={() => onRemoveExisting(idx)}
                                className="absolute top-1 right-1 bg-black/75 text-white rounded-full p-0.5 hover:bg-red-600"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}

                    {previews.map((url, idx) => (
                        <div
                            key={`new-${idx}`}
                            className="relative h-20 rounded-lg overflow-hidden border-2 border-[#8C1515] bg-[#FAF8F5]"
                        >
                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-[#8C1515]/90 text-white text-[9px] font-medium text-center py-0.5">
                                New
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveNew(idx)}
                                className="absolute top-1 right-1 bg-[#8C1515] text-white rounded-full p-0.5 hover:bg-black"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductImageUploader