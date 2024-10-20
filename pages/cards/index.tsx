import React, { useState, useEffect } from "react";
import { getCards, createCard } from "@/pages/api/cards";
import { Card, CreateCardBody } from "@/types/cards";
import ModalCard from "@/components/UI/modal/ModalCard";

const CardPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCard, setNewCard] = useState<CreateCardBody>({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await getCards({ teamId: "9-1" });
      setCards(response.cards);
    } catch (error) {
      console.error("카드 목록을 가져오는데 실패했습니다:", error);
    }
  };

  const openModal = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 파일 업로드 로직 (실제 구현 필요)
      // let imageUrl = "";
      if (file) {
        // 파일 업로드 API 호출 및 URL 받아오기
        // imageUrl = await uploadFile(file);
      }

      // const cardData = { ...newCard, imageUrl };
      // await createCard(cardData, "9-1");
      fetchCards(); // 카드 목록 새로고침
      setNewCard({
        assigneeUserId: 0,
        dashboardId: 0,
        columnId: 0,
        title: "",
        description: "",
        dueDate: "",
        tags: [],
        imageUrl: "",
      });
      setFile(null);
    } catch (error) {
      console.error("카드 생성에 실패했습니다:", error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>카드 목록</h1>

      {/* 카드 생성 폼 */}
      <form onSubmit={handleSubmit} className='mb-8 p-4 bg-gray-100 rounded-lg'>
        <h2 className='text-xl font-semibold mb-4'>새 카드 생성</h2>
        <div className='mb-4'>
          <input
            type='text'
            name='title'
            value={newCard.title}
            onChange={handleInputChange}
            placeholder='제목'
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <textarea
            name='description'
            value={newCard.description}
            onChange={handleInputChange}
            placeholder='설명'
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <input
            type='date'
            name='dueDate'
            value={newCard.dueDate}
            onChange={handleInputChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <input
            type='file'
            onChange={handleFileChange}
            className='w-full p-2 border rounded'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          카드 생성
        </button>
      </form>

      {/* 기존 카드 목록 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cards.map((card) => (
          <div
            key={card.id}
            className='border p-4 rounded-lg cursor-pointer hover:bg-gray-100'
            onClick={() => openModal(card)}
          >
            <h2 className='text-xl font-semibold'>{card.title}</h2>
            <p className='text-gray-600 mt-2'>
              {card.description.substring(0, 100)}...
            </p>
            <div className='flex mt-2'>
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedCard && (
        <ModalCard
          {...selectedCard}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CardPage;
