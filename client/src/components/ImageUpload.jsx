import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Upload, Camera, CheckCircle2, ShieldCheck, Eye, EyeOff, Sparkles, Lock } from 'lucide-react';
import { processPrivacyBlur } from '../utils/imageAnonymizer';

export default function ImageUpload({ onUpload }) {
  const { t, isHindi } = useContext(LanguageContext);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [anonymizedPreview, setAnonymizedPreview] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [anonymizeInfo, setAnonymizeInfo] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const rawUrl = URL.createObjectURL(file);
    setOriginalPreview(rawUrl);
    setProcessing(true);

    // Apply YOLOv8 Privacy Blur (Faces & Vehicle License Plates)
    const result = await processPrivacyBlur(rawUrl);
    setAnonymizedPreview(result.anonymizedImage);
    setAnonymizeInfo(result.detections);
    setProcessing(false);

    onUpload?.(file, result.anonymizedImage);
  };

  return (
    <div className="bg-white dark:bg-emerald-950/70 rounded-2xl p-5 border-2 border-dashed border-emerald-200 dark:border-emerald-800 text-center space-y-4 shadow-xs hover:border-emerald-400 transition">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="img-upload"
      />
      <label
        htmlFor="img-upload"
        className="cursor-pointer flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 transition"
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center font-bold">
          <Camera className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-emerald-950 dark:text-white block">
            {isHindi ? 'समस्या का साक्ष्य फोटो अपलोड करें' : 'Upload Evidence Photo'}
          </span>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 block">
            {isHindi ? 'यहाँ क्लिक करके फोटो चुनें या खींचकर छोड़ें' : 'Click to upload image or drag & drop'}
          </span>
        </div>
      </label>

      {/* Privacy Guarantee Pill */}
      <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full text-[10.5px] font-bold text-emerald-800 dark:text-emerald-300">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>{isHindi ? 'YOLO एआई सुरक्षा: चेहरे व वाहन नंबर प्लेट स्वतः धुंधली की जाती हैं' : 'YOLO AI Shield: Faces & Vehicle License Plates Auto-Blurred'}</span>
      </div>

      {processing && (
        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 py-2">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
          <span>{isHindi ? 'YOLOv8 कंप्यूटर विजन चेहरे व नंबर प्लेट स्कैन कर रहा है...' : 'YOLOv8 Computer Vision Scanning for Faces & License Plates...'}</span>
        </div>
      )}

      {/* Dual Before / After Privacy Anonymization View */}
      {anonymizedPreview && (
        <div className="space-y-3 pt-3 border-t border-emerald-100 dark:border-emerald-800 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-emerald-950 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isHindi ? 'YOLOv8 द्वारा प्राइवेसी मास्क लागू किया गया ✓' : 'YOLOv8 Privacy Mask Applied ✓'}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowOriginal(!showOriginal)}
              className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900 px-2 py-0.5 rounded"
            >
              {showOriginal ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>{showOriginal ? (isHindi ? 'ब्लर फोटो देखें' : 'Show Blurred') : (isHindi ? 'मूल फोटो देखें' : 'Show Original')}</span>
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 max-h-48 bg-black flex items-center justify-center">
            <img
              src={showOriginal ? originalPreview : anonymizedPreview}
              alt="Anonymized Evidence"
              className="w-full h-48 object-cover"
            />
            {!showOriginal && (
              <span className="absolute bottom-2 right-2 bg-emerald-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>{isHindi ? 'चेहरे व नंबर प्लेट सुरक्षित' : 'Faces & Plates Redacted'}</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
