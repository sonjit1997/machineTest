# Project Overview

## Introduction

This project is a React application that provides a grid-based table interface for displaying and manipulating a list of products. It leverages modern web technologies and React features to create a dynamic and interactive user experience.

## Features

### 1. Grid Layout

- The main interface is organized in a grid layout using `Table`, `TableBody`, `TableCell`, and `TableRow` components from Material-UI (`@mui/material`).

### 2. Product Display

- Products are fetched from an API (`allProductsApi`) and displayed within the grid.
- Each cell in the grid represents a product, showing its image and title.

### 3. Keyboard Navigation

- Users can navigate through the grid using arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`).
- Pressing arrow keys shifts focus to adjacent cells, enhancing accessibility and ease of use.

### 4. Drag and Drop

- Products can be rearranged within the grid via drag and drop functionality.
- Dragging initiates using the `draggable` attribute on cells (`TableCell`) and is managed by `onDragStart`, `onDragOver`, `onDrop`, and `onDragEnd` event handlers.

### 5. Visual Feedback

- Active cell and dragged cell are visually distinguished using CSS classes (`Styles.cellVisible` and `Styles.cellDragged`).
- Clicking on a cell (`onClick`) or dragging triggers state updates to reflect visual changes.

### 6. Responsive Design

- The application is designed to be responsive, adapting to different screen sizes and orientations.

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.
4. Open the application in your web browser at `http://localhost:3000`.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **Material-UI**: React components for faster and easier web development.
- **CSS Modules**: Local scoping of CSS classes for styling components.

## Usage

- Navigate the grid using arrow keys or by clicking on cells.
- Drag and drop cells to rearrange products within the grid.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License

