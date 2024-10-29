const Loading = () => (
  <div className="flex items-center justify-center space-x-2 p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple100"></div>
    <span className="text-gray-600">로딩 중...</span>
  </div>
);

export default Loading;
