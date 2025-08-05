import { motion } from "framer-motion";

const Loading = ({ className }) => {
  return (
    <div className={`p-6 space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="animate-pulse">
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-8 w-1/4 mb-4"></div>
      </div>

      {/* Task card skeletons */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="animate-pulse"
        >
          <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-12 p-4">
            <div className="flex items-start space-x-3">
              {/* Checkbox skeleton */}
              <div className="w-5 h-5 bg-gray-200 rounded border-2 border-gray-300 flex-shrink-0 mt-1"></div>
              
              <div className="flex-1 space-y-3">
                {/* Title skeleton */}
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                
                {/* Description skeleton */}
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                
                {/* Tags and date skeleton */}
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
                </div>
              </div>
              
              {/* Action buttons skeleton */}
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;