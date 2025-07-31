import PropTypes from "prop-types";
export default function NutritionFoodScanner({
  getUploadedImage,
  uploadedImage,
}) {
  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div
        className="relative border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow duration-300"
        id="dropzone"
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          onChange={(e) => {
            getUploadedImage(e.target.files);
          }}
        />
        <div className="text-center space-y-3">
          <img
            className="mx-auto h-16 w-16 opacity-80"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">
            Drag & drop food image, or{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold underline cursor-pointer">
              browse
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Accepted formats: PNG, JPG, GIF (Max 10MB)
          </p>
        </div>

        {uploadedImage && (
          <img
            src={uploadedImage}
            className="mt-6 mx-auto rounded-lg shadow-md max-h-48 object-contain"
            alt="Preview"
            id="preview"
          />
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          🍽️ Check Now
        </button>
      </div>
    </div>
  );
}

NutritionFoodScanner.propTypes = {
  uploadedImage: PropTypes.string.isRequired,
  getUploadedImage: PropTypes.func.isRequired,
};
