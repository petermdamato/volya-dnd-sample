import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  DragOverlay, // ⬅️ import DragOverlay
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SimpleCard, ComplexCard } from "./components/CardComponents";

import { customGridSortingStrategy } from "./lib/customGridSortingStrategy";

// Sortable Item Component
function SortableItem({ id, item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1, // make the original fade when dragging
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.type === "simple" ? (
        <SimpleCard
          title={item.title}
          width={item.width}
          height={item.height}
        />
      ) : (
        <ComplexCard
          title={item.title}
          width={item.width}
          height={item.height}
        />
      )}
    </div>
  );
}

// Main App Component
function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: "simple",
      title: "Simple Task 1",
      width: "200px",
      height: "120px",
    },
    {
      id: 2,
      type: "complex",
      title: "Complex Project",
      width: "280px",
      height: "180px",
    },
    {
      id: 3,
      type: "simple",
      title: "Simple Task 2",
      width: "200px",
      height: "120px",
    },
    {
      id: 4,
      type: "complex",
      title: "Important Feature",
      width: "280px",
      height: "180px",
    },
    {
      id: 5,
      type: "simple",
      title: "Quick Note",
      width: "200px",
      height: "120px",
    },
    {
      id: 6,
      type: "complex",
      title: "Team Project",
      width: "280px",
      height: "180px",
    },
  ]);

  const [activeId, setActiveId] = useState(null); // track the dragged card

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    setActiveId(event.active.id); // remember which card is being dragged
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null); // clear overlay after drop

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const addNewItem = () => {
    const newId = Math.max(...items.map((item) => item.id), 0) + 1;
    setItems([
      ...items,
      {
        id: newId,
        type: "simple",
        title: `New Item ${newId}`,
        width: "200px",
        height: "120px",
      },
    ]);
  };

  const resetItems = () => {
    setItems([
      {
        id: 1,
        type: "simple",
        title: "Simple Task 1",
        width: "200px",
        height: "120px",
      },
      {
        id: 2,
        type: "complex",
        title: "Complex Project",
        width: "280px",
        height: "180px",
      },
      {
        id: 3,
        type: "simple",
        title: "Simple Task 2",
        width: "200px",
        height: "120px",
      },
      {
        id: 4,
        type: "complex",
        title: "Important Feature",
        width: "280px",
        height: "180px",
      },
      {
        id: 5,
        type: "simple",
        title: "Quick Note",
        width: "200px",
        height: "120px",
      },
      {
        id: 6,
        type: "complex",
        title: "Team Project",
        width: "280px",
        height: "180px",
      },
    ]);
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>DnD Kit Sandbox</h1>
          <p>Drag and drop the items to reorder them</p>
        </header>

        <div className="sandbox-container">
          <div className="controls">
            <button onClick={addNewItem} className="control-btn">
              Add Item
            </button>
            <button onClick={resetItems} className="control-btn">
              Reset
            </button>
          </div>

          <div className="dnd-container">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              measuring={{
                droppable: { strategy: MeasuringStrategy.Always },
              }}
            >
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={customGridSortingStrategy}
              >
                <div className="items-grid">
                  {items.map((item) => (
                    <SortableItem key={item.id} id={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>

              {/* 🔥 DragOverlay keeps original card's size and style */}
              <DragOverlay>
                {activeId
                  ? (() => {
                      const activeItem = items.find((i) => i.id === activeId);
                      if (!activeItem) return null;
                      return activeItem.type === "simple" ? (
                        <SimpleCard
                          title={activeItem.title}
                          width={activeItem.width}
                          height={activeItem.height}
                        />
                      ) : (
                        <ComplexCard
                          title={activeItem.title}
                          width={activeItem.width}
                          height={activeItem.height}
                        />
                      );
                    })()
                  : null}
              </DragOverlay>
            </DndContext>
          </div>

          <div className="items-list">
            <h3>Current Order:</h3>
            <ol>
              {items.map((item, index) => (
                <li key={item.id}>
                  {index + 1}. {item.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
