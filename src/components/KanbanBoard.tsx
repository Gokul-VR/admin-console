import React, { useState } from "react";
import Modal from "./Modal";
import { Trash } from "lucide-react";
import { cn } from "../lib/utils";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Card {
  id: string;
  title: string;
  description: string;
  image?: string;
  assignees: User[];
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

const defaultUsers: User[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "2",
    name: "Bob",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "3",
    name: "Charlie",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    id: "4",
    name: "Diana",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", cards: [] },
    { id: "inprogress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]);
  const [users] = useState<User[]>(defaultUsers);
  const [draggedCard, setDraggedCard] = useState<{
    card: Card;
    fromColumnId: string;
  } | null>(null);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState("");
  const [cardForm, setCardForm] = useState({
    title: "",
    description: "",
    image: "",
    assigneeIds: [] as string[],
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [assigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<{
    columnId: string;
    index: number;
  } | null>(null);
  const [deleteColumnId, setDeleteColumnId] = useState<string | null>(null);
  const [showEditCardModal, setShowEditCardModal] = useState(false);
  const [editCardInfo, setEditCardInfo] = useState<{
    columnId: string;
    card: Card | null;
  }>({ columnId: "", card: null });
  const [editCardForm, setEditCardForm] = useState({
    title: "",
    description: "",
    image: "",
    assigneeIds: [] as string[],
  });
  const [editImagePreview, setEditImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColumnTitle.trim()) return;
    setColumns([
      ...columns,
      { id: Date.now().toString(), title: newColumnTitle, cards: [] },
    ]);
    setNewColumnTitle("");
    setShowAddColumnModal(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardForm.title.trim()) return;
    const assignees = users.filter((u) => cardForm.assigneeIds.includes(u.id));

    setColumns(
      columns.map((col) =>
        col.id === currentColumnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: Date.now().toString(),
                  title: cardForm.title,
                  description: cardForm.description,
                  image: cardForm.image,
                  assignees,
                },
              ],
            }
          : col
      )
    );

    setCardForm({ title: "", description: "", image: "", assigneeIds: [] });
    setImagePreview(undefined);
    setShowCardModal(false);
  };

  const handleCardModalInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };

  const handleModernImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardForm((f) => ({ ...f, image: reader.result as string }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setCardForm((f) => ({ ...f, image: "" }));
    setImagePreview(undefined);
  };

  const handleToggleAssignee = (userId: string) => {
    setCardForm((f) =>
      f.assigneeIds.includes(userId)
        ? { ...f, assigneeIds: f.assigneeIds.filter((id) => id !== userId) }
        : { ...f, assigneeIds: [...f.assigneeIds, userId] }
    );
  };

  const handleDragStart = (card: Card, fromColumnId: string) => {
    setDraggedCard({ card, fromColumnId });
  };

  const handleDragOver = (
    e: React.DragEvent,
    columnId: string,
    index: number
  ) => {
    e.preventDefault();
    setDragOverIndex({ columnId, index });
  };

  const handleDrop = (columnId: string) => {
    if (!draggedCard) return;

    setColumns((cols) => {
      // Remove card from source column
      const newCols = cols.map((col) =>
        col.id === draggedCard.fromColumnId
          ? {
              ...col,
              cards: col.cards.filter((c) => c.id !== draggedCard.card.id),
            }
          : col
      );

      // Add card to target column at the correct position
      return newCols.map((col) => {
        if (col.id !== columnId) return col;

        const newCards = [...col.cards];
        const insertIndex =
          dragOverIndex?.columnId === columnId
            ? dragOverIndex.index
            : newCards.length;

        // Don't allow dropping on itself
        if (draggedCard.fromColumnId === columnId) {
          const currentIndex = newCards.findIndex(
            (c) => c.id === draggedCard.card.id
          );
          if (currentIndex >= 0 && insertIndex > currentIndex) {
            newCards.splice(insertIndex - 1, 0, draggedCard.card);
          } else {
            newCards.splice(insertIndex, 0, draggedCard.card);
          }
        } else {
          newCards.splice(insertIndex, 0, draggedCard.card);
        }

        return { ...col, cards: newCards };
      });
    });

    setDraggedCard(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragOverIndex(null);
  };

  const openAddCardModal = (columnId: string) => {
    setCurrentColumnId(columnId);
    setShowCardModal(true);
  };

  const selectedAssignees = users.filter((u) =>
    cardForm.assigneeIds.includes(u.id)
  );

  const handleDeleteColumn = () => {
    if (deleteColumnId) {
      setColumns((cols) => cols.filter((col) => col.id !== deleteColumnId));
      setDeleteColumnId(null);
    }
  };

  const openEditCardModal = (columnId: string, card: Card) => {
    setEditCardInfo({ columnId, card });
    setEditCardForm({
      title: card.title,
      description: card.description,
      image: card.image || "",
      assigneeIds: card.assignees.map((a) => a.id),
    });
    setEditImagePreview(card.image);
    setShowEditCardModal(true);
  };

  const handleEditCardModalInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditCardForm({ ...editCardForm, [e.target.name]: e.target.value });
  };

  const handleEditToggleAssignee = (userId: string) => {
    setEditCardForm((f) =>
      f.assigneeIds.includes(userId)
        ? { ...f, assigneeIds: f.assigneeIds.filter((id) => id !== userId) }
        : { ...f, assigneeIds: [...f.assigneeIds, userId] }
    );
  };

  const handleEditCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCardForm.title.trim() || !editCardInfo.card) return;
    const assignees = users.filter((u) =>
      editCardForm.assigneeIds.includes(u.id)
    );
    setColumns((cols) =>
      cols.map((col) =>
        col.id === editCardInfo.columnId
          ? {
              ...col,
              cards: col.cards.map((c) =>
                c.id === editCardInfo.card!.id
                  ? {
                      ...c,
                      title: editCardForm.title,
                      description: editCardForm.description,
                      image: editCardForm.image,
                      assignees,
                    }
                  : c
              ),
            }
          : col
      )
    );
    setShowEditCardModal(false);
    setEditCardInfo({ columnId: "", card: null });
    setEditCardForm({ title: "", description: "", image: "", assigneeIds: [] });
    setEditImagePreview(undefined);
  };

  const selectedEditAssignees = users.filter((u) =>
    editCardForm.assigneeIds.includes(u.id)
  );

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditCardForm((f) => ({ ...f, image: reader.result as string }));
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditRemoveImage = () => {
    setEditCardForm((f) => ({ ...f, image: "" }));
    setEditImagePreview(undefined);
  };

  const handleDeleteCard = () => {
    if (!editCardInfo.card) return;
    setColumns((cols) =>
      cols.map((col) =>
        col.id === editCardInfo.columnId
          ? {
              ...col,
              cards: col.cards.filter((c) => c.id !== editCardInfo.card!.id),
            }
          : col
      )
    );
    setShowEditCardModal(false);
    setEditCardInfo({ columnId: "", card: null });
    setEditCardForm({ title: "", description: "", image: "", assigneeIds: [] });
    setEditImagePreview(undefined);
  };

  return (
    <div className="relative h-[calc(100vh-7rem)]" onDragEnd={handleDragEnd}>
      {/* Fixed Add Column Button */}
      <div className="absolute top-0 right-0">
        <button
          onClick={() => setShowAddColumnModal(true)}
          className="btn-primary rounded-sm p-2"
        >
          Add Column
        </button>
      </div>

      {/* Columns Container */}
      <div className="flex gap-4 overflow-x-auto pt-16 px-4 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="w-80 bg-card border border-border rounded-lg p-2 flex flex-col gap-4 flex-shrink-0"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="flex items-center justify-between p-2">
              <h2 className="text-lg font-bold text-foreground truncate">
                {column.title}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  className="px-2 rounded hover:bg-muted text-xl text-red-500"
                  title="Delete column"
                  onClick={() => setDeleteColumnId(column.id)}
                >
                  <Trash className="text-red-500 p-1" />
                </button>
                <button
                  className="px-2 rounded hover:bg-muted text-xl"
                  title="Add card"
                  onClick={() => openAddCardModal(column.id)}
                >
                  <span aria-hidden>＋</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-h-[40px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
              {column.cards.length === 0 && (
                <div
                  className="h-16 border-2 border-dashed border-border rounded-md flex items-center justify-center"
                  onDragOver={(e) => handleDragOver(e, column.id, 0)}
                >
                  {dragOverIndex?.columnId === column.id &&
                    dragOverIndex.index === 0 && (
                      <div className="w-full h-1 bg-primary rounded-full"></div>
                    )}
                </div>
              )}

              {column.cards.map((card, index) => (
                <React.Fragment key={card.id}>
                  <div
                    className="relative"
                    onDragOver={(e) => handleDragOver(e, column.id, index)}
                  >
                    {dragOverIndex?.columnId === column.id &&
                      dragOverIndex.index === index && (
                        <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full z-10"></div>
                      )}
                    <div
                      className={cn(
                        "bg-background border border-border rounded-md p-3 cursor-pointer text-foreground flex flex-col gap-2 w-full",
                        draggedCard?.card.id === card.id ? "opacity-40" : ""
                      )}
                      draggable
                      onDragStart={() => handleDragStart(card, column.id)}
                      onClick={() => openEditCardModal(column.id, card)}
                    >
                      {card.image && (
                        <img
                          src={card.image}
                          alt="card"
                          className="w-full h-28 object-cover rounded mb-1"
                        />
                      )}
                      <div className="font-semibold text-base truncate">
                        {card.title}
                      </div>
                      {card.description && (
                        <div className="text-sm text-muted-foreground line-clamp-3 break-words">
                          {card.description}
                        </div>
                      )}
                      {card.assignees && card.assignees.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          {card.assignees.map((user, idx) => (
                            <img
                              key={user.id}
                              src={user.avatar}
                              alt={user.name}
                              className="w-6 h-6 rounded-full object-cover border-2 border-background -ml-2 first:ml-0"
                              style={{ zIndex: 10 - idx }}
                              title={user.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {index === column.cards.length - 1 && (
                    <div
                      className="relative h-4"
                      onDragOver={(e) =>
                        handleDragOver(e, column.id, index + 1)
                      }
                    >
                      {dragOverIndex?.columnId === column.id &&
                        dragOverIndex.index === index + 1 && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full"></div>
                        )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Column Modal */}
      <Modal
        open={showAddColumnModal}
        onClose={() => {
          setShowAddColumnModal(false);
          setNewColumnTitle("");
        }}
        title="Add New Column"
      >
        <form onSubmit={handleAddColumn} className="flex flex-col gap-4">
          <input
            className="p-2 rounded border border-border bg-background text-foreground"
            placeholder="Column title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setShowAddColumnModal(false);
                setNewColumnTitle("");
              }}
              className="btn-secondary flex-1 rounded-sm py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 rounded-sm py-2"
            >
              Add Column
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={!!deleteColumnId}
        onClose={() => setDeleteColumnId(null)}
        title="Delete Column?"
      >
        <div className="mb-4">
          Do you want to delete this column? This cannot be undone.
        </div>
        <div className="flex gap-2">
          <button
            className="btn-secondary flex-1 rounded-sm py-2"
            onClick={() => setDeleteColumnId(null)}
          >
            No
          </button>
          <button
            className="btn-primary flex-1 rounded-sm py-2"
            onClick={handleDeleteColumn}
          >
            Yes, Delete
          </button>
        </div>
      </Modal>

      {/* Add Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add New Card</h3>
              <button
                onClick={() => {
                  setShowCardModal(false);
                  setCardForm({
                    title: "",
                    description: "",
                    image: "",
                    assigneeIds: [],
                  });
                  setImagePreview(undefined);
                }}
                className="text-lg px-2 rounded hover:bg-muted"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddCard} className="flex flex-col gap-4">
              <input
                className="p-2 rounded border border-border bg-background text-foreground"
                name="title"
                placeholder="Card title"
                value={cardForm.title}
                onChange={handleCardModalInput}
                required
              />
              <textarea
                className="p-2 rounded border border-border bg-background text-foreground"
                name="description"
                placeholder="Description"
                value={cardForm.description}
                onChange={handleCardModalInput}
                rows={3}
              />
              <div>
                <label className="block text-sm mb-1">Image (optional)</label>
                <div className="relative">
                  {!imagePreview && (
                    <label className="flex items-center justify-center border border-dashed border-border rounded cursor-pointer h-10 bg-muted hover:bg-muted/70 transition-colors">
                      <span className="text-muted-foreground text-sm">
                        Choose Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleModernImageChange}
                      />
                    </label>
                  )}
                  {imagePreview && (
                    <div className="relative h-24 w-full">
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                        onClick={handleRemoveImage}
                        title="Remove image"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">Assignees</label>
                <div
                  className="flex items-center gap-1 flex-wrap min-h-[40px] border border-border rounded bg-background px-2 py-1 cursor-pointer"
                  onClick={() => setAssigneeDropdownOpen(!assigneeDropdownOpen)}
                >
                  {selectedAssignees.length === 0 && (
                    <span className="text-muted-foreground text-sm">
                      Select assignees...
                    </span>
                  )}
                  {selectedAssignees.map((user, idx) => (
                    <img
                      key={user.id}
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-background -ml-2 first:ml-0"
                      style={{ zIndex: 10 - idx }}
                      title={user.name}
                    />
                  ))}
                  <span className="ml-auto text-xs text-muted-foreground">
                    ▼
                  </span>
                </div>
                {assigneeDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-card border border-border rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted ${
                          cardForm.assigneeIds.includes(user.id)
                            ? "bg-primary/10"
                            : ""
                        }`}
                        onClick={() => handleToggleAssignee(user.id)}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-sm">{user.name}</span>
                        {cardForm.assigneeIds.includes(user.id) && (
                          <span className="ml-auto text-primary">✔</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCardModal(false);
                    setCardForm({
                      title: "",
                      description: "",
                      image: "",
                      assigneeIds: [],
                    });
                    setImagePreview(undefined);
                  }}
                  className="btn-secondary flex-1 py-2 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2 rounded-sm"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {showEditCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Edit Card</h3>
                <button
                  onClick={handleDeleteCard}
                  className="p-1 rounded hover:bg-muted text-red-500"
                  title="Delete card"
                >
                  <Trash size={18} />
                </button>
              </div>
              <button
                onClick={() => {
                  setShowEditCardModal(false);
                  setEditCardInfo({ columnId: "", card: null });
                  setEditCardForm({
                    title: "",
                    description: "",
                    image: "",
                    assigneeIds: [],
                  });
                  setEditImagePreview(undefined);
                }}
                className="text-lg px-2 rounded hover:bg-muted"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleEditCard} className="flex flex-col gap-4">
              <input
                className="p-2 rounded border border-border bg-background text-foreground"
                name="title"
                placeholder="Card title"
                value={editCardForm.title}
                onChange={handleEditCardModalInput}
                required
              />
              <textarea
                className="p-2 rounded border border-border bg-background text-foreground"
                name="description"
                placeholder="Description"
                value={editCardForm.description}
                onChange={handleEditCardModalInput}
                rows={3}
              />
              <div>
                <label className="block text-sm mb-1">Image (optional)</label>
                <div className="relative">
                  {!editImagePreview && (
                    <label className="flex items-center justify-center border border-dashed border-border rounded cursor-pointer h-10 bg-muted hover:bg-muted/70 transition-colors">
                      <span className="text-muted-foreground text-sm">
                        Choose Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEditImageChange}
                      />
                    </label>
                  )}
                  {editImagePreview && (
                    <div className="relative h-24 w-full">
                      <img
                        src={editImagePreview}
                        alt="preview"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                        onClick={handleEditRemoveImage}
                        title="Remove image"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">Assignees</label>
                <div
                  className="flex items-center gap-1 flex-wrap min-h-[40px] border border-border rounded bg-background px-2 py-1 cursor-pointer"
                  onClick={() => setAssigneeDropdownOpen(!assigneeDropdownOpen)}
                >
                  {selectedEditAssignees.length === 0 && (
                    <span className="text-muted-foreground text-sm">
                      Select assignees...
                    </span>
                  )}
                  {selectedEditAssignees.map((user, idx) => (
                    <img
                      key={user.id}
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-background -ml-2 first:ml-0"
                      style={{ zIndex: 10 - idx }}
                      title={user.name}
                    />
                  ))}
                  <span className="ml-auto text-xs text-muted-foreground">
                    ▼
                  </span>
                </div>
                {assigneeDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-card border border-border rounded shadow-lg z-10 max-h-48 overflow-y-auto">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted ${
                          editCardForm.assigneeIds.includes(user.id)
                            ? "bg-primary/10"
                            : ""
                        }`}
                        onClick={() => handleEditToggleAssignee(user.id)}
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-sm">{user.name}</span>
                        {editCardForm.assigneeIds.includes(user.id) && (
                          <span className="ml-auto text-primary">✔</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCardModal(false);
                    setEditCardInfo({ columnId: "", card: null });
                    setEditCardForm({
                      title: "",
                      description: "",
                      image: "",
                      assigneeIds: [],
                    });
                    setEditImagePreview(undefined);
                  }}
                  className="btn-secondary flex-1 py-2 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 py-2 rounded-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
