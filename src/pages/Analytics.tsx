import KanbanBoard from "@/components/KanbanBoard";

export function Kanban() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-full h-full overflow-x-auto pb-4">
        <KanbanBoard />
      </div>
    </div>
  );
}