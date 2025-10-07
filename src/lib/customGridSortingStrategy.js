// lib/customGridSortingStrategy.js
import { rectSortingStrategy } from "@dnd-kit/sortable";

export function customGridSortingStrategy(args) {
  const baseStrategy = rectSortingStrategy(args);

  return (items, container) => {
    const layouts = baseStrategy(items, container);

    // Preserve each card's original width and height
    return layouts.map((layout) => {
      const { rect, data } = layout;

      const width = data?.current?.node?.offsetWidth ?? rect.width;
      const height = data?.current?.node?.offsetHeight ?? rect.height;

      return {
        ...layout,
        rect: {
          ...rect,
          width,
          height,
        },
      };
    });
  };
}
