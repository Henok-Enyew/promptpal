import { Cpu, FileText, Image as ImageIcon, Tag, Upload, X } from "lucide-react";
import { useState } from "react";

type UploadModalProps = {
  onClose: () => void;
};

export function UploadModal({ onClose }: UploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    prompt: "",
    model: "",
    tags: "",
    image: null as File | null,
    imagePreview: "",
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // TODO: Implement actual upload logic
    console.log("Uploading:", formData);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      onClose();
      // Reset form
      setFormData({
        title: "",
        prompt: "",
        model: "",
        tags: "",
        image: null,
        imagePreview: "",
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-[#030303] border border-white/10 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#030303] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Post Your Prompt</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Upload Result Image
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#62FE7A]/50 transition-colors">
              {formData.imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, image: null, imagePreview: "" })
                    }
                    className="text-sm text-white/60 hover:text-white"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-white/40 mb-4" />
                  <p className="text-white/60 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-white/40">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Cyberpunk Cat"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#62FE7A] transition-colors"
              required
            />
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Prompt Text
            </label>
            <textarea
              value={formData.prompt}
              onChange={(e) =>
                setFormData({ ...formData, prompt: e.target.value })
              }
              placeholder="Paste your prompt here..."
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#62FE7A] transition-colors resize-none"
              required
            />
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Cpu className="w-4 h-4 inline mr-2" />
              Model Used
            </label>
            <select
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#62FE7A] transition-colors"
              required
            >
              <option value="">Select a model</option>
              <option value="GPT-4">GPT-4</option>
              <option value="GPT-3.5">GPT-3.5</option>
              <option value="Claude 3.5">Claude 3.5</option>
              <option value="Claude 3">Claude 3</option>
              <option value="Midjourney">Midjourney</option>
              <option value="DALL-E 3">DALL-E 3</option>
              <option value="Stable Diffusion">Stable Diffusion</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="e.g., art, cyberpunk, animals"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#62FE7A] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 px-6 py-3 bg-[#62FE7A] text-black rounded-lg font-semibold hover:bg-[#52EE6A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Posting..." : "Post Prompt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

