export const styles = {
  modalOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4",
  modalContainer:
    "w-full max-w-[730px] h-[90vh] max-h-[763px] bg-white shadow-lg rounded-xl px-4 overflow-y-auto md:w-[730px]",
  modalContent: "h-full overflow-y-auto pt-6 pl-2 pr-3 md:pl-4 md:pr-5",
  modalHeader:
    "bg-white pt-4 md:pt-8 p-2 md:p-4 flex justify-between items-center",
  kebabButton: "flex text-gray-500 hover:text-gray-700 mr-2 md:mr-6",
  closeButton: "text-gray-500 hover:text-gray-700",
  tagContainer: "flex flex-wrap items-center gap-2 p-2 md:p-4",
  tagBase: "px-2 md:px-3 py-1 text-sm rounded-md",
  tagDivider: "h-6 w-px bg-gray-300 mx-2",
  imageContainer: "relative w-full h-48 md:h-64",
  sidebarContainer: "w-full md:w-[200px] flex-shrink-0 p-2 md:p-4",
  sidebarBox: "p-2 md:p-4 rounded-lg border border-[#D9D9D9]",
  sidebarTitle: "text-sm font-semibold text-gray-500 mb-2",
  assigneeAvatar:
    "w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold",
  commentTitle: "text-base md:text-lg font-semibold mb-2",
  commentInput:
    "w-full p-2 pr-16 md:pr-20 border rounded-lg h-20 md:h-24 resize-none",
  commentSubmitButton:
    "absolute right-2 md:right-3 bottom-2 text-blue-500 px-4 md:px-7 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm",
  commentContainer: "mt-4",
  commentItem: "flex items-start space-x-2 md:space-x-3",
  commentActionButton: "text-xs md:text-sm text-gray-500 mr-2 underline",
};
